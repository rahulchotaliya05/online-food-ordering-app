import express from 'express'
import { loginUser, registerUser } from '../controllers/UserController.js'


const userRouter=express.Router()

//login
userRouter.post("/login",loginUser);

//register
userRouter.post("/register",registerUser);


export default userRouter