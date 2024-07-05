import express from 'express'
import cors from 'cors'
import { connectDB } from './config/dbConnect.js'
import foodRouter from './routes/foodRoute.js'
import userRouter from './routes/UserRoute.js'
import 'dotenv/config'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'


//app config

const app=express()
const PORT=4000


//Middleware 
app.use(express.json())
app.use(cors())

//dbconncetion
connectDB();

//api endpoints 

app.use("/api/food",foodRouter);
app.use("/images",express.static('uploads'));

app.use("/api/user",userRouter);

app.use("/api/cart",cartRouter);

app.use("/api/order",orderRouter);

app.get('/',(req,res)=>{
    res.send("api stating");

})

app.listen(PORT,()=>{
    console.log("server started....")
})