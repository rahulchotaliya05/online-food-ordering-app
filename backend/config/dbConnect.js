import mongoose from 'mongoose'

export const connectDB=async()=>{
    await mongoose.connect('mongodb+srv://rahulbhaichotliya:Rahul%235112@cluster0.uuiygli.mongodb.net/food_delivery_app')
    .then((result) => {
        console.log("database connection sucessfully")
    }).catch((err) => {
        console.log("Error to connect with DB :"+err)
    });
}
