const mongoose = require('mongoose')
const Annonce = new mongoose.Schema({
    rubrique:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        require:true
    },
    title:{
       type: String,
       require:true
    },
    description:{
        type: String,
        require:true  
    },
    telephone:{
        type: String,
        require:true
    },
    annee_fabrication:Number,
    image_annonce:[{}],
    rubriques_fav:[String],
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:true
    },
    proposition:String,
    prix:Number
},{
    timestamps:true
}) 
module.exports = mongoose.model('Annonce' , Annonce)