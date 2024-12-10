const {User , generateAuthToken} = require('../model/users')
const express = require('express');
const mongoose = require('mongoose');
const _ = require('lodash')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const config = require('config')
const {auth} = require('../middleware/auth')
 
const router = express.Router();

router.get(('/:me') , auth ,  async (req, res) => {
    const user = await User.findById(req.user.id).select('-password')
    if(!user) res.status(400).send('User not found')
    
    res.send(user)
})

router.post(('/') ,  async (req, res) => {
    const duplicateEmail = await User.findOne({email:req.body.email})
    if (duplicateEmail) return res.status(400).send('User already exists with same Email')
    
    const user = new User(_.pick(req.body , ['firstName' , 'lastName' , 'phone' , 'email' , 'password']))

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password , salt)

    await user.save()

    const token = user.generateAuthToken();
    res.header('x-auth-token' , token).send(_.pick(user , ['firstName' , 'lastName' , 'phone' , 'email' ]))
})


module.exports = router