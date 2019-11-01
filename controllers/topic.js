'use strict'

var controller = {
    test: function(req, res) {
        return res.status(200).send({
            message: 'Hola que tal'
        });
    },

    save: function(req, res) {

        // Recoger parametros por post

        // Validar datos

        // Crear objeto guardar 

        // Asignar valores

        // Guardar el topic 

        // Devolver una respuesta


        return res.status(200).send({
            message: 'soy metodo pra guardar topic'
        });
    }
}

module.exports = controller;