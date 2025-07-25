const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const BlacklistToken = require('../models/blacklistToken.model');

module.exports.authUser = async( req, res, next) => {
    const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];
    if(!token){
        return res.status(401).json({error: 'Unauthorized'});
    }

    const isBlackListed = await BlacklistToken.findOne({ token });
    if(isBlackListed){
        return res.status(401).json({error: 'Unauthorized'});
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        
        req.user = user;
        return next();    
    }
    catch (error) {
        return res.status(401).json({error: 'Unauthorized'});
    }
}