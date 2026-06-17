const pool = require('../config/db');

const WhatWeDoPage = {
  /**
   * Get the WhatWeDo page data (single row).
   * Only 1 database query for the entire page.
   * JSON columns (think_cards, do_items) are auto-parsed by MySQL.
   */
  async getPage() {
    const [rows] = await pool.query(
      'SELECT * FROM whatwedo_page WHERE is_active = 1 LIMIT 1'
    );
    if (rows.length === 0) return null;

    const page = rows[0];

    // Parse JSON strings into objects if they are strings
    if (typeof page.think_cards === 'string') {
      page.think_cards = JSON.parse(page.think_cards);
    }
    if (typeof page.do_items === 'string') {
      page.do_items = JSON.parse(page.do_items);
    }

    return page;
  },

  /**
   * Update the WhatWeDo page (single row by id).
   */
  async update(id, data) {
    const {
      banner_title, banner_image,
      expertise_header, expertise_lead, expertise_body,
      think_header, think_description, think_cards,
      do_header, do_description, do_items
    } = data;

    // Convert arrays to JSON strings for storage
    const thinkCardsJson = think_cards ? JSON.stringify(think_cards) : undefined;
    const doItemsJson = do_items ? JSON.stringify(do_items) : undefined;

    const [result] = await pool.query(
      `UPDATE whatwedo_page SET
        banner_title = COALESCE(?, banner_title),
        banner_image = COALESCE(?, banner_image),
        expertise_header = COALESCE(?, expertise_header),
        expertise_lead = COALESCE(?, expertise_lead),
        expertise_body = COALESCE(?, expertise_body),
        think_header = COALESCE(?, think_header),
        think_description = COALESCE(?, think_description),
        think_cards = COALESCE(?, think_cards),
        do_header = COALESCE(?, do_header),
        do_description = COALESCE(?, do_description),
        do_items = COALESCE(?, do_items)
      WHERE id = ? AND is_active = 1`,
      [
        banner_title, banner_image,
        expertise_header, expertise_lead, expertise_body,
        think_header, think_description, thinkCardsJson,
        do_header, do_description, doItemsJson,
        id
      ]
    );
    return result.affectedRows > 0;
  },

  /**
   * Create a new WhatWeDo page row.
   * All fields are optional; sensible defaults will be used.
   */
  async create(data) {
    const {
      banner_title, banner_image,
      expertise_header, expertise_lead, expertise_body,
      think_header, think_description, think_cards,
      do_header, do_description, do_items
    } = data;

    const thinkCardsJson = think_cards ? JSON.stringify(think_cards) : null;
    const doItemsJson = do_items ? JSON.stringify(do_items) : null;

    const [result] = await pool.query(
      `INSERT INTO whatwedo_page (
        banner_title, banner_image,
        expertise_header, expertise_lead, expertise_body,
        think_header, think_description, think_cards,
        do_header, do_description, do_items
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        banner_title || 'Automotive',
        banner_image || '/images/whatwedo/automotive-banner.jpg',
        expertise_header || 'Our Expertise',
        expertise_lead || null,
        expertise_body || null,
        think_header || 'What We Think',
        think_description || null,
        thinkCardsJson,
        do_header || 'What We Do',
        do_description || null,
        doItemsJson
      ]
    );
    return { id: result.insertId };
  },

  /**
   * Delete a WhatWeDo page row by id.
   */
  async delete(id) {
    const [result] = await pool.query(
      'DELETE FROM whatwedo_page WHERE id = ?',
      [id]
    );
    return result.affectedRows > 0;
  }
};

module.exports = WhatWeDoPage;
