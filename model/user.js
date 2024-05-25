const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const UserSchema =new mongoose.Schema({
pseudo:{
    type:String,
 
},

email:{
    type:String,
    required:true,
   
  
},

password:{
    type:String,
    required:true,
},

dateNaissance:Date,
address:String,
sex:String,
isBlocked:{
    type:Boolean,
    default:false
},
picture:[{}],
token:String,
passwordChangedAt:Date,
signedByGoogle:{
    type:Boolean,
    default:false
},
images:[{
    public_id:String,
    url:String
}],
activate:String,
passwordResetToken:String,
passwordResetExpires:Date,
passwordClaire : String,
description:String,
code: Number,
dateNaissance :Date
},{
    timestamps:true
})
UserSchema.pre('save',async function(next){
    if(!this.isModified("password")){next()}
const salt = bcrypt.genSaltSync(10)
this.password = await bcrypt.hash(this.password,salt)
})
UserSchema.methods.IsPasswordMatched = async function(entryPassword){
    return await bcrypt.compare(entryPassword,this.password)
}
UserSchema.methods.createPasswordResetToken= async function(){
const resetToken = crypto.randomBytes(32).toString("hex")
this.passwordResetToken=resetToken

this.passwordResetExpires=Date.now() + 30 * 60 * 1000 // 10 minutes
return resetToken
}
module.exports = mongoose.model('User', UserSchema)