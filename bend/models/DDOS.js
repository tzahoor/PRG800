const mongoose = require('mongoose')
const DDOSQASchema= new mongoose.Schema({
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
const DDOS=mongoose.model('ddosQA',DDOSQASchema)
module.exports=DDOS