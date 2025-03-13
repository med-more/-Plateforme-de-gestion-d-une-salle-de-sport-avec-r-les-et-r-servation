const express = require("express");
const router = express.Router();
const { bookSession, cancelReservation, getUserReservations } = require("../controllers/reservationController");
const { authMiddleware, authorizeRoles } = require("../middleware/authMiddleware");


router.post("/",authMiddleware, authorizeRoles("member"), bookSession);
router.delete("/:id",authMiddleware,authorizeRoles("trainer"), cancelReservation);
router.get("/",authMiddleware,authorizeRoles("member") , getUserReservations);

module.exports = router;
