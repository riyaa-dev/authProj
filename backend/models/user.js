const mongoose=require('mongoose');
const userschema=new mongoose.Schema({
    username :{
        type : String,
        required : true,
        minlenght:3,
    },

    email :{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type : String,
        required : true,
        unique:true,
        minlenght:6,

    },
},{Timestamp:true}
);
module.exports=mongoose.model("user",userschema);