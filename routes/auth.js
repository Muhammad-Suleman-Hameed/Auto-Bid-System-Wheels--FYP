const {User , generateAuthToken} = require('../model/users')
const express = require('express');
const mongoose = require('mongoose');
const _ = require('lodash')
const bcrypt = require('bcryptjs')
const {auth} = require('../middleware/auth')
 
const router = express.Router();

router.post(('/') ,  async(req, res) => {
    const user = await User.findOne({email:req.body.email})
    if (!user) return res.status(400).send('Invalid email or password')
 
    const validatePassword = await bcrypt.compare(req.body.password , user.password )
    if (!validatePassword) return res.status(400).send('Invalid email or password')

    const token = user.generateAuthToken();
    res.send({token})
})

module.exports = router;