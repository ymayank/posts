const express = require('express');

const feedController = require('../controllers/feed');
const validator = require('../util/validator');
const isAuth = require('../middleware/isAuth');

const router = express.Router();

router.get('/posts', isAuth, feedController.getPosts);

router.post('/posts', isAuth, validator.validateCreateUser(), feedController.createPost);

router.get('/post/:postId', isAuth, feedController.getPost)

router.put('/post/:postId', isAuth, validator.validateUpdatePost(), feedController.updatePost)

router.delete('/post/:postId', isAuth, feedController.deletePost)

module.exports = router;