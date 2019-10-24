'use strict'

// Requires 
var express = require('express');
var bodyParser = require('body-parser');

// Ejecutar express

var app = express();
// Cargar archivos de rutas

// Middelwares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// CORS

// Rutas

// Ruta metodo de prueba
app.get('/prueba', (req, res) => {
    return res.status(200).send({
        nombre: 'Andres Alba',
        message: 'Hola mundo desde el backend con NODE'
    });
});

app.post('/prueba', (req, res) => {
    return res.status(200).send({
        nombre: 'Andres Alba',
        message: 'Hola mundo desde el backend con NODE soy un post'
    });
});


// Reescribir rutas

// Exporar el modulo 
module.exports = app;