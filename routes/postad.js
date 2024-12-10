const mongoose = require('mongoose');
const {auth} = require('../middleware/auth');
const upload = require('../middleware/public')
const express = require('express');
const { User } = require('../model/users');
const {PostAd} = require('../model/postad')
const _ = require('lodash')

const router = express.Router()


router.get('/' , async (req, res) => {
    const ads = await PostAd.find().sort('-price')
    if(!ads) return res.status(401).send('Not ads found')

        return res.status(201).send(ads)
})


router.get('/:id', async (req, res) => {
    
        const ad = await PostAd.findById(req.params.id)
            /*.populate('user', 'name email'); */
        if (!ad) {
            return res.status(404).json({ error: 'Ad not found' });
        }

        res.status(200).send(ad)
       
});

router.post('/' , auth , upload.array('image' ,5) , async(req, res) => {
    try {
 
        if (!req.files || req.files.length === 0) {
            return res.status(400).send('No images were uploaded.');
        }
        const imagesPath = req.files.map(file => file.path)

    const adPost = new PostAd({
        ...req.body,
        images: imagesPath,
        postedAt: new Date(),
        user: req.user.id
    })

    await adPost.save()   
    res.status(201).send(adPost)
}
    catch(error){
        console.log('Error while posting ad: ' , error.message);
        res.status(500).send('Something went wrong,try again')
    }
})

router.delete('/:id' , async (req, res) => {
    const ads = await PostAd.findByIdAndDelete(req.params.id)
    if(!ads) return res.status(401).send('No ad found')

        return res.status(201).send('Ad deleted successfully')
})

router.put('/:id' , async (req, res) => {
    const ads = await PostAd.findByIdAndUpdate(
        req.params.id , 
        {...req.body}, 
        {new: true})
    if(!ads) return res.status(401).send('No ad found')

        return res.status(201).send('Ad updated successfully')
})






// router.post('/' , auth , upload.array('image' , 5) , async (req, res) => {
//     const imagePath = req.files.map(file => file.path);
    
//     const requireFields = [ 'title' , 'description' , 
//     'brand' , 'model', 'year' , 'mileage' , 'fuelType' , 'transmission',
//     'price' , 'location' ,'condition' , 'statusofAd' , 'contactName',
//     'contactEmail', 'contactPhone']

//     for(let field of requireFields){
//         if(!req.body[field]){
//             return res.status(400).send(`${field} is required`)
//         }
//     }
//     const postAd = _.pick(req.body, requireFields)
//     postAd.user = req.user.id 
//     postAd.images = imagePath
//     postAd.postedAt = new Date();

//     const ad = new PostAd(postAd)
//     await ad.save()

//     res.send(ad)

// })

module.exports = router;