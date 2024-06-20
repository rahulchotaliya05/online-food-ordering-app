import foodModel from "../model/foodModel.js";
import fs from 'fs'

//add food items 

const addFood=async(req,res)=>{
        let image_filename=`${req.file.filename}`;
        
        const food=new foodModel({
            name:req.body.name,
            description:req.body.description,
            price:req.body.price,
            category : req.body.category,
            image:image_filename
        })

        try {
            await food.save();
            res.json({success:true,message:"food added sucessfully"})
        } catch (error) {
            console.log("error to adding food",error)
            res.json({success:false,message:"error"})
        }
}


// all food list

const listfood=async(req,res)=>{
    try {
        const foods=await foodModel.find({});
        res.json({success:true,data:foods})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"error"})
    }
}

//remove food item

const removefood=async(req,res)=>{
try {
        const food=await foodModel.findById(req.body.id);
        //delete the image from upload folder
    fs.unlink(`uploads/${food.image}`,()=>{})

    //delete all details of particular food in database
    await foodModel.findByIdAndDelete(req.body.id);

    res.json({success:true,message:"Food Removed"})



} catch (error) {
    console.log(error)
    res.json({sucess:false,message:"error"})
}
}



export{
    addFood,
    listfood,
    removefood
}