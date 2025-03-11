const express = require("express");
const router = express.Router();
const { createSession, getAllSessions, updateSession, deleteSession } = require("../controllers/sessionController");

router.post("/", createSession);
router.get("/", getAllSessions);
router.put("/:id", updateSession);
router.delete("/:id", deleteSession);

module.exports = router;
