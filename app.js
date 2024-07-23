const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const UserModel =require('./Models/Employee');

const app=express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://yash:yashgaur@cluster0.ee9cntv.mongodb.net/Users?retryWrites=true&w=majority').then(()=>{
    console.log('mongo connected')
}).catch(err=>console.log(err)); 


app.post('/login',(req,res)=>{
    const {email,password}=req.body;
    UserModel.findOne({email:email})
    .then(user=>{
        if(user)
        {
            if(user.password===password)
            {
                res.json("success");
            }
            // else if(password.length===0)
            // {
            //     res.json("pass is blank");
            // }
            // else if(user.email!=email && password.length===0)
            // {
            //     res.json("pass is blannk");
            // }
            else
            {
                res.json("Password is Incorrect");
            }
        }
        else
        {
            res.json("user does not exists");
        }
    })
})

app.post('/register', (req,res)=>{
    const {email,password}=req.body;
    UserModel.findOne({email:email})
    .then(user=>{
        if(user)
        {
           res.json("user already exists");
        }
        else if(password.length < 4)
        {
            res.json("pass is short");
        }
        else
        {
            UserModel.create(req.body)
            .then(employees=>res.json(employees))
            .catch(err=>res.json(err))
        }
    })
    
})

app.listen(3001);