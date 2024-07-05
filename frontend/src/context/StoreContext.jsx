import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext=createContext(null);

const StoreContextProvider=(props)=>{
    const [cartItems,setCartItems]=useState([]);
    const url="http://localhost:4000";
    const [token,settoken]=useState("");
    const [food_list,setFoodlist]=useState([])

    const addTOCart= async(itemId)=>{
        if(!cartItems[itemId]){
            setCartItems((prev)=>({...prev,[itemId]:1}))
        }
        else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }

        if(token){
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
        }
    }

    const removeFromCart= async(itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}));
        if(token){
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
    }

  const getTotalCartAmount=()=>{
      let totalamount = 0;
      for (const item in cartItems) {
          if (cartItems[item] > 0) {
              let iteminfo = food_list.find((product) => product._id === item)
              totalamount += iteminfo.price * cartItems[item];
          }
      }
      return totalamount;
    }

    const fetchfoodlist=async()=>{
        const response=await axios.get(url+"/api/food/list");
        setFoodlist(response.data.data);
    }

    const loadcartdata=async(token)=>{
        const response=await axios.post(url+"/api/cart/get",{},{headers:{token}});
        setCartItems(response.data.cartData);
    }

    useEffect(()=>{
       
        async function loaddata(){
           await fetchfoodlist();
           if(localStorage.getItem("token")){
            settoken(localStorage.getItem("token"));
            await loadcartdata(localStorage.getItem("token"));
        }
        }
        loaddata();
    },[])
    const contextVlaue={
        food_list,
        cartItems,
        setCartItems,
        addTOCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        settoken
    }
    return(
        <StoreContext.Provider value={contextVlaue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider