const mongoose=require('mongoose');

let userSchema=new mongoose.Schema({
    email:String,
    name:String,
    password:String,
    
})

let Users=new mongoose.model("allUsers",userSchema);

module.exports=Users;