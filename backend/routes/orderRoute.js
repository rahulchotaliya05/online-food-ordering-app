import express from 'express'
import authmiddleware from '../middleware/auth.js'
import { listorders, placeOrder, updatestatus, userorder, verifyorder } from '../controllers/OrderController.js';
const orderRouter=express.Router();

orderRouter.post("/place",authmiddleware,placeOrder);

orderRouter.post("/verify",verifyorder);

orderRouter.post("/userorders",authmiddleware,userorder);

orderRouter.get("/list",listorders);

orderRouter.post("/status",updatestatus);

export default orderRouter