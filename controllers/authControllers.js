const userModel = require("../models/userModel");
const bcrypt=require('bcryptjs');
const JWT=require('jsonwebtoken');

//REGISTER


const registerController=async (req,res)=>{
    try {
       const {userName,email,password,phone,address}=req.body

       //validation
       if(!userName || !email || !password || !address || !phone){
        return res.status(500).send({
            success: false,
            message:'Please Provide all fields'
        })
       }
        
       //check user 
       const existing=await userModel.findOne({email})
       if(existing){
        return res.status(500).send({
            success: false,
            message:'Email already registerd , please login'
        })
       }

       // hashing password 
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword=await bcrypt.hash(password,salt);

       //create new user
       const user=await userModel.create({userName,email,password: hashedPassword,address,phone});
       res.status(201).send({
        success:true,
        message:'Successfully registered',
        user
       })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in Register API',
            error
        })
    }
};



//LOGIN 


const loginController=async (req,res)=>{
    try {
        const {email,password}=req.body

        //Validation
        if(!email || !password){
            return res.status(500).send({
                success:false,
                message:'Please provide email and password'
            })
        }

        //check user 

        const user=await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:'User not found '
            })
        }

        //check user password | compare password 
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(500).send({
                success:false,
                message:"Invalid credentials"
            });
        }
        //token 
        const token=JWT.sign({id:user._id},process.env.JWT_SECRET,{
            expiresIn:"7d"
        });
        user.password=undefined;
        res.status(200).send({
            success:true,
            message:'Login successful',
            token,
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in Login API',
            error
        })
    }
}

module.exports={registerController,loginController};
