const jwt = require('jsonwebtoken');


const HttpError = require('../models/http-error');


module.exports = (req, res, next) => { 
    if (req.method === 'OPTIONS') {
        return next();
    }
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            throw new Error('Authentication failed!');
        }
        const decodedToken = jwt.verify(token, "supersecret_dont_share"); //verify that the token is valid
        req.userData = { userId: decodedToken.userId }; //add the userId to the request object so every request thereafter will be able to use the userData object and get the user id.
        next();
    } catch (err) {
        const error = new HttpError('Authentication failed', 403);
        return next(error);
    }
    
};