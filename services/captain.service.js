const captainModel = require('../models/captain.model');

module.exports.registerCaptain = async ({
    name, email, password, vehicle
}) => {
    const { color, plate, capacity, vehicleType } = vehicle || {};
    // if (!name || !email || !password || !color || !plate || !capacity || !vehicleType) {
    //     throw new Error('All fields are required');
    // }
    const captain = await captainModel.create({
        name,
        email,
        password,
        vehicle: {
            color,
            plate,
            capacity,
            vehicleType
        }
    });
    return captain;
};

// Sample request body for registering a captain
const sampleRequestBody = {
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "securepassword",
  "vehicle": {
    "color": "Red",
    "plate": "ABC1234",
    "capacity": 4,
    "vehicleType": "car"
  }
};