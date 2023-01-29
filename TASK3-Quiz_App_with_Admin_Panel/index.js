const express=require("express");
const bodyParser=require("body-parser");
const cookieParser=require("cookie-parser");
const ejs=require("ejs");
const db=require("./db/connection");
const allQuizzes=require("./db/allQuizzes");
const app=express();
const fs=require("fs");
const Users=require("./db/users/Users");

const PORT = process.env.PORT || 80;

app.use(express.static(__dirname+"/public"));
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())
app.use(cookieParser());

app.get("/",function(req,res)
{
    res.render("index");
})

app.get("/about",async function(req,res)
{
    let quizData=await allQuizzes.find();
    let quizzesnames=[];
    
    quizData.map(quiz=>
    {
        quizzesnames.push(quiz.quizName)
    })  

    
    res.render("about",{quizId:'',quiz:'',quizzes:quizzesnames});

})

app.get("/quizzes",async function(req,res)
{
    let quizNameanddesc=[];
    let quizData=await allQuizzes.find();

    quizData.map(quiz=>
        {
            let quizValue={
            name:quiz.quizName,
            desc:quiz.quizDesc
            }
            quizNameanddesc.push(quizValue);
        })


    res.render("quizzes",{quizNameanddesc:quizNameanddesc,query:'',term:''});
})

app.get("/quizzes/admin",async function(req,res)
{

    if(req.cookies.user)
    {
        res.redirect("/quizzes/admin/dashboard");
    } else {
        
        res.render("signin",{errors:''});
    }
})

app.get("/quizzes/admin/logout",async function(req,res)
{
    if(req.cookies.user){
        
        res.clearCookie("user");

    }
    res.redirect("/quizzes/admin")
})

app.get("/quizzes/admin/dashboard",async function(req,res)
{   
    if(req.cookies.user)
    {
        let quizData=await allQuizzes.find();

        res.render("dashboard",{quizData:quizData,user:req.cookies.user});

    } else {

        res.redirect("/quizzes/admin");
    }

})


app.post("/quizzes/admin/signin",async function(req,res)
{

    let userData=await Users.find({email:req.body.email,password:req.body.password});

    if(userData.length!=0)
    {
        res.cookie("user",userData);
        res.redirect("/quizzes/admin/dashboard");
    }
    else
    {
        res.render("signin",{errors:"Invalid Credentials"});
    }

})

app.get("/quizzes/:quiz",async function(req,res)
{
    let quizData=await allQuizzes.find();
    let quizId;
    let quizzesnames=[];
    
    quizData.map(quiz=>
    {
        if(quiz.quizName===req.params.quiz)
        {
            quizId=quiz._id;
        }
        quizzesnames.push(quiz.quizName)
    })  

    
    res.render("quiz",{quizId:quizId,quiz:req.params.quiz,quizzes:quizzesnames});
})

app.post("/quiz/search",async function(req,res)
{
    let query='';
    let term=req.body.query;
    let querys=req.body.query.split(" ");
    if(querys.length>1){
    for(let q of querys)
    {
        query+=q.charAt(0).toUpperCase()+q.slice(1,);
        query+=' ';
    }}else{
        query=req.body.query.charAt(0).toUpperCase()+req.body.query.slice(1,);
    }
    query=query.trim();
    let quizNameanddesc=[];
    let quizData=await allQuizzes.find();

    quizData.map(quiz=>
        {
            let quizValue={
            name:quiz.quizName,
            desc:quiz.quizDesc
            }
            quizNameanddesc.push(quizValue);
        })

    query=quizNameanddesc.filter(quiz=>
        {
            return quiz.name.includes(query);
        })
    
        if(query.length===0)
        {
            query='404';
        }

    res.render("quizzes",{quizNameanddesc:quizNameanddesc,query:query,term:term});

})

app.get("/quizzes/quiz/data",async function(req,res)
{
    let quizData=await allQuizzes.find({})

    if(quizData.length)
    {
        res.json(quizData);
    }
    else
    {
    res.json({"Error":"No data found"})
    }
})

app.get("/quizzes/quiz/data/:quizId",async function(req,res)
{

    let quizData=await allQuizzes.find({_id:req.params.quizId})

    if(quizData.length)
    {
        res.json(quizData);
    }
    else
    {
        res.json({"Error":"No data found"})
    }
})

app.post("/quiz/data",function(req,res)
{
    let quiz=req.body;

    let quizmodel= new allQuizzes(quiz);

    quizmodel.save();

})

app.delete("/quiz/data/:id",async function(req,res)
{
    let quizData=await allQuizzes.findOneAndDelete({_id:req.params.id});

    if(quizData)
    {
        res.json("Success");
    }
    else
    {
        res.json("failed");
    }


})

app.patch("/quiz/data/:quiz",async function(req,res)
{
    let nquiz=req.params.quiz;
    let quizData=req.body;

    let quizUpdate=await allQuizzes.updateOne({quizName:nquiz},{$set:{quizName:nquiz,quizDesc:quizData.quizDesc,quizQNA:quizData.quizQNA,total:quizData.total}});
    
    if(quizData)
    {
        res.json({Msg:"Update"});
    }
    else
        res.json({Msg:"Not found"});

    
})


app.post("/data/quiz/posted",function(req,res)
{
    console.log(req.body);
    res.send("Done");
})



app.get("*",(req,res)=>
{
    res.status(404).send("Page Not Found");
})


app.listen(PORT,()=>
{
    console.log("Server started at",PORT);
})