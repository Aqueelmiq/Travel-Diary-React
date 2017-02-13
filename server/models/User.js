var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    uid: String,
    following: Array,
    followers: Array,
    img: String,
    location: String,
    likes: { type: Number, default: 0 }
});

module.exports = mongoose.model('post', userSchema);