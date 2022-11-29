const express = require('express');
const bodyParser=require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose');
const UserRouter = require('./Routes/userRoute');
const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
mongoose.connect("mongodb+srv://tzahoor:Admin123@cluster0.xc1ewxa.mongodb.net/Quiz?retryWrites=true&w=majority",{
    useNewUrlParser: true, useUnifiedTopology: true
  
}).then(console.log("Connected to mongoose"))
.catch((err)=>console.log(err));
app.use('/api/user',UserRouter)
app.listen('5000',()=>{
    console.log("Backend is running");
})