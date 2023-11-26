const { createTag ,getAllTags } = require("../controllers/TagController");
const { isAdmin } = require("../middleware/isAdmin");
const { verifyToken } = require("../middleware/verifyToken");


const tagRoute = require("express").Router();

tagRoute.post('/create-tags', verifyToken, isAdmin, createTag);
tagRoute.get('/get-all-tags', getAllTags);

module.exports = tagRoute