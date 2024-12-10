const mongoose = require('mongoose');
const {auth} = require('../middleware/auth');
const express = require('express');
const { User } = require('../model/users');
const {PostAd} = require('../model/postad')
const {FavouriteAds} = require('../model/favorites')

const router = express.Router()

router.post('/:id/:postadid', async(req, res) => {

})


//Deletes all posts which is a bad choice
router.delete('/:id/:postadid', async(req, res) => {
    const post = await FavouriteAds.findByIdAndDelete(req.params.postadid)
    if (!post) return res.status(401).send('Bad Request')

        res.send(post)
})

//Remove a single post based on its ID using Patch
router.patch('/:id/:postid' , auth , async(req, res) => {
    
        const updatedFavorites  = await FavouriteAds.findOneAndUpdate(
            {user: req.params.id},
            {$pull: {favoritePost: req.params.postid}},
            {new: true})
        
            if (!updatedFavorites ) return res.status(404).send('Ad not found in favorites')

    res.send(updatedFavorites );
        
}  )


router.post('/:id/:postid' , auth , async(req, res) => {
    
    const favoritePosts = await FavouriteAds.findOne({user: req.params.id})
    
    if(!favoritePosts) new FavouriteAds(
        {user: req.params.id},
        {favoritePost : [postid]})

    if(favoritePosts.favoritePost.postid) return res.status(404).send('Post already exists')

    if(favoritePosts.favoritePost.postid)  favoritePosts.favoritePost.push(postid)

    
    await favoritePost.save();
})