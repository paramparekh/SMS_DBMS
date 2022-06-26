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
router.get('/Cuspage',db.getcustomerDetail);
router.get('/Suppage',db.getSupplierDetail);
router.post('/Suppage',db.addSupplier);
router.post('/Mobpage',db.addmobile);
router.patch('/:id',db.updateSupplier);
router.delete('/:id',db.deleteSupplier);
router.delete('/mobile/:id',db.deletemobile);
router.patch('/updatemobile/:mobile_id',db.updateMobile);
router.post('/billpage',db.addcustomer);
module.exports = router;