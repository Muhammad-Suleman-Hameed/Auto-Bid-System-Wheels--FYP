const mongoose = require('mongoose');

const auctionSchema = new mongoose.Schema({
    postAd: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PostAd',
        required: true
    },
    bids: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        amount: {type: Number, min: 0, required: true}}],
    highestBid: {type: Number , min: 0, default: 0},
    statusOfAuction: { type: String , enum: ['ongoing' , 'ended'] , default: 'ongoing'},
}, {
    timestamps: true 
})

const Auction = mongoose.model('Auction' , auctionSchema)

module.exports.Auction = Auction;