const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../config/config');
const { throwErr } = require('../util/utility');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if(!authHeader) {
        error = new Error('Not authenticated');
        error.statusCode = 401;
        throw error;
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, JWT_SECRET);
    } 
    catch(err) {
        throwErr(err, next)
    }
    if(!decodedToken) {
        error = new Error('Not authenticated');
        error.statusCode = 401;
        throw error;
    }
    req.userId = decodedToken.userId;
    next();
}