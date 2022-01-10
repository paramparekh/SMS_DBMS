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
router.get('/Suppage',db.getSupplierDetail);

router.post('/addSupplier',db.addSupplier);

module.exports = router;