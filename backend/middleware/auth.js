import jwt from "jsonwebtoken"


const authmiddleware=async(req,res,next)=>{

    const {token}=req.headers;
    if(!token){
        return res.json({success:false,message:"Not Authorized User,Please Log in "})
    }
    try {
        const tokendecode=jwt.verify(token,process.env.jwt_secreat);
        req.body.userId=tokendecode.id;
        next();
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"error"})
    }
}


export default authmiddleware;