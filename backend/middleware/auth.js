import jwt from "jsonwebtoken";
import User from "../model/userModel.js";

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_here';

async function authMidlleare(req, res, next) {
    //GRAB THE BEARER TOKEN FROM AUTHORIZATION HEADER
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({success: false, message: "Not Authorized, token missing"});
    }
    
    const token = authHeader.split(' ')[1];
         
    //Verfy & ATTACH USER OBJECT
    try{
          const payload=jwt.verify(token, JWT_SECRET);
          const user = await User.findById(payload.id).select('-password');
          if(!user)
          {
            return res.status(401).json({success: false, message: "User not found"});
          }
          req.user= user;
          next();
    }
    catch(error)
    {
          console.log("JWT verification is faild", error);
          return res.status(401).json({ success: false, message: "Token invalid or expired"});
    }
}
export default authMidlleare;