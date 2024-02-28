const express = require('express');
const WebPageController = require('../controllers/WebPageController');

const router = express.Router();

router
    .route('/')
    .get(WebPageController.search);

module.exports = router;
