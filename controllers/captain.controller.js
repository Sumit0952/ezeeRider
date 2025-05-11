const captainModel = require('../models/captain.model');
const userModel = require('../models/user.model');
const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');

module.exports.registerCaptain = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const { name, email, password, vehicle } = req.body;
    const { color, plate, capacity, vehicleType } = vehicle || {};

    const isCaptainAlreadyExist  = await captainModel.findOne({email});
    if(isCaptainAlreadyExist){
        return res.status(400).json({error: 'Captain already exists'});
    }
    const hashedPassword = await userModel.hashPassword(password);

    const captain = await captainService.registerCaptain({
        name,
        email,
        password: hashedPassword,
        vehicle: {
            color,
            plate,
            capacity,
            vehicleType
        }
    });
    const token = captain.generateAuthToken();
    res.status(201).json({token, captain});
}
