const express=require("express");
const jwt=require("jsonwebtoken");
const app=express();

const secretKey=""




app.get('/',(req,res)=>{
    res.json({
        message:"a simple jwt api"
    })

});

app.post('/login',(req,res)=>{
    const user={
        id:1,
        username:"Ayush",
        email:"ayush@gmail.com"
    }
    jwt.sign({user},secretKey,{expiresIn:'300s'},(err,token)=>{
        res.json({
            token
        })

    })
})

app.post('/profile',verifyToken,(req,res)=>{
    jwt.verify(req.token,secretKey,(err,authData)=>{
        if(err){
            res.send({result:"Invalid Tkosdn"})
        }
        else{
            res.json({
                message:"Profile accessed",
                authData
            })

        }
    })
})

function verifyToken(req,res,next){
    const bearerHeader=req.headers['authorization'];
    if (typeof(bearerHeader)!='undefined'){
        const bearer=bearerHeader.split(" ");
        const token=bearer[1];
        req.token=token;
        next();

    }else{
        res.send({
            result:'Token is not Valid'
        })
    }


}

app.listen(3000,()=>{console.log('server connected ')})