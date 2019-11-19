const { validationResult } = require('express-validator');

const Post = require('../models/post');
const { throwErr, deleteImage } = require('../util/utility');

exports.getPosts = (req, res, next) => {
    const currentPage = req.query.page || 1;
    const perPage = 2;
    let totalItems;
    Post.find().countDocuments()
    .then(count => {
        totalItems = count;
        return Post.find()
            .skip((currentPage - 1)* perPage)
            .limit(perPage);
    })
    .then(posts => {
        res.status(200).json({
            message: 'Fetched posts successfully.',
            posts: posts,
            totalItems: totalItems
        });
    })
    .catch(err => {
        throwErr(err, next);
    });
};

exports.createPost = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect');
        error.statusCode = 422;
        throw error;
// integrated with a better way via a middleware in the app.js 
        // return res.status(422).json({
        //     message: 'Validation failed, entered data is incorrect',
        //     errors: errors.array()
        // })
    };
    if(!req.file) {
        const error = new Error('No image provided');
        error.statusCode = 422;
        throw error;
    }

    const imageUrl = req.file.path;
    const title = req.body.title;
    const content = req.body.content;
    const post = new Post({
            title: title,
            content: content,
            imageUrl: imageUrl,
            creator: { name: 'mayank'}
    });
    
    post.save()
    .then(result => {
        res.status(201).json({
            message: 'Post created successfully!',
            post: result
        });
    })
    .catch(err => {
        throwErr(err, next);
    });
};

exports.getPost = (req, res, next) => {
    const postId = req.params.postId;
    Post.findById(postId)
    .then(post => {
        if(!post) {
            const error = new Error('Could not find post.');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            message: 'Post fetched.',
            post: post
        });
    })
    .catch(err => {
        throwErr(err, next);
    });
}

exports.updatePost = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect');
        error.statusCode = 422;
        throw error;
    };
    
    const postId = req.params.postId;
    const title = req.body.title;
    const content = req.body.content;
    let imageUrl = req.body.image;
    if(req.file) {
        imageUrl = req.file.path;
    }
    if(!imageUrl) {
        const error = new Error('No file picked');
        error.statusCode = 422;
        throw error;
    }
    
    Post.findById(postId)
    .then(post => {
        if(!post) {
            const error = new Error('Could not find post.');
            error.statusCode = 404;
            throw error;
        }
        if(imageUrl !== post.imageUrl) {
            deleteImage(post.imageUrl);
        }
        post.title = title;
        post.imageUrl = imageUrl;
        post.content = content;
        return post.save();
    })
    .then(result => {
        res.status(200).json({
            message: 'Post updated!',
            post: result
        });
    })
    .catch(err => {
        throwErr(err, next);
    });
}

exports.deletePost = (req, res, next) => {
    const postId = req.params.postId;
    Post.findById(postId)
    .then(post => {
        if(!post) {
            const error = new Error('Could not find post.');
            error.statusCode = 404;
            throw error;
        }
        deleteImage(post.imageUrl);
        return Post.findByIdAndRemove(postId);
    })
    .then(result => {
        res.status(200).json({
            message: 'post deleted'
        })
    })
    .catch(err => {
        throwErr(err, next);
    });
}