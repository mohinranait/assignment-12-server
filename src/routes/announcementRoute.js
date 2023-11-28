const announceRoute = require("express").Router();

const { createAnnouncement, getAllAnnouncement } = require("../controllers/AnnouncementController");
const { isAdmin } = require("../middleware/isAdmin");
const { verifyToken } = require("../middleware/verifyToken");


announceRoute.post('/announcements', verifyToken, isAdmin, createAnnouncement)
announceRoute.get('/all-announcements', getAllAnnouncement)

module.exports = announceRoute