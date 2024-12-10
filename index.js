const users = require('./routes/users')
const auction = require('./routes/auction')
const postAd = require('./routes/postad')
const auth = require('./routes/auth')
const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());
app.use('/users' , users)
app.use('/auth' , auth)
app.use('/postAd' , postAd)
app.use('/auction' , auction)

app.listen(5555)
    console.log('Server Running On Port 5555...')

mongoose.connect('mongodb://localhost/AutoBidWheels')
    .then(() => { console.log('DataBase Server Connected Successfully...')})
    .catch(() => { console.log('DataBase Server Connection Unsuccessful...')})



