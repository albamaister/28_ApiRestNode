'use strict'
var validator = require('validator');
var User = require('../models/user');
var bcrypt = require('bcrypt-nodejs');

var controller = {
    probando: function(req, res) {
        return res.status(200).send({
            message: 'Soy el metodo probando'
        });
    },

    testeando: function(req, res) {
        return res.status(200).send({
            message: 'Soy el metodo testeando'
        });
    },

    save: function(req, res) {
        // Recoger los parametros de la peticion
        var params = req.body;

        // Validar los datos
        var validate_name = !validator.isEmpty(params.name);
        var validate_surname = !validator.isEmpty(params.surname);
        var validate_email = !validator.isEmpty(params.email) && validator.isEmail(params.email);;
        var validate_password = !validator.isEmpty(params.password);

        // console.log(validate_name, validate_surname, validate_email, validate_password);
        if (validate_name && validate_surname && validate_email && validate_password) {
            // Crear objeto a usuario
            var user = new User();

            // Asignar valores a usuarios
            user.name = params.name;
            user.surname = params.surname;
            user.email = params.email.toLowerCase();
            user.role = 'USER_ROLE';
            user.image = null;

            // Comprobar si el usuario ya existe
            User.findOne({ email: user.email }, (err, issetUser) => {
                if (err) {
                    return res.status(500).send({
                        message: 'Error al comprobar duplicidad de usuario'
                    });
                }
                if (!issetUser) {
                    // Si no existe


                    // Cifrar contrasenia
                    bcrypt.hash(params.password, null, null, (err, hash) => {
                        user.password = hash;
                        // Guardar usuarios
                        user.save((err, userStored) => {
                            if (err) {
                                return res.status(500).send({
                                    message: 'Error al guardar el usuario'
                                });
                            }
                            if (!userStored) {
                                if (err) {
                                    return res.status(400).send({
                                        message: 'El usuario no se a guardado'
                                    });
                                }
                            }
                            // Devolver respuesta
                            return res.status(200).send({
                                status: 'success',
                                user: userStored
                            });
                        }); // close save
                    }); // close bcrypt

                } else {
                    return res.status(200).send({
                        message: 'El usuario ya esta registrado'
                    });
                }
            });


        } else {
            return res.status(200).send({
                message: 'Validacion de los datos del usuario incorrecta, intentelo de nuevo'
            });
        }


    },

    login: function(req, res) {
        // Recoger los parametros de la peticion 
        var params = req.body;

        // Validar los datos
        var validate_email = !validator.isEmpty(params.email) && validator.isEmail(params.email);
        var validate_password = !validator.isEmpty(params.password);

        if (!validate_email || !validate_password) {
            return res.status(200).send({
                message: 'Los datos son incorrectos, envialos bien'
            });
        }

        // Buscar los usuarios qie coincidan con el email
        User.findOne({ email: params.email.toLowerCase() }, (err, user) => {

            if (err) {
                return res.status(500).send({
                    message: 'Error al intentar identificarse'
                });
            }

            if (!user) {
                return res.status(404).send({
                    message: 'El usuario no existe'
                });
            }

            // si lo encuentra,
            // Comprobar la contrasenia (coincidencia de email y password / bcrypt)
            bcrypt.compare(params.password, user.password, (err, check) => {

                // Si es correcto
                if (check) {
                    // Generar token de jwt y devolver (mas tarde)

                    // Limpiar el objeto
                    user.password = undefined;

                    // Devolver los datos
                    return res.status(200).send({
                        status: 'success',
                        user
                    });
                } else {
                    return res.status(200).send({
                        message: 'Las credenciales no son correctas'
                    });
                }



            });
        });




    }

};

module.exports = controller;