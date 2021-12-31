const express = require('express')
const bodyParser = require('body-parser')
const app = express()
//const db = require('./queries')
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

app.get('/inventoryPage',(req,res) =>{
    res.sendFile(__dirname+'/Modules/Inventory.html');
})

app.get('/MobilePage',(req,res) => {
  res.sendFile(__dirname+'/Modules/Mobile.html');
})


app.get('/MApage',(req,res) => {
  res.sendFile(__dirname+'/Modules/MA.html');
})





app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})