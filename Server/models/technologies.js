const pool = require('../config/db');

const Technologies = {
  // Get all active items
  async getAll() {
    const [rows] = await pool.query(
      'SELECT * FROM technologies WHERE is_active = 1 ORDER BY sort_order'
    );
    return rows;
  },

  // Get single item by slug
  async getBySlug(slug) {
    const [rows] = await pool.query(
      'SELECT * FROM technologies WHERE slug = ?',
      [slug]
    );
    return rows[0] || null;
  },

  // Get single item by id
  async getById(id) {
    const [rows] = await pool.query(
      'SELECT * FROM technologies WHERE id = ?',
      [id]
    );
    return rows[0] || null;
  },

  // Create new item
  async create({ name, slug, description, icon, sort_order }) {
    const [result] = await pool.query(
      'INSERT INTO technologies (name, slug, description, icon, sort_order) VALUES (?, ?, ?, ?, ?)',
      [name, slug, description || null, icon || null, sort_order || 0]
    );
    return { id: result.insertId, name, slug, description, icon, sort_order };
  },

  // Update item by id
  async update(id, { name, slug, description, icon, sort_order, is_active }) {
    const [result] = await pool.query(
      'UPDATE technologies SET name = ?, slug = ?, description = ?, icon = ?, sort_order = ?, is_active = ? WHERE id = ?',
      [name, slug, description || null, icon || null, sort_order || 0, is_active !== undefined ? is_active : 1, id]
    );
    return result.affectedRows > 0;
  },

  // Delete item by id
  async delete(id) {
    const [result] = await pool.query(
      'DELETE FROM technologies WHERE id = ?',
      [id]
    );
    return result.affectedRows > 0;
  }
};

module.exports = Technologies;