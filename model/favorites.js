const mongoose = require('mongoose');
const User = require('./users');
const PostAd = require('./postad');

const favoriteSchema =  new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    favouriteAds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PostAd',
        required: true
    }]
})

const FavouriteAds = mongoose.model('FavouriteAds' , favoriteSchema);

exports.FavouriteAds = FavouriteAds;