const announceRoute = require("express").Router();

const { createAnnouncement } = require("../controllers/AnnouncementController");


announceRoute.post('/announcements', createAnnouncement)

module.exports = announceRoute