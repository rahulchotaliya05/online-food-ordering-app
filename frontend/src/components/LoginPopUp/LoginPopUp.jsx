import React, { useContext, useEffect, useState } from 'react'
import './LoginPopUp.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios'
const LoginPopUp = ({setshowlogin}) => {

  const [currState,setcurrState]=useState('Sign Up');
  const {url,settoken}=useContext(StoreContext)

  const [data,setdata]=useState({
    name:"",
    email:"",
    password:""
  })

const onchangehandler=(event)=>{
const name=event.target.name;
const value=event.target.value;

setdata(data=>({...data,[name]:value}))
}

const onlogin=async(event)=>{
event.preventDefault();
let newUrl=url;
if(currState==="Login"){
  newUrl+= "/api/user/login"
}else{
  newUrl +="/api/user/register"
}
const response=await axios.post(newUrl,data);

if(response.data.success){
settoken(response.data.token);
localStorage.setItem("token",response.data.token);
setshowlogin(false);
}else{
alert(response.data.message)
}
}


  return (
    <div className='login-popup' >
     <form onSubmit={onlogin} className='login-popup-container' >
    <div className="login-popup-title">
      <h2>{currState}</h2>
      <img src={assets.cross_icon} onClick={()=>setshowlogin(false)} alt="" />
    </div>
    <div className="login-popup-input">
      {currState==="Login"?<></>: <input name='name' onChange={onchangehandler} value={data.name} type="text"  placeholder='enter your name' required />}
     
      <input name='email' onChange={onchangehandler} value={data.email} type="text"  placeholder='enter your email' required />
      <input name='password' onChange={onchangehandler} value={data.password} type="password"  placeholder='enter your password' required />
    
    </div>
    <button type='submit'>{currState==='Sign Up' ? "Create Account":"Login"}</button>
    <div className="login-popup-condition">
      <input type="checkbox" required />
      <p>By Coutinuing,i agree to the terms of use & privacy policy.</p>
    </div>
    {currState==='Login' ? 
    <p>Create a new account ? <span onClick={()=>setcurrState("Sign Up")}> Click here</span></p>
   : <p>Already have an account ?<span onClick={()=>setcurrState("Login")}> Login </span></p>
  }
     </form>
    </div>
  )
}

export default LoginPopUp
