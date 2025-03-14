const express = require("express");
const router = express.Router();
const { bookSession, cancelReservation, getUserReservations } = require("../controllers/reservationController");
const { authMiddleware, authorizeRoles } = require("../middleware/authMiddleware");

// POST /api/reservations - Book a session (for members)
router.post("/", authMiddleware, authorizeRoles("member"), bookSession);

// DELETE /api/reservations/:id - Cancel a reservation (for trainers)
router.delete("/:id", authMiddleware, authorizeRoles("trainer"), cancelReservation);

// GET /api/reservations/:userId - Get reservations for a user (for members)
router.get("/:userId", authMiddleware, authorizeRoles("member"), getUserReservations);

module.exports = router;