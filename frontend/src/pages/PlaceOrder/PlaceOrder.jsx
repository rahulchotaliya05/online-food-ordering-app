import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
const PlaceOrder = () => {

  const {getTotalCartAmount,token,food_list,cartItems,url}=useContext(StoreContext)
const [data,setdata]=useState({
  firstName:"",
  lastName:"",
  email:"",
  street:"",
  city:"",
  state:"",
  zipcode:"",
  country:"",
  phone:""

})

const onchangehandler=async(event)=>{
  const name=event.target.name;
  const value=event.target.value;

  setdata(data=>({...data,[name]:value}))
}

const placeorder=async(event)=>{
event.preventDefault();
let orderItems=[];
food_list.map((item)=>{
  if(cartItems[item._id]>0){
    let iteminfo=item;
    iteminfo["quantity"]=cartItems[item._id];
    orderItems.push(iteminfo);
  }
})

let orderData={
  address:data,
  items:orderItems,
  amount:getTotalCartAmount()+2,
}
let response=await axios.post(url+"/api/order/place",orderData,{headers:{token}});
console.log(response)
if(response.data.success){
  const {session_url}=response.data;
  window.location.replace(session_url)
}else{
  alert("Error");
}

}

const navigate= useNavigate();
useEffect(()=>{
if(!token){
navigate('/cart')
}else if(getTotalCartAmount()===0){
navigate('cart')
}
},[token])

  return (
   <form onSubmit={placeorder} className='place-order'>
    <div className="place-order-left">
      <p className="title">Delivery Information</p>
      <div className="multi-field">
        <input required name='firstName' onChange={onchangehandler} value={data.firstName} type="text" placeholder='First Name'/>
        <input required  name='lastName' onChange={onchangehandler} value={data.lastName} type="text" placeholder='Last Name'/>
      </div>
      <input required name='email' onChange={onchangehandler} value={data.email} type="email" placeholder='Email id' />
      <input required name='street' onChange={onchangehandler} value={data.street} type="text" placeholder='Street' />
      <div className="multi-field">
        <input required  name='city' onChange={onchangehandler} value={data.city} type="text" placeholder='City'/>
        <input required  name='state' onChange={onchangehandler} value={data.state} type="text" placeholder='State'/>
      </div>
      <div className="multi-field">
        <input required name='zipcode' onChange={onchangehandler} value={data.zipcode} type="text" placeholder='zip-code'/>
        <input required  name='country' onChange={onchangehandler} value={data.country} type="text" placeholder='country'/>
      </div>
      <input required name='phone' onChange={onchangehandler} value={data.phone} type="text" placeholder='phone' />
    </div>

    <div className="place-order-right">
    <div className="cart-total">
          <h2>Cart Totals </h2>
          <div>
            <div className="cart-total-details">
              <p>SubTotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <div className="cart-total-details">
              <p>Delivery Fees</p>
              <p>${getTotalCartAmount()===0?0:2}</p>
            </div>
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
              </div>
            
          </div>
          <button type='submit' >PROCEED TO Payment</button>
        </div>
    </div>
   </form>
  )
}

export default PlaceOrder
