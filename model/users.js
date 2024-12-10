const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const config = require('config')

const userSchema =  new mongoose.Schema({
    firstName: {type: String , required: true},
    lastName: {type: String , required: true},
    phone: {type: String , required: true},
    email: {type: String , required: true},
    password: {type: String , required: true
}
})

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({id: this._id} , config.get('jwtPrivateKey'))
    return token
 }
 
const User = mongoose.model('User' , userSchema);


exports.userSchema = userSchema;
exports.User = User;