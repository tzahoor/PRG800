const fs = require('fs');
const mongoose = require('mongoose');
const Question = require('../models/Question');


mongoose.connect("mongodb+srv://user1:user1@cluster0.khkmc.mongodb.net/Quiz?retryWrites=true&w=majority",{
    useNewUrlParser:true,
  
}).then(console.log("Connected to mongoose"))
.catch((err)=>console.log(err));

const questions= JSON.parse(fs.readFileSync('../Question-Data/Question.js'));
const importData = async()=>{
    try{
        await Question.create(questions)
        console.log('Data successfully loaded!');
    }catch(err){
        console.log(err)
    }
    process.exit();
}
const deleteData = async () => {
    try {
    await Question.deleteMany()
      console.log('Data successfully deleted!');
    } catch (err) {
      console.log(err);
    }
    process.exit();
  };

if (process.argv[2] === '--import') {
    importData();
  }else if (process.argv[2] === '--delete') {
    deleteData();
  }