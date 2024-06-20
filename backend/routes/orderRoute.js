import express from 'express'
import authmiddleware from '../middleware/auth.js'
import { placeOrder, userorder, verifyorder } from '../controllers/OrderController.js';
const orderRouter=express.Router();

orderRouter.post("/place",authmiddleware,placeOrder);

orderRouter.post("/verify",verifyorder);

orderRouter.post("/userorders",authmiddleware,userorder);

export default orderRouter