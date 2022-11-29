const mongoose = require('mongoose')
const BasicQASchema= new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    Answers:{
        type:Array
    },
    createdAt:{
        type:Date,
       default: Date.now()
    }
})
const BasicQA=mongoose.model('basicQA',BasicQASchema)
module.exports=BasicQA