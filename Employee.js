const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({
    fname:String,
    lname:String,
    email:String,
    password:String
});

const UserModel=mongoose.model('employees',UserSchema);
module.exports=UserModel;