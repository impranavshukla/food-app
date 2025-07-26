const mongoose=require("mongoose");

//schema
const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:[true,'user name is required']
    },
    email:{
        type:String,
        required:[true,'email is required'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'password is required']
    },
    address:{
        type:Array
    },
    phone:{
        type:String,
        required:[true,'phone number ie required']
    },
    usertype:{
        type:String,
        required:[true,'usertype is required'],
        default:'client',
        enum:['client','admin','vendor','driver']
    },
    profile:{
        type:String,
        default:'https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg'
    }
},{timestamps:true})

//export

module.exports=mongoose.model('user',userSchema);
