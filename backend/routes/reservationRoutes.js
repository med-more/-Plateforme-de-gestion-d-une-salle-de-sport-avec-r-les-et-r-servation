const express = require("express");
const router = express.Router();
const { bookSession, cancelReservation, getUserReservations } = require("../controllers/reservationController");

router.post("/", bookSession);
router.delete("/:id", cancelReservation);
router.get("/", getUserReservations);

module.exports = router;
