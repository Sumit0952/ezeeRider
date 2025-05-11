const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const cookiesParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes');
const captainRoutes = require('./routes/captain.routes');
const connectToDb = require('./db/db.js');

connectToDb();
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookiesParser());


app.get('/',(req,res)=>{
    res.send({status:"ok"})
})

app.use('/Users',userRoutes);
app.use('/Captains',captainRoutes);
module.exports = app;