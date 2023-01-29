const mongoose=require("mongoose");
mongoose.set('strictQuery', true);
const db=mongoose.connect("mongodb://127.0.0.1:27017/Quizzes").then(()=>
{
    console.log("success");
}).catch(err=>console.log(err))

module.exports=db;