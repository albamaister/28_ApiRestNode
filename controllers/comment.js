'user strict'

var Topic = require('../models/topic');
var validator = require('validator');

var controller = {
    add: function(req, res) {
        // Recoger el id del topic de la url
        var idTopic = req.params.topicId

        // FInd por id del topic
        Topic.findById(idTopic).exec((err, topic) => {

            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error en la peticion'
                });
            }
            if (!topic) {
                return res.status(404).send({
                    status: 'notFound',
                    message: 'No existe el tema'
                });
            }
            // Comprobar objeto usuario y validad datos
            if (req.body.content) {
                 // Validar datos
                    try {
                        
                        var validate_content = !validator.isEmpty(req.body.content);                        

                    } catch (err) {
                        return res.status(200).send({
                            message: 'No as comentado nada'
                        });
                    }
                    if (validate_content) {
                        var comment = {
                            user: req.user.sub,
                            content: req.body.content                            
                        };

                        // En la propiedad comments del objeto resultante hacer un push
                        topic.comments.push(comment);

                        // Guardar el topic completo
                        topic.save((err) => {

                            if (err) {
                                return res.status(500).send({
                                    status: 'error',
                                    message: 'Error al guardar el comentario'
                                });
                            }
                            // Devolver respuesta
                            return res.status(200).send({
                                status: 'success',
                                // cc: comments,
                                topic
                            });
                        })

                        

                    } else {
                        return res.status(200).send({
                            message: 'No se an validado los datos del comentario!'
                        });
                    }
            }

            
        });

        
    },

    update: function(req, res) {
        // Conseguir id de comentario que llega de la url
        var commentId = req.params.commentId

        // Recoger datos y validar
        var params = req.body;
        // Validar datos
        try {
                        
            var validate_content = !validator.isEmpty(params.content);                        

        } catch (err) {
            return res.status(200).send({
                message: 'No as comentado nada'
            });
        }
        if (validate_content) {
            // Find and Update de subdocumento
            Topic.findOneAndUpdate(
                {'comments._id': commentId},
                {
                    '$set': {
                        'comments.$.content': params.content
                    }
                },
                { new: true},
                ((err, topicUpdate) => {
                    
                    if (err) {
                        return res.status(500).send({
                            status: 'error',
                            message: 'Error en la peticion'
                        });
                    }
                    if (!topicUpdate) {
                        return res.status(404).send({
                            status: 'notFound',
                            message: 'No existe el tema'
                        });
                    }

                    // Devolver los datos
                    return res.status(200).send({
                        status: 'success',
                        topic: topicUpdate
                    });
                })
            );

            
        }

        
    },

    delete: function(req, res) {
        return res.status(200).send({
            message: 'Metodo de borrado comentarios'
        });
    }
}

module.exports = controller;
