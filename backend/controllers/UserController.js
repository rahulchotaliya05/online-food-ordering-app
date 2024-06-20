import userModel from "../model/UserModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'

//log in user
const loginUser=async (req,res)=>{
const {email,password}=req.body;
try {
    const user=await userModel.findOne({email});
    if(!user){
        return res.json({success:false,message:"User does not exists"})
    }

    //comparing the password
    const isMatch=await bcrypt.compare(password,user.password);

    if(!isMatch){
        return res.json({success:false,message:"Invalid username or password"})
    }

    const token=createToken(user._id);
    res.json({success:true,token})

} catch (error) {
    console.log(error)
    return res.json({success:false,message:"Error"})
}
}


//create jwt token
const createToken=(id)=>{
return jwt.sign({id},process.env.jwt_secreat)
}


//register user

const registerUser=async (req,res)=>{
    const {name,password,email}=req.body;
    try {
                //checking user already exist or not
        const existsuser=await userModel.findOne({email});
    
        if(existsuser){
            return res.json({success:false,message:"User already exists"})
        }
        
        //validating email format and strong password
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter valid email "})
        }
    
        if(password.length<8){
            return res.json({success:false,message:"Please enter strong password"})
        }
    
        //hasing user password
        const solt=await bcrypt.genSalt(10);
        const hashpassword=await bcrypt.hash(password,solt);
    
        const newUser=new userModel({
            name:name,
            email:email,
            password:hashpassword 
    
        })
    
       const user= await newUser.save();
        const token=createToken(user._id);
        res.json({success:true,token})
    
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"error"})
    }
}

export {loginUser,registerUser}