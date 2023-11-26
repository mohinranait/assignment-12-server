const announceRoute = require("express").Router();

const { createAnnouncement, getAllAnnouncement } = require("../controllers/AnnouncementController");


announceRoute.post('/announcements', createAnnouncement)
announceRoute.get('/all-announcements', getAllAnnouncement)

module.exports = announceRoute