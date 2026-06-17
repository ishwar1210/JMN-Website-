const express = require('express');
const router = express.Router();
const WhatWeDoPage = require('../models/whatwedoPage');

/**
 * GET /api/whatwedo-page
 * Fetches the complete WhatWeDo page data in a single query.
 * Returns banner, expertise, think_cards, do_items (with images) all at once.
 */
router.get('/', async (req, res) => {
  try {
    const page = await WhatWeDoPage.getPage();

    if (!page) {
      return res.status(404).json({
        success: false,
        message: 'WhatWeDo page data not found'
      });
    }

    res.json({
      success: true,
      data: page
    });
  } catch (error) {
    console.error('Error fetching WhatWeDo page:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

/**
 * POST /api/whatwedo-page
 * Create a new WhatWeDo page row.
 */
router.post('/', async (req, res) => {
  try {
    const result = await WhatWeDoPage.create(req.body);
    res.status(201).json({
      success: true,
      data: result,
      message: 'Page created successfully'
    });
  } catch (error) {
    console.error('Error creating WhatWeDo page:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

/**
 * PUT /api/whatwedo-page/:id
 * Update the WhatWeDo page data. All fields are optional.
 */
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await WhatWeDoPage.update(id, req.body);

    if (updated) {
      const page = await WhatWeDoPage.getPage();
      res.json({
        success: true,
        data: page,
        message: 'Page updated successfully'
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Page not found or not updated'
      });
    }
  } catch (error) {
    console.error('Error updating WhatWeDo page:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

/**
 * DELETE /api/whatwedo-page/:id
 * Delete a WhatWeDo page row by id.
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await WhatWeDoPage.delete(id);

    if (deleted) {
      res.json({
        success: true,
        message: 'Page deleted successfully'
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Page not found'
      });
    }
  } catch (error) {
    console.error('Error deleting WhatWeDo page:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;
