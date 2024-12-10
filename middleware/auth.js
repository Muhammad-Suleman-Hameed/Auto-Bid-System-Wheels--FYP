const jwt = require('jsonwebtoken')
const config = require('config')

exports.auth = function(req, res ,next){
    const token = req.header('x-auth-token')
    if(!token) return res.status(403).send('Invalid Token or No Token')

    try{
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'))
        console.log('Decoded Token:', decoded); 
        req.user = decoded
        next()
    }
    catch(ex){
        console.log('Error decoding token:', ex.message);
        res.status(400).send('Invalid token.')
    }
}