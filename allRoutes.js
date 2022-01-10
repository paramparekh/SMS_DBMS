const { request, response } = require('express');
var express = require('express');
var router = express.Router();
const db = require('./queries.js');
const bodyParser = require('body-parser')

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

router.get('/MobilePage/addMobile', (request,response)=>{
    response.sendFile(__dirname+'/Modules/addMob.html');
});  

router.post('/MobilePage/addMobile',db.addMobile);



module.exports = router;