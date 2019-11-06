'user strict'

var controller = {
    add: function(req, res) {
        return res.status(200).send({
            message: 'Metodo de anadir comentarios'
        });
    },

    update: function(req, res) {
        return res.status(200).send({
            message: 'Metodo de edicion comentarios'
        });
    },

    delete: function(req, res) {
        return res.status(200).send({
            message: 'Metodo de borrado comentarios'
        });
    }
}

module.exports = controller;
