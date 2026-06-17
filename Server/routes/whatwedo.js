const express = require('express');
const router = express.Router();
const WhatWeDo = require('../models/whatwedo');

// GET /api/whatwedo - Get all items (grouped by category)
router.get('/', async (req, res) => {
  try {
    const items = await WhatWeDo.getAll();

    // Group by category
    const grouped = {
      solutions: items.filter(item => item.category === 'solutions'),
      products: items.filter(item => item.category === 'products'),
      industries: items.filter(item => item.category === 'industries')
    };

    res.json({ success: true, data: grouped });
  } catch (error) {
    console.error('Error fetching whatwedo:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/whatwedo/category/:category - Get items by category
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const validCategories = ['solutions', 'products', 'industries'];

    if (!validCategories.includes(category)) {
      return res.status(400).json({ success: false, message: 'Invalid category' });
    }

    const items = await WhatWeDo.getByCategory(category);
    res.json({ success: true, data: items });
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/whatwedo/:slug - Get single item by slug
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const item = await WhatWeDo.getBySlug(slug);

    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }

    res.json({ success: true, data: item });
  } catch (error) {
    console.error('Error fetching item:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST /api/whatwedo - Create new item
router.post('/', async (req, res) => {
  try {
    const { name, slug, category, description, sort_order } = req.body;

    // Validation
    if (!name || !slug || !category) {
      return res.status(400).json({ success: false, message: 'name, slug, and category are required' });
    }

    const validCategories = ['solutions', 'products', 'industries'];
    if (!validCategories.includes(category)) {
      return res.status(400).json({ success: false, message: 'Invalid category. Use: solutions, products, or industries' });
    }

    // Check if slug already exists
    const existing = await WhatWeDo.getBySlug(slug);
    if (existing) {
      return res.status(409).json({ success: false, message: 'Slug already exists' });
    }

    const newItem = await WhatWeDo.create({ name, slug, category, description, sort_order });
    res.status(201).json({ success: true, data: newItem, message: 'Item created successfully' });
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// PUT /api/whatwedo/:id - Update item by id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug, category, description, sort_order, is_active } = req.body;

    // Check if item exists
    const existingItem = await WhatWeDo.getById(id);
    if (!existingItem) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }

    // Validation
    if (!name || !slug || !category) {
      return res.status(400).json({ success: false, message: 'name, slug, and category are required' });
    }

    const validCategories = ['solutions', 'products', 'industries'];
    if (!validCategories.includes(category)) {
      return res.status(400).json({ success: false, message: 'Invalid category. Use: solutions, products, or industries' });
    }

    // Check slug uniqueness (exclude current item)
    const slugExists = await WhatWeDo.getBySlug(slug);
    if (slugExists && slugExists.id !== parseInt(id)) {
      return res.status(409).json({ success: false, message: 'Slug already exists for another item' });
    }

    const updated = await WhatWeDo.update(id, { name, slug, category, description, sort_order, is_active });
    if (updated) {
      const updatedItem = await WhatWeDo.getById(id);
      res.json({ success: true, data: updatedItem, message: 'Item updated successfully' });
    } else {
      res.status(500).json({ success: false, message: 'Failed to update item' });
    }
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// DELETE /api/whatwedo/:id - Delete item by id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Check if item exists
    const existingItem = await WhatWeDo.getById(id);
    if (!existingItem) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }

    const deleted = await WhatWeDo.delete(id);
    if (deleted) {
      res.json({ success: true, message: 'Item deleted successfully' });
    } else {
      res.status(500).json({ success: false, message: 'Failed to delete item' });
    }
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
