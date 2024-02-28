const express = require('express');
const ApiWebPageController = require('../controllers/APIWebPageController');

const router = express.Router();

router
    .route('/')
    .get(ApiWebPageController.search);

module.exports = router;
