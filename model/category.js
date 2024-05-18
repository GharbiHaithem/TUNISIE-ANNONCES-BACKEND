const mongoose = require('mongoose')
const Category = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    parentID: {
        type: mongoose.Schema.Types.ObjectId,
      
      },
      children: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
      }],
}) 
module.exports = mongoose.model('Category' , Category)