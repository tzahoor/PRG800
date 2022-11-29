const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
   
    firstname:{
        type:String,
        required:true
    },
  
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    orgName:{
        type:String,
        
    },
    lastname:{
        type:String,
        required:true

    }
    
    
    


},{
    timestamps:true
})


const User=mongoose.model('user',UserSchema)

module.exports=User