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
<<<<<<< HEAD
  console.log(`App running on port "http://localhost:${port}/shop"`)
=======
  console.log(`App running on "http://localhost:${port}"`)
>>>>>>> c04c0e91f2283a6806a60bbf1f1abf15bd84c6f8
})