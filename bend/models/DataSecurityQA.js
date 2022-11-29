const mongoose = require('mongoose')
const DataSecurityQASchema= new mongoose.Schema({
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
const DataSecurity=mongoose.model('datasecurityQA',DataSecurityQASchema)
module.exports=DataSecurity