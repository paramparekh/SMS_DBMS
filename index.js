const express = require('express')
const bodyParser = require('body-parser')
const app = express()
var Routes = require('./allRoutes');
var path = require('path');
const { request } = require('http');
const { response } = require('express');
const port = 3000

app.use("/JS", express.static('./JS/'));
app.use("/CSS",express.static('./CSS/'));
app.use('/shop',Routes);


app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)


app.listen(port, () => {
  console.log(`App running on port "http://localhost:${port}/shop"`)
})