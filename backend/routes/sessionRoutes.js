const express = require("express");
const router = express.Router();
const { createSession, getAllSessions, updateSession, deleteSession } = require("../controllers/sessionController");
const { authMiddleware, authorizeRoles } = require("../middleware/authMiddleware");

router.post("/", authMiddleware, authorizeRoles("trainer"), createSession); 
router.get("/", authMiddleware, getAllSessions); 
router.put("/:id", authMiddleware, authorizeRoles("trainer"), updateSession); 
router.delete("/:id", authMiddleware, authorizeRoles("trainer"), deleteSession); 

module.exports = router;
