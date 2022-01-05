const express = require('express')
const bodyParser = require('body-parser')
const db=require('./JS/queries')
const app = express()

var path = require('path');
const { request } = require('http');
const { response } = require('express');
const port = 3000

app.use("/JS", express.static('./JS/'));

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.sendFile(__dirname+'/Modules/Home.html');
})
app.get('/InventoryPage', (request, response) => {
  response.sendFile(__dirname+'/Modules/Inventory.html');
})
app.get('/MobilePage', (request, response) => {
  response.sendFile(__dirname+'/Modules/Mobile.html');
})

app.get('/Mobpage',db.getMobileDetail);

app.listen(port, () => {
  console.log(`App running on "http://localhost:${port}"`)
})