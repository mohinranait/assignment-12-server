const { createSearchTag, getSearchTagWithReverceCounter } = require('../controllers/SearchTagController');

const searchTagRouter = require('express').Router();


searchTagRouter.post('/create-search-tag', createSearchTag);
searchTagRouter.get('/get-search-tag', getSearchTagWithReverceCounter);

module.exports = searchTagRouter