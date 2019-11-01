'use strict'

// Requires 
var express = require('express');
var bodyParser = require('body-parser');

// Ejecutar express
var app = express();


// Cargar archivos de rutas
var userRoutes = require('./routes/user');
var topicRoutes = require('./routes/topic');

// Middelwares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// CORS

// Reescribir Rutas
app.use('/api', userRoutes);
app.use('/api', topicRoutes);


// Exporar el modulo 
module.exports = app;