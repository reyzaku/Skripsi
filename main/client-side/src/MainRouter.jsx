import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Profile from './pages/Profile'
import CheckoutOne from './pages/CheckoutOne'
import CheckoutTwo from './pages/CheckoutTwo'
import Register from './pages/Register'
import Login from './pages/Login'
import { useSelector } from "react-redux";
import Product from './pages/Product'
import ProductList from './pages/ProductList'
import Cart from './pages/Cart'




const MainRouter = () => {

    const user = useSelector((state) => state.user.currentUser)

    return (
        <div>
            <Router>
                <Routes>
                    <Route exact path='/' element={<Homepage />} />
                    <Route exact path={'/login'} element={user ? <Navigate to="/" /> : <Login />} />
                    <Route exact path={'/register'} element={user ? <Navigate to="/" /> : <Register />} />
                    <Route exact path='/katalog' element={<ProductList />} />
                    <Route exact path='/katalog/:category' element={<ProductList />} />
                    <Route exact path='/produk/:id' element={<Product />} />
                    <Route exact path='/cart' element={user ? <Cart /> : <Navigate to="/login" />} />
                    {/* <LoginRoute exact path="/register" element={<Register />} />
                    <LoginRoute exact path="/login" element={<Login />} /> */}
                    <Route exact path='/profil' element={user ? <Profile /> : <Navigate to="/login" />} />
                    {/* <AuthRoute exact path="/profil" element={<Profile />} /> */}
                    <Route exact path='/checkout/form/:id' element={<CheckoutOne />} />
                    <Route exact path='/checkout/confirm/:id' element={<CheckoutTwo />} />
                </Routes>
            </Router>
        </div>
    )
}

export default MainRouter