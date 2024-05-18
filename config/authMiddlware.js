const jwt =require('jsonwebtoken')
const User = require('../model/user')
const authMiddleware = async(req,res,next)=>
{
    let token
    if(req?.headers?.authorization?.startsWith('Bearer')){
    token = req.headers.authorization.split(' ')[1]
    try{
        if(token){
            const decode = jwt.verify(token,process.env.JWT_SECRET)
            console.log(decode);
           const user = await User.findById(decode.id)
           req.user=user
           next()
        }
     
    }catch(error){
      res.json({message:'Token not valid or expired login to connect'})
    } 
    }
    else{
    res.json({message:'There is no token attached to header'})
    }
} 

module.exports = {authMiddleware }