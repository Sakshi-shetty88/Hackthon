const express = require('express');
const router = express.Router();
const Alert = require('../models/Alert');

// GET all incidents (visible to all admins/responders)
router.get('/api/incidents/all', async (req, res) => {
  try {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);

    const incidents = await Alert.find({
      createdAt: { $gte: weekAgo }
    })
    .populate('user_id', 'username')
    .populate('responder_id', 'username')
    .sort({
      status: 1, // pending/responding first, completed last
      priority: 1, // High first
      createdAt: -1 // newest first
    });

    res.json(incidents);
  } catch (error) {
    console.error('Error fetching incidents:', error);
    res.status(500).json({ error: 'Failed to fetch incidents' });
  }
});

// PATCH accept and respond to incident
router.patch('/api/incidents/:id/accept', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, responder_id, responded_at } = req.body;

    await Alert.findByIdAndUpdate(id, {
      status,
      responder_id,
      responded_at
    });

    res.json({ message: 'Incident accepted successfully' });
  } catch (error) {
    console.error('Error accepting incident:', error);
    res.status(500).json({ error: 'Failed to accept incident' });
  }
});

// PATCH mark incident as complete
router.patch('/api/incidents/:id/complete', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, completed_at } = req.body;

    await Alert.findByIdAndUpdate(id, {
      status,
      completed_at
    });

    res.json({ message: 'Incident marked as complete' });
  } catch (error) {
    console.error('Error completing incident:', error);
    res.status(500).json({ error: 'Failed to complete incident' });
  }
});

module.exports = router;
