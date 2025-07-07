import express from "express";
import { getCurrentUser, loginUser, registerUser, updatePassword, updateProfile } from "../controller/userController.js";
import  authMidlleare from "../middleware/auth.js";


const userRouter= express.Router();

//public links
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);


//private links protect also
userRouter.get("/me", authMidlleare, getCurrentUser);
userRouter.put("/profile",authMidlleare, updateProfile);
userRouter.put("/password", authMidlleare, updatePassword);

export default userRouter;