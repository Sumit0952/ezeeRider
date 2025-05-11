const userModel = require('../models/user.model');
const userService = require('../services/user.service');

const { validationResult } = require('express-validator');

module.exports.registerUser = async (req, res) => {
    const errors  = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    const hashedPassword = await userModel.hashPassword(password);
    try {
        const user = await userService.createUser({ name, email, password: hashedPassword });
        const token = user.generateAuthToken();

        return res.status(201).json({token, user});
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}