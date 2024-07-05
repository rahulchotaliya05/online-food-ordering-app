
import React, { useState } from 'react'

import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home.jsx'
import Cart from './pages/Cart/Cart.jsx'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder.jsx'
import Navbar from './components/Navbar/Navbar.jsx'
import Footer from './components/Footer/Footer.jsx'
import LoginPopUp from './components/LoginPopUp/LoginPopUp.jsx'
import Verify from './pages/Verify/Verify.jsx'
import MyOrders from './pages/MyOrders/MyOrders.jsx'

const App = () => {
  const [showligin,setshowlogin]=useState(false)
  return (
    <>
    {showligin?<LoginPopUp setshowlogin={setshowlogin}/>:<></>}
    <div className='app'>
     <Navbar setshowlogin={setshowlogin} />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/cart' element={<Cart/>} />
        <Route path='/order' element={<PlaceOrder/>} />
        <Route path='/verify' element={<Verify />} />
        <Route path='/myorders' element={<MyOrders />} />
      </Routes>
    </div>
    <Footer />
    </>
  )
}

export default App
