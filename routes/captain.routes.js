const express = require('express');
const router = express.Router();
const captainController = require('../controllers/captain.controller');
const {body} = require('express-validator');



router.post('/register',[
    body('email').isEmail().withMessage('Email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('vehicle.color').notEmpty().withMessage('Vehicle color is required'),
    body('vehicle.plate').notEmpty().withMessage('Vehicle plate is required'),
    body('vehicle.capacity').notEmpty().withMessage('Vehicle capacity is required'),
    body('name').notEmpty().withMessage('Name is required'),
    body('vehicle.vehicleType').notEmpty().withMessage('Vehicle type is required'),
    
],
captainController.registerCaptain);

module.exports = router;