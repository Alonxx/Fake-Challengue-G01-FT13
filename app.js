'use strict';

var express = require('express');
const router = require('./routes');
//var bodyParser = require('body-parser');
var app = express();
module.exports = app; // esto es solo para testear mas facil

const users = require('./routes/users')
// acuerdense de agregar su router o cualquier middleware que necesiten aca
app.use(express.json())


app.use('/',router)
//app.use('/family',family)
// el condicional es solo para evitar algun problema de tipo EADDRINUSE con mocha watch + supertest + npm test.
if (!module.parent) app.listen(3000);
