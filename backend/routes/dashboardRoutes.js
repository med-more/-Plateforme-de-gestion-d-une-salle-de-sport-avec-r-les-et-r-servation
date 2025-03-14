const express = require('express');
const router = express.Router();

// GET /dashboard/:userId
router.get('/:userId', (req, res) => {
  const { userId } = req.params;

  // Fetch dashboard data for the user
  const dashboardData = {
    totalSessions: 10,
    upcomingSessions: 3,
    completedSessions: 7,
  };

  res.status(200).json(dashboardData);
});

module.exports = router;