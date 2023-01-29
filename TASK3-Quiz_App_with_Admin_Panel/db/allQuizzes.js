const mongoose=require('mongoose');
const quizSchema=require('./quizSchema');

const allQuizzes=mongoose.model("allQuizzes",quizSchema);

module.exports=allQuizzes;