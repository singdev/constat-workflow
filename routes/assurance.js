var express = require('express');
var router = express.Router();
var assuranceController = require('../src/controller/assuranceController');
var authController = require('../src/controller/authenticationController');

/* GET users listing. */
router.get('/', authController.verifyAccessToken, assuranceController.getAllAssurance);

router.post('/', authController.verifyAccessToken, assuranceController.createAssurance);

router.post('/:id', authController.verifyAccessToken, assuranceController.updateAssurance);

router.get('/memory', assuranceController.getAssurancesInMemory);

module.exports = router;
