const userModel = require('../models/user.model');
const userService = require('../services/user.service');

const { validationResult } = require('express-validator');
const BlacklistToken = require('../models/blacklistToken.model');

module.exports.registerUser = async (req, res) => {
    const errors  = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    const isUserAlreadyExist = await userModel.findOne({ email });
    if (isUserAlreadyExist) {
        return res.status(400).json({ error: 'User already exists' });
    }
    const hashedPassword = await userModel.hashPassword(password);
    try {
        const user = await userService.createUser({ name, email, password: hashedPassword });
        const token = user.generateAuthToken();

        return res.status(201).json({token, user});
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports.loginUser = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({eroors: errors.array()});
    }

    const{email, password} = req.body;
    const user = await userModel.findOne({email}).select('+password');// check if user exists and password is selected because we are using select: false in user model
    if(!user){
        return res.status(401).json({error: 'Invalid email or password'});

    }

    const isMatch = await user.comparePassword(password);
    if(!isMatch){
        return res.status(401).json({error: 'Invalid email or password'});
    }

    const token = user.generateAuthToken();
    res.cookie('token', token);
    return res.status(200).json({token, user});

    
};

module.exports.getUserProfile = async (req, res) => {
    res.status(200).json({user: req.user});
} ;

module.exports.logoutUser = async (req, res) => {
    res.clearCookie('token');
    const token  = req.cookies.token || req.headers.authorization?.split(' ')[1];
    await BlacklistToken.create({ token });
    return res.status(200).json({message: 'Logged out successfully'});
};
    
