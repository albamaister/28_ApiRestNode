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
            topic.user = req.user.sub;

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

    },

    getTopics: function(req, res) {

        // cargar la libreria de paginacion en la clase(EN EL MODELO)

        // Recoger la pagina actual
        if (req.params.page == null || req.params.page == "0" || req.params.page == undefined || req.params.page == false) {
            var page = 1;
        } else {
            var page = parseInt(req.params.page);
        }

        // Indicar las opciones de paginacion
        var options = {
            sort: { date: -1 },
            populate: 'user',
            limit: 5,
            page: page
        }

        // Find paginado
        Topic.paginate({}, options, (err, topics) => {

            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al hacer la consulta'
                });
            }
            if (!topics) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay topics'
                });
            }

            // Devolver resultado (topics, total de topics, total de paginas)
            return res.status(200).send({
                status: 'success',
                topics: topics.docs,
                totalDocs: topics.totalDocs,
                totalPages: topics.totalPages
            });
        });

    },
    getTopicsByUser: function(req, res) {

        // Conseguir el id de usuario
        var userId = req.params.user;

        // Find con una condicion de usuario
        Topic.find({
                user: userId
            })
            .sort([
                ['date', 'descending']
            ])
            .exec((err, topics) => {
                if (err) {
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error en la peticion'
                    });
                }

                if (!topics) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'No hay temas para mostrar'
                    });
                }

                // Devolver un resultado


                return res.status(200).send({
                    status: 'success',
                    topics: topics
                });
            });
    },

    getTopic: function(req, res) {

        // Sacar id del topic de la url 
        var topicId = req.params.id;
        // Find por id del topic 
        Topic.findById(topicId)
            .populate('user')
            .exec((err, topic) => {

                if (err) {
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error en la peticion '
                    });
                }
                if (!topic) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'No existe el topic'
                    });
                }
                // devolver resultado
                return res.status(200).send({
                    status: 'success',
                    topic
                });
            });


    }
};

module.exports = controller;