var express = require('express');
var router = express.Router();
var Post = require('../models/Post');


/*
 * API ROUTES
 */
router.get('/hello', function(req, res) {
    res.send("Hello from api!");
});

router.post('/posts', function(req, res) {
    let post = req.body;
    Post.create(post, function (err, post) {
        if(err)
            res.send("error" + err);
        else {
            Post.find({}, function (err, posts) {
                if(err)
                    res.send("error");
                else {
                    res.json({
                        uploaded: post,
                        posts: posts
                    });
                }
            });
        }
    });
});

router.put('/posts/img/:id', function(req, res) {
    Post.findOne({_id: req.params.id}, function (err, post) {
        if(err)
            res.send("error");
        else {
            post.img = req.body.img;
            post.save();
            res.json({
                post: post
            });
        }
    });
});

router.get('/posts/:id', function(req, res) {
    Post.findOne({_id: req.params.id}, function (err, post) {
        if(err)
            res.send("error");
        else {
            res.json({
                post: post
            });
        }
    });
});

router.get('/posts', function(req, res) {
    Post.find({}, function (err, posts) {
        if(err)
            res.send("error");
        else {
            res.json({
                posts: posts
            });
        }
    });
});

router.get('/posts/search/:query', function(req, res) {
    var query = req.params.query;
    var regxp = "/"+ query+"/";
    Post.find({ text: regxp }, function (err, posts) {
        if(err)
            res.send("error");
        else {
            res.json({
                posts: posts
            });
        }
    });
});


module.exports = router;