const express = require('express');
const router = express.Router();
const calculatorsController = require('../controllers/calculatorsController');

router.get('/', calculatorsController.getCalculatorsPage);

module.exports = router;
