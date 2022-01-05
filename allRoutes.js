var express = require('express');
var router = express.Router();
const db = require('./queries.js');


router.get('/', (request, response) => {
    response.sendFile(__dirname+'/Modules/Home.html');
  })

router.get('/InventoryPage', (request, response) => {
    response.sendFile(__dirname+'/Modules/Inventory.html');
  })

router.get('/MobilePage', (request, response) => {
    response.sendFile(__dirname+'/Modules/Mobile.html');
  })
router.get('/SupplierPage', (request, response) => {
    response.sendFile(__dirname+'/Modules/Supplier.html');
  })
  
router.get('/Mobpage',db.getMobileDetail);

  

module.exports = router;