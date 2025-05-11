const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const userRoutes = require('./routes/user.routes');
const connectToDb = require('./db/db.js');

connectToDb();
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.get('/',(req,res)=>{
    res.send({status:"ok"})
})

app.use('/Users',userRoutes);

module.exports = app;