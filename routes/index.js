var express = require('express');
var router = express.Router();
const Assurance = require('../src/models/AssuranceModel');
const Memory = require('../src/database/Memory');

/* GET home page. */
router.get('/', async function (req, res, next) {
  if (req.cookies.auth) {
    let assurances = await Assurance.find({});
    assurances = assurances.sort((a, b) => {
      const fullname1 = a.name;
      const fullname2 = b.name;
      return fullname1.localeCompare(fullname2);
    })
    let allAssurance = Memory.assurances;
    res.render('index', { title: "FEGASA - Constat à l'amiable", assurances, allAssurance });
  } else {
    res.render('login');
  }

});

module.exports = router;
