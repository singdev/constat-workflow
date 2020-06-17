var express = require('express');
var router = express.Router();
var constatController = require('../src/controller/constatController');
var authController = require('../src/controller/constatAuthController');


/* GET users listing. */
router.get('/:token',  authController.verifyAccessToken, constatController.getConstatPage);

router.post('/', authController.generateToken, constatController.registerConstatAndNotify);

router.get('/state/:numero', constatController.getConstatState);

module.exports = router;
