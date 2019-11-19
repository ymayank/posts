const express = require('express');

const feedController = require('../controllers/feed');
const validator = require('../util/validator');

const router = express.Router();

router.get('/posts', feedController.getPosts);

router.post('/posts', validator.validateCreateUser(), feedController.createPost);

router.get('/post/:postId', feedController.getPost)

router.put('/post/:postId', validator.validateUpdatePost(), feedController.updatePost)

router.delete('/post/:postId', feedController.deletePost)

module.exports = router;