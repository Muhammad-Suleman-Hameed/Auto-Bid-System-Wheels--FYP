const {Auction} = require('../model/auction');
const {auth} = require('../middleware/auth')
const {User} = require('../model/users');
const {PostAd} = require('../model/postad');
const express = require('express')
const mongoose = require('mongoose')

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const filter = {};

        if (req.query.status) {
            filter.statusOfAuction = req.query.status;
        }

        if (req.query.postAd) {
            if (mongoose.Types.ObjectId.isValid(req.query.postAd)) {
                filter.postAd = new mongoose.Types.ObjectId(req.query.postAd);
            } else {
                return res.status(400).send('Invalid postAd ID');
            }
        }

        const auctions = await Auction.find(filter)
            .sort('-highestBid')
            .select('postAd statusOfAuction bids highestBid createdAt updatedAt');

        if (auctions.length === 0) return res.status(404).send([]);

        res.send(auctions);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/', auth , async(req, res) => {

  try {
    const {postAd , startingPrice } =  req.body;

    if(!postAd || !mongoose.Types.ObjectId.isValid(postAd)){
        return res.status(400).send('Invalid or missing postAd ID')}

    const carListing = await PostAd.findById(postAd)
    if(!carListing) {
        res.status(404).send('Carlisting not found')
    }

    if(carListing.user.toString() !== req.user.id) {
        return  res.status(403).send('You are not authorized to auction this car')
    }

    const existingAuction = await Auction.findOne({postAd, statusOfAuction: 'ongoing'})
    if(existingAuction){
        return res.status(403).send('An active auction already exists for this car.')
    } 

        const auction = new Auction({
            postAd,
            highestBid: startingPrice && typeof startingPrice === 'number' ? startingPrice :  0
        })

        await auction.save()

        res.status(201).send(auction)
    
  } catch (error) {
        console.error(error.message)
        res.status(401).send('Internal System error')
  } 

})


router.post('/:auctionId' , auth , async(req, res) => {
   try {
    const{auctionId } = req.params;
    const{amount} = req.body;

    if(!mongoose.Types.ObjectId.isValid(auctionId))
    return res.status(400).send('Invalid auction ID');

    const auction = await Auction.findById(auctionId)
    if(!auction) return res.status(403).send('Auction not found')

    if(auction.statusOfAuction !== 'ongoing') return res.status(403).send('Auction has already ended')

    if(amount <= auction.highestBid) return res.status(403).send('Your bid must be higher than the current highest bid')

    const carListing = await PostAd.findById(auction.postAd)
    if(carListing.user.toString() === req.body.id) return res.status(403).send('You cannot bid on your own car')

        auction.bids.push({user: req.user.id , amount})
        auction.highestBid = amount

        await auction.save()
        res.status(201).send(auction)
   } catch (error) {
    console.error(error.message)
    res.status(401).send('Internal System error')
   }
})

module.exports = router;