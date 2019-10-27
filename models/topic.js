'user strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Modelo de Comment
var CommentSchema = new Schema({
    comment: String,
    date: { type: Date, default: Date.now },
    user: { type: Schema.ObjectId, ref: 'User' },
});

var Comment = mongoose.model('Comment', CommentSchema);

// Modelo de topic
var topicSchema = new Schema({
    title: String,
    content: String,
    code: String,
    lang: String,
    date: { type: Date, default: Date.now },
    user: { type: Schema.ObjectId, ref: 'User' },
    comments: [CommentSchema]
});

module.exports = mongoose.model('Topic', topicSchema);