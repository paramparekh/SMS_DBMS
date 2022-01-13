const { request, response } = require('express');
var express = require('express');
const { route } = require('express/lib/application');
var router = express.Router();
const bodyParser = require('body-parser')
const db = require('./queries.js');
router.use(bodyParser.json())
router.use(
  bodyParser.urlencoded({
    extended: true,
  })
)


router.use(bodyParser.json())
router.use(
  bodyParser.urlencoded({
    extended: true,
  })
)


  
router.get('/Mobpage',db.getMobileDetail);
router.get('/Suppage',db.getSupplierDetail);
router.post('/Suppage',db.addSupplier);
router.post('/Mobpage',db.addmobile);

module.exports = router;