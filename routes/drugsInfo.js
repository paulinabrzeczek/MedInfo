const express = require('express');
const router = express.Router();
const drugsInfoController = require('../controllers/drugsInfoController');

router.get('/', drugsInfoController.showMedicineInfo);

module.exports = router;


