const express = require('express');
const router = express.Router();
const healthTipsController = require('../controllers/healthTipsController');

router.get('/', healthTipsController.getHealthTipsPage);

module.exports = router;
