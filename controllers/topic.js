'use strict'
var validator = require('validator');
var Topic = require('../models/topic');

var controller = {
    test: function(req, res) {
        return res.status(200).send({
            message: 'Hola que tal'
        });
    },

    save: function(req, res) {

        // Recoger parametros por post
        var params = req.body;

        // Validar datos
        try {

            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);
            var validate_lang = !validator.isEmpty(params.lang);

        } catch (err) {
            return res.status(200).send({
                message: 'Faltan datos por enviar'
            });
        }

        if (validate_content && validate_title && validate_lang) {

            // Crear objeto guardar 
            var topic = new Topic();

            // Asignar valores
            topic.title = params.title;
            topic.content = params.content;
            topic.code = params.code;
            topic.lang = params.lang;

            // Guardar el topic 
            topic.save((err, topicStored) => {

                if (err || !topicStored) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'El tema no se a guardado'
                    });
                }

                return res.status(200).send({
                    status: 'success',
                    topic: topicStored
                });
            });

            // Devolver una respuesta

        } else {
            return res.status(200).send({
                message: 'Los datos no son validos'
            });
        }

    }
}

module.exports = controller;