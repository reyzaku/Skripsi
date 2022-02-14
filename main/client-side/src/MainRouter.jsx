import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Profile from './pages/Profile'
import CheckoutOne from './pages/CheckoutOne'
import CheckoutTwo from './pages/CheckoutTwo'
import Register from './pages/Register'
import Login from './pages/Login'

import { useContext } from 'react'
import { UserContext, UserProvider } from './context/UserContext'
import Product from './pages/Product'
import ProductList from './pages/ProductList'




const MainRouter = () => {
    // const [user, setUser] = useContext(UserContext)
    // const LoginRoute = ({...props}) => {
    //     if(user === null) {
    //         return <Route {...props} />
    //     } else {
    //         return <Navigate to="/" />
    //     }
    // }

    return (
        <UserProvider>
            <Router>
                <Routes>
                    <Route exact path='/' element={<Homepage/>} />
                    <Route exact path='/login' element={<Login/>} />
                    <Route exact path='/register' element={<Register/>} />
                    <Route exact path='/katalog' element={<ProductList/>} />
                    <Route exact path='/katalog/:category' element={<ProductList/>} />
                    <Route exact path='/produk/:id' element={<Product/>} />

                    {/* <LoginRoute exact path="/register" element={Register} />
                    <LoginRoute exact path="/login" element={Login} /> */}
                    <Route exact path='/profil' element={<Profile/>} />
                    <Route exact path='/checkout' element={<CheckoutOne/>} />
                    <Route exact path='/checkout/info' element={<CheckoutTwo/>} />
                </Routes>
            </Router>
        </UserProvider>
    )
}

export default MainRouter