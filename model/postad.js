const mongoose = require('mongoose');
const {User} = require('./users')

const postAd = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    mileage: { type: Number, required: true },
    fuelType: { type: String, required: true },
    transmission: { type: String, required: true },
    price: { type: Number, required: true , default: 0},
    location: { type: String, required: true },
    condition: { type: String, required: true }, 
    contactName: { type: String, required: true }, 
    contactName: { type: String, required: true }, 
    contactEmail: { type: String, required: true }, 
    contactPhone: { type: String, required: true },
    images: [{ type: String, required: true }],
    statusofAd: {type: String , enum: ['active' , 'pending' , 'sold' ] , default: 'pending'},
    postedAt: { type: Date, default: Date.now }
})

const PostAd = mongoose.model('PostAd' , postAd);

exports.PostAd = PostAd;