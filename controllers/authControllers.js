const userModel = require("../models/userModel");

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

       //create new user
       const user=await userModel.create({userName,email,password,address,phone});
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

        const user=await userModel.findOne({email:email,password:password})
        if(!user){
            return res.status(404).send({
                success:false,
                message:'User not found or password mismatch'
            })
        }
        res.status(200).send({
            success:true,
            message:'Login successful',
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
