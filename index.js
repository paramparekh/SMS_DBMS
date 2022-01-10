const express = require('express')

const app = express()
var Routes = require('./allRoutes');
var path = require('path');
const { request } = require('http');
const { response } = require('express');
const port = 3000

app.use("/JS", express.static('./JS/'));
app.use("/CSS",express.static('./CSS/'));




app.use('/shop',Routes);

app.listen(port, () => {

  console.log(`App running on "http://localhost:${port}/shop"`)

})