const pool = require('../config/db');

const WhatWeDo = {
  // Get all items grouped by category
  async getAll() {
    const [rows] = await pool.query(
      'SELECT * FROM whatwedo ORDER BY category, sort_order'
    );
    return rows;
  },

  // Get items by category (solutions, products, industries)
  async getByCategory(category) {
    const [rows] = await pool.query(
      'SELECT * FROM whatwedo WHERE category = ? ORDER BY sort_order',
      [category]
    );
    return rows;
  },

  // Get single item by slug
  async getBySlug(slug) {
    const [rows] = await pool.query(
      'SELECT * FROM whatwedo WHERE slug = ?',
      [slug]
    );
    return rows[0] || null;
  },

  // Get single item by id
  async getById(id) {
    const [rows] = await pool.query(
      'SELECT * FROM whatwedo WHERE id = ?',
      [id]
    );
    return rows[0] || null;
  },

  // Create new item
  async create({ name, slug, category, description, sort_order }) {
    const [result] = await pool.query(
      'INSERT INTO whatwedo (name, slug, category, description, sort_order) VALUES (?, ?, ?, ?, ?)',
      [name, slug, category, description || null, sort_order || 0]
    );
    return { id: result.insertId, name, slug, category, description, sort_order };
  },

  // Update item by id
  async update(id, { name, slug, category, description, sort_order, is_active }) {
    const [result] = await pool.query(
      'UPDATE whatwedo SET name = ?, slug = ?, category = ?, description = ?, sort_order = ?, is_active = ? WHERE id = ?',
      [name, slug, category, description || null, sort_order || 0, is_active !== undefined ? is_active : 1, id]
    );
    return result.affectedRows > 0;
  },

  // Delete item by id
  async delete(id) {
    const [result] = await pool.query(
      'DELETE FROM whatwedo WHERE id = ?',
      [id]
    );
    return result.affectedRows > 0;
  }
};

module.exports = WhatWeDo;
