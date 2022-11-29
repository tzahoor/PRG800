const mongoose = require('mongoose')
const ScoreSchema = new mongoose.Schema({
    user_Id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    score:{
        type:String
    },
},{
  timestamps:true
})
const Score=mongoose.model('score',ScoreSchema)

module.exports=Score