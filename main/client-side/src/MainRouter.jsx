import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Orders from './pages/Orders'
import CheckoutOne from './pages/CheckoutOne'
import CheckoutTwo from './pages/CheckoutTwo'
import CheckoutThree from './pages/CheckoutThree'
import Register from './pages/Register'
import Login from './pages/Login'
import { useSelector } from "react-redux";
import Product from './pages/Product'
import ProductList from './pages/ProductList'
import Cart from './pages/Cart'
import Invoice from './pages/Invoice'




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
                    <Route exact path='/profil' element={user ? <Orders /> : <Navigate to="/login" />} />
                    <Route exact path='/checkout/form/:id' element={<CheckoutOne />} />
                    <Route exact path='/checkout/confirm/:id' element={<CheckoutTwo />} />
                    <Route exact path='/checkout/complete' element={<CheckoutThree />} />
                    <Route exact path='/order/:id' element={<Invoice />} />
                </Routes>
            </Router>
        </div>
    )
}

export default MainRouter