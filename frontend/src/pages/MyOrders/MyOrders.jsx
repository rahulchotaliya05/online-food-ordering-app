import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import {StoreContext} from '../../context/StoreContext.jsx'
import axios from 'axios'
import { assets } from '../../assets/assets.jsx'
const MyOrders = () => {
    const {url,token}=useContext(StoreContext);
const [data,setData]=useState([]);

const fetchorders=async()=>{
    const response=await axios.post(url+"/api/order/userorders",{},{headers:{token}});
    setData(response.data.data);
    
console.log("sdvsrgrg"+data);
}

useEffect(()=>{
    if(token){
        fetchorders();
    }
},[token])


  return (
    <div className='my-orders'>
        <h2>My Orders</h2>
        <div className="container">
            {data.map((order,index)=>{
                return (
                    <div key={index} className="my-orders-order">
                        <img src={assets.parcel_icon} alt="" />
                        <p>{order.item.map((item,index)=>{
                            if(index===order.item.length-1){
                                return item.name+ " X "+item.quantity
                            }else{
                                return item.name+ " X "+item.quantity +" , "
                            }
                        })}</p>
                    </div>
                )
            })}
        </div>
     
    </div>
  )
}

export default MyOrders
