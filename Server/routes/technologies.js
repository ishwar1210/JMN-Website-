const express = require('express');
const router = express.Router();
const Technologies = require('../models/technologies');

// GET /api/technologies - Get all items
router.get('/', async (req, res) => {
  try {
    const items = await Technologies.getAll();
    res.json({ success: true, data: items });
  } catch (error) {
    console.error('Error fetching technologies:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/technologies/:slug - Get single item by slug
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const item = await Technologies.getBySlug(slug);

    if (!item) {
      return res.status(404).json({ success: false, message: 'Technology not found' });
    }

    res.json({ success: true, data: item });
  } catch (error) {
    console.error('Error fetching technology:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST /api/technologies - Create new item
router.post('/', async (req, res) => {
  try {
    const { name, slug, description, icon, sort_order } = req.body;

    if (!name || !slug) {
      return res.status(400).json({ success: false, message: 'name and slug are required' });
    }

    const existing = await Technologies.getBySlug(slug);
    if (existing) {
      return res.status(409).json({ success: false, message: 'Slug already exists' });
    }

    const newItem = await Technologies.create({ name, slug, description, icon, sort_order });
    res.status(201).json({ success: true, data: newItem, message: 'Technology created successfully' });
  } catch (error) {
    console.error('Error creating technology:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// PUT /api/technologies/:id - Update item by id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug, description, icon, sort_order, is_active } = req.body;

    const existingItem = await Technologies.getById(id);
    if (!existingItem) {
      return res.status(404).json({ success: false, message: 'Technology not found' });
    }

    if (!name || !slug) {
      return res.status(400).json({ success: false, message: 'name and slug are required' });
    }

    // Slug uniqueness check (current item ko exclude karo)
    const slugExists = await Technologies.getBySlug(slug);
    if (slugExists && slugExists.id !== parseInt(id)) {
      return res.status(409).json({ success: false, message: 'Slug already exists for another item' });
    }

    const updated = await Technologies.update(id, { name, slug, description, icon, sort_order, is_active });
    if (updated) {
      const updatedItem = await Technologies.getById(id);
      res.json({ success: true, data: updatedItem, message: 'Technology updated successfully' });
    } else {
      res.status(500).json({ success: false, message: 'Failed to update technology' });
    }
  } catch (error) {
    console.error('Error updating technology:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// DELETE /api/technologies/:id - Delete item by id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const existingItem = await Technologies.getById(id);
    if (!existingItem) {
      return res.status(404).json({ success: false, message: 'Technology not found' });
    }

    const deleted = await Technologies.delete(id);
    if (deleted) {
      res.json({ success: true, message: 'Technology deleted successfully' });
    } else {
      res.status(500).json({ success: false, message: 'Failed to delete technology' });
    }
  } catch (error) {
    console.error('Error deleting technology:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;