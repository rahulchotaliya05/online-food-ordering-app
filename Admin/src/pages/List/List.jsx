import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import {toast} from 'react-toastify'
const List = ({url}) => {
  const [list,setlist]=useState([]);
 

  const fetchlist=async()=>{
    const response=await axios.get(`${url}/api/food/list`);
    console.log(response.data)
    if(response.data.success){
      setlist(response.data.data);
    }
    else{
      toast.error("Error")
    }
  }

  const removefood=async(foodId)=>{
  const response=await axios.post(`${url}/api/food/remove`,{id:foodId})

  await fetchlist();
  if(response.data.success){
    toast.success(response.data.message)
  }else{
    toast.error(response.data.message)
  }
  }
  useEffect(()=>{
fetchlist()
  },[])

  return (
    <div className='list add'>
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <p>Image</p>
          <p>Name</p>
          <p>Category</p>
          <p>Price</p>
          <p>Action</p>
         
         </div>
         {
          list.map((item,index)=>{
            return(
              <div key={index} className='list-table-format'>
                <img src={`${url}/images/`+item.image} alt="" />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>${item.price}</p>
                <p onClick={()=>removefood(item._id)} className='cursor'>X</p>
                </div>
            )
          })
         }
      </div>
    </div>
  )
}

export default List
