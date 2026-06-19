const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const db = require('../config/db');
const upload = require('../middleware/upload');

// Helper function to delete physical files
const deleteFile = (relativePath) => {
  if (!relativePath) return;
  // If it starts with /uploads/, strip it to find the real path
  const filename = relativePath.startsWith('/uploads/') 
    ? relativePath.replace('/uploads/', '') 
    : relativePath;
  
  const filePath = path.join(__dirname, '../uploads', filename);
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(`Failed to delete file at ${filePath}:`, err.message);
    } else {
      console.log(`Successfully deleted file at ${filePath}`);
    }
  });
};

// Middleware to handle multer upload and potential errors
const handleUpload = (req, res, next) => {
  const uploadFields = upload.fields([
    { name: 'banner_image', maxCount: 1 },
    { name: 'think_image', maxCount: 1 }
  ]);

  uploadFields(req, res, function (err) {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    next();
  });
};

// 1. GET ALL ITEMS
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM whatwedodetail ORDER BY created_at DESC');
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
  }
});

// 2. GET SINGLE ITEM BY ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM whatwedodetail WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Detail record not found' });
    }
    res.json({ success: true, data: rows[0] });
  } catch (error) {
    console.error('Error fetching single detail record:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
  }
});

// 3. POST - CREATE NEW DETAIL RECORD WITH IMAGE UPLOADS
router.post('/', handleUpload, async (req, res) => {
  try {
    const {
      whatwedo_id,
      banner_title,
      expertise_header,
      expertise_desc,
      think_header,
      think_desc
    } = req.body;

    if (!whatwedo_id) {
      // Clean up uploaded files if validation fails
      if (req.files) {
        if (req.files['banner_image']) deleteFile(req.files['banner_image'][0].filename);
        if (req.files['think_image']) deleteFile(req.files['think_image'][0].filename);
      }
      return res.status(400).json({ success: false, message: 'whatwedo_id is required' });
    }

    const banner_image = req.files && req.files['banner_image'] 
      ? `/uploads/${req.files['banner_image'][0].filename}` 
      : null;

    const think_image = req.files && req.files['think_image'] 
      ? `/uploads/${req.files['think_image'][0].filename}` 
      : null;

    const [result] = await db.query(
      `INSERT INTO whatwedodetail 
       (whatwedo_id, banner_image, banner_title, expertise_header, expertise_desc, think_image, think_header, think_desc) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        whatwedo_id,
        banner_image,
        banner_title || null,
        expertise_header || null,
        expertise_desc || null,
        think_image || null,
        think_header || null,
        think_desc || null
      ]
    );

    res.status(201).json({
      success: true,
      message: 'Detail record created successfully',
      data: {
        id: result.insertId,
        whatwedo_id,
        banner_image,
        banner_title,
        expertise_header,
        expertise_desc,
        think_image,
        think_header,
        think_desc
      }
    });
  } catch (error) {
    console.error('Error inserting detail record:', error);
    // Clean up uploaded files in case of db errors
    if (req.files) {
      if (req.files['banner_image']) deleteFile(req.files['banner_image'][0].filename);
      if (req.files['think_image']) deleteFile(req.files['think_image'][0].filename);
    }
    res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
  }
});

// 4. PUT - UPDATE DETAIL RECORD BY ID
router.put('/:id', handleUpload, async (req, res) => {
  const { id } = req.params;
  try {
    // Check if the record exists
    const [existing] = await db.query('SELECT * FROM whatwedodetail WHERE id = ?', [id]);
    if (existing.length === 0) {
      // Clean up uploaded files if record doesn't exist
      if (req.files) {
        if (req.files['banner_image']) deleteFile(req.files['banner_image'][0].filename);
        if (req.files['think_image']) deleteFile(req.files['think_image'][0].filename);
      }
      return res.status(404).json({ success: false, message: 'Detail record not found' });
    }

    const currentRecord = existing[0];
    const {
      whatwedo_id,
      banner_title,
      expertise_header,
      expertise_desc,
      think_header,
      think_desc
    } = req.body;

    // Handle uploaded files
    let banner_image = currentRecord.banner_image;
    let think_image = currentRecord.think_image;

    if (req.files && req.files['banner_image']) {
      // Delete old file if existed
      if (currentRecord.banner_image) {
        deleteFile(currentRecord.banner_image);
      }
      banner_image = `/uploads/${req.files['banner_image'][0].filename}`;
    }

    if (req.files && req.files['think_image']) {
      // Delete old file if existed
      if (currentRecord.think_image) {
        deleteFile(currentRecord.think_image);
      }
      think_image = `/uploads/${req.files['think_image'][0].filename}`;
    }

    // Keep existing values if not provided in the request body
    const final_whatwedo_id = whatwedo_id !== undefined ? whatwedo_id : currentRecord.whatwedo_id;
    const final_banner_title = banner_title !== undefined ? banner_title : currentRecord.banner_title;
    const final_expertise_header = expertise_header !== undefined ? expertise_header : currentRecord.expertise_header;
    const final_expertise_desc = expertise_desc !== undefined ? expertise_desc : currentRecord.expertise_desc;
    const final_think_header = think_header !== undefined ? think_header : currentRecord.think_header;
    const final_think_desc = think_desc !== undefined ? think_desc : currentRecord.think_desc;

    await db.query(
      `UPDATE whatwedodetail SET 
       whatwedo_id = ?, 
       banner_image = ?, 
       banner_title = ?, 
       expertise_header = ?, 
       expertise_desc = ?, 
       think_image = ?, 
       think_header = ?, 
       think_desc = ? 
       WHERE id = ?`,
      [
        final_whatwedo_id,
        banner_image,
        final_banner_title,
        final_expertise_header,
        final_expertise_desc,
        think_image,
        final_think_header,
        final_think_desc,
        id
      ]
    );

    res.json({
      success: true,
      message: 'Detail record updated successfully',
      data: {
        id,
        whatwedo_id: final_whatwedo_id,
        banner_image,
        banner_title: final_banner_title,
        expertise_header: final_expertise_header,
        expertise_desc: final_expertise_desc,
        think_image,
        think_header: final_think_header,
        think_desc: final_think_desc
      }
    });
  } catch (error) {
    console.error('Error updating detail record:', error);
    // Clean up uploaded files in case of db errors
    if (req.files) {
      if (req.files['banner_image']) deleteFile(req.files['banner_image'][0].filename);
      if (req.files['think_image']) deleteFile(req.files['think_image'][0].filename);
    }
    res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
  }
});

// 5. DELETE - DELETE RECORD BY ID (and associated files)
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // Check if the record exists
    const [rows] = await db.query('SELECT * FROM whatwedodetail WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Detail record not found' });
    }

    const record = rows[0];

    // Delete database entry
    await db.query('DELETE FROM whatwedodetail WHERE id = ?', [id]);

    // Delete associated physical files
    if (record.banner_image) deleteFile(record.banner_image);
    if (record.think_image) deleteFile(record.think_image);

    res.json({ success: true, message: 'Detail record and associated images deleted successfully' });
  } catch (error) {
    console.error('Error deleting detail record:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
  }
});

module.exports = router;
