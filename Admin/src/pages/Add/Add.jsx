import React, {  useState } from 'react'
import './Add.css'
import assets from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'


const Add = ({url}) => {

   
    const [image,setimage]=useState(false);
    const [data,setData]=useState({
        name:"",
        description:"",
        price:"",
        category:"Salad"
    });

    const onchangehandler=(event)=>{
        const name=event.target.name;
        const value=event.target.value;
        setData(data=>({...data,[name]:value}))
    }

    const onsubmithandler=async(event)=>{
        event.preventDefault();
       
        const formData=new FormData();
        formData.append("name",data.name);
        formData.append("description",data.description);
        formData.append("price",(Number(data.price)))
        formData.append("category",data.category);
        formData.append("image",image);
        alert("fasggg::"+data.category);
        const response=await axios.post(`${url}/api/food/add`,formData);

       
        if(response.data.success){
            
         setData({
                name:"",
                description:"",
                price:"",
                category:"Salad"
            })
                setimage(false)
            toast.success(response.data.message)
            
        }else{
            toast.error(response.data.message)
        }

    }

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onsubmithandler} >
        <div className="add-image-upload flex-col">
    <p>Upload Image</p>
    <label htmlFor="image">
        <img src={image?URL.createObjectURL(image):assets.upload_area} style={{height:'120px',width:'120px'}} alt="" />
    </label>
    <input onChange={(e)=>setimage(e.target.files[0])} type="file" id="image" hidden required/>
        </div>

    <div className="add-product-name flex-col">
<p>Product Name</p>
<input onChange={onchangehandler} value={data.name} type="text" name='name' placeholder='Type here' />
    </div>
    <div className="add-product-description flex-col">
        <p>Product Description</p>
        <textarea  onChange={onchangehandler}  value={data.description}
        name="description" rows="6" placeholder='write content here' required></textarea>
    </div>
    <div className="add-category-price">
        <div className="add-category flex-col">
    <p>Product Category</p>
    <select name="category"  onChange={onchangehandler}>
        <option value="Salad">Salad</option>
        <option value="Rolls">Rolls</option>
        <option value="Deserts">Deserts</option>
        <option value="SandWich">SandWich</option>
        <option value="Cake">Cake</option>
        <option value="Pure Veg">Pure Veg</option>
        <option value="Pasta">Pasta</option>
        <option value="Noodles">Noodles</option>
    </select>
        </div>

        <div className="add-price flex-col">
            <p>Product Price</p>
            <input  onChange={onchangehandler} value={data.price}
             type="Number" name='price' placeholder='$10' />
        </div>
    </div>
    <button type='submit' className='add-btn'>ADD</button>
      </form>
    </div>
  )
}

export default Add
