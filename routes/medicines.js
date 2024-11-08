const express = require('express');
const path = require('path');
const router = express.Router();
const medicinesController = require('../controllers/medicinesController');

router.get('/', medicinesController.getMedicines);
router.get('/download', medicinesController.downloadMedicines);
router.get('/json', medicinesController.getMedicinesInJson);
router.get('/add', medicinesController.showAddMedicineForm);
router.post('/add', medicinesController.addNewMedicine);
router.get('/:id', medicinesController.getMedicineById);
router.get('/:medicineId/reviews/add', medicinesController.getAddReviewForm);
router.post('/:medicineId/reviews/add', medicinesController.addReview);
router.get('/:id/reviews', medicinesController.getMedicineReviews);
router.get('/edit/:id', medicinesController.showEditMedicineForm);
router.post('/edit/:id', medicinesController.editMedicine);

module.exports = router;
