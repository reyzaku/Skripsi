import React from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import NavigationBar from './Component/NavigationBar'
import Login from './Pages/Auth/Login'
import Homepage from './Pages/Home/Homepage'
import OrderDetail from './Pages/Order/OrderDetail'
import OrderTable from './Pages/Order/OrderTable'
import ResiInput from './Pages/Order/ResiInput'
import ProductDetail from './Pages/Product/ProductDetail'
import ProductEdit from './Pages/Product/ProductEdit'
import ProductForm from './Pages/Product/ProductForm'
import ProductTable from './Pages/Product/ProductTable'
import UserDetail from './Pages/User/UserDetail'
import UserEdit from './Pages/User/UserEdit'
import UserForm from './Pages/User/UserForm'
import UserTable from './Pages/User/UserTable'

const MainRouter = () => {
    const user = useSelector((state) => state.user.currentUser);
    return (
        <Router>
            <NavigationBar />
            <Routes>
                <Route exact path='/login' element={user ? <Navigate to="/" /> : <Login />} />
                <Route exact path='/' element={!user ? <Navigate to="/login" /> : <Homepage />} />
                <Route exact path='/produk' element={!user ? <Navigate to="/login" /> : <ProductTable />} />
                <Route exact path='/produk/:id' element={!user ? <Navigate to="/login" /> : <ProductDetail />} />
                <Route exact path='/produk/add' element={!user ? <Navigate to="/login" /> : <ProductForm />} />
                <Route exact path='/produk/edit/:id' element={!user ? <Navigate to="/login" /> : <ProductEdit />} />
                <Route exact path='/user' element={!user ? <Navigate to="/login" /> : <UserTable />} />
                <Route exact path='/user/:id' element={!user ? <Navigate to="/login" /> : <UserDetail />} />
                <Route exact path='/user/add' element={!user ? <Navigate to="/login" /> : <UserForm />} />
                <Route exact path='/user/edit/:id' element={!user ? <Navigate to="/login" /> : <UserEdit />} />
                <Route exact path='/order' element={!user ? <Navigate to="/login" /> : <OrderTable />} />
                <Route exact path='/order/:id' element={!user ? <Navigate to="/login" /> : <OrderDetail />} />
                <Route exact path='/order/update/:id' element={!user ? <Navigate to="/login" /> : <ResiInput />} />
            </Routes>
        </Router>
    )
}

export default MainRouter