const mongoose = require('mongoose')
 

function connectToDb(){
    mongoose.connect("mongodb+srv://sk3063636:apnasapnamoneymoney@cluster0.dxlsz.mongodb.net/EzeeRider?retryWrites=true&w=majority")
    .then(() => {
        console.log('Connected to MongoDB');
    }).catch(err => {
        console.error('Error connecting to MongoDB:', err);
    })
}

module.exports = connectToDb;