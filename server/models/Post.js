var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
    title: String,
    text: String,
    author: String,
    img: String,
    location: String,
    likes: { type: Number, default: 0 }
});

module.exports = mongoose.model('post', postSchema);