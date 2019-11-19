const { body } = require('express-validator');

exports.validateCreateUser = () => {
    return [
        body('title').trim().isLength({min: 5}),
        body('content').trim().isLength({min: 5})
    ]
}

exports.validateUpdatePost = () => {
    return [
        body('title').trim().isLength({min: 5}),
        body('content').trim().isLength({min: 5})
    ]
}