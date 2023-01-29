const mongoose = require("mongoose");

const quizQuesSchema=new mongoose.Schema({

        ques:String,
        options:[
                {
                    type:String
                }
            ],
        ans:String
})

//sub schema
const quizSchema=new mongoose.Schema({
        quizName:String,
        quizDesc:String,
        quizQNA:[quizQuesSchema],
        total:Number
})


module.exports=quizSchema; 
