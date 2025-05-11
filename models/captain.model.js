const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const captainSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        // match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    socket_Id: {
        type: String,
        
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    vehicle:{
        color: {
            type: String,
            // required: true
        },
        plate: {
            type: String,
            // required: true
        },
        capacity:{
            type: Number,
            // required: true
        },
        vehicleType: {
            type: String,
            enum: ['car', 'bike', 'auto'],
            // required: true
        }
    },
    location :{
        lat:{
            type: Number,
            
        },
        long:{
            type: Number,
            
        }
 
    },

}, { timestamps: true });           



captainSchema.methods.generateAuthToken = function (){
    const token = jwt.sign(
        { _id: this._id },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
    return token;
}

captainSchema.methods.comparePassword = async function (password){
    return await bcrypt.compare(password, this.password);
}   

captainSchema.statics.hashPassword = async function (password){
    return await bcrypt.hash(password, 10);
}   

const captainModel = mongoose.model('Captain', captainSchema);
module.exports = captainModel;