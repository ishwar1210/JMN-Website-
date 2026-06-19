const express = require('express');
const router = express.Router();
const db = require('../config/db');

// 1. GET ALL ITEMS
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM career_applications ORDER BY applied_at DESC');
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error fetching career applications:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
  }
});

// 2. GET SINGLE ITEM BY ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM career_applications WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }
    res.json({ success: true, data: rows[0] });
  } catch (error) {
    console.error('Error fetching single application:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
  }
});

// 3. POST - CREATE NEW ITEM
router.post('/', async (req, res) => {
  const { candidate_name, candidate_contact, candidate_email, candidate_location, job_title } = req.body;

  if (!candidate_name) {
    return res.status(400).json({ success: false, message: 'Please provide required fields: candidate_name' });
  }

  try {
    const [result] = await db.query(
      `INSERT INTO career_applications 
       (candidate_name, candidate_contact, candidate_email, candidate_location, job_title) 
       VALUES (?, ?, ?, ?, ?)`,
      [
        candidate_name,
        candidate_contact || null,
        candidate_email || null,
        candidate_location || null,
        job_title || null
      ]
    );

    res.status(201).json({
      success: true,
      message: 'Application created successfully',
      data: {
        id: result.insertId,
        candidate_name,
        candidate_contact,
        candidate_email,
        candidate_location,
        job_title
      }
    });
  } catch (error) {
    console.error('Error inserting application:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
  }
});

// 4. PUT - UPDATE ITEM BY ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { candidate_name, candidate_contact, candidate_email, candidate_location, job_title } = req.body;

  if (!candidate_name) {
    return res.status(400).json({ success: false, message: 'Please provide required fields: candidate_name' });
  }

  try {
    // Check if item exists
    const [existingItem] = await db.query('SELECT id FROM career_applications WHERE id = ?', [id]);
    if (existingItem.length === 0) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    await db.query(
      `UPDATE career_applications SET 
       candidate_name = ?, 
       candidate_contact = ?, 
       candidate_email = ?, 
       candidate_location = ?, 
       job_title = ? 
       WHERE id = ?`,
      [
        candidate_name,
        candidate_contact || null,
        candidate_email || null,
        candidate_location || null,
        job_title || null,
        id
      ]
    );

    res.json({
      success: true,
      message: 'Application updated successfully',
      data: {
        id,
        candidate_name,
        candidate_contact,
        candidate_email,
        candidate_location,
        job_title
      }
    });
  } catch (error) {
    console.error('Error updating application:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
  }
});

// 5. DELETE - DELETE ITEM BY ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // Check if item exists
    const [existingItem] = await db.query('SELECT id FROM career_applications WHERE id = ?', [id]);
    if (existingItem.length === 0) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    await db.query('DELETE FROM career_applications WHERE id = ?', [id]);

    res.json({ success: true, message: 'Application deleted successfully' });
  } catch (error) {
    console.error('Error deleting application:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
  }
});

module.exports = router;
