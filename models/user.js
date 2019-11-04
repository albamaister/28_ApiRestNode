'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: String,
    surname: String,
    email: String,
    password: String,
    image: String,
    role: String
});

UserSchema.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj.password;

    return obj;
}

module.exports = mongoose.model('User', UserSchema);
// Lowercae y pluralizar el nombre
// users -> documents (schema)