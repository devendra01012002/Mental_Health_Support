const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    Name:{
        type:String,
        required:true,
    },
    Age:{
        type:String,
        required:true,
    },
    Email:{
        type:String,
        required:true,
    },
    Password:{
        type:String,
        required:true
    }
})

const User=mongoose.model("User",userSchema);
module.exports=User;