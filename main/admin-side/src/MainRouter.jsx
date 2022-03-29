import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import NavigationBar from './Component/NavigationBar'
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
    return (
        <Router>
            <NavigationBar />
            <Routes>
                <Route exact path='/' element={<Homepage />} />
                {/* <Route exact path='/login' element={user ? <Navigate to="/" /> : <Login />} /> */}
                <Route exact path='/produk' element={<ProductTable />} />
                <Route exact path='/order' element={<OrderTable />} />
                <Route exact path='/user' element={<UserTable />} />
                <Route exact path='/produk/edit/:id' element={<ProductEdit />} />
                <Route exact path='/user/edit/:id' element={<UserEdit />} />
                <Route exact path='/produk/add' element={<ProductForm />} />
                <Route exact path='/user/add' element={<UserForm />} />
                <Route exact path='/produk/:id' element={<ProductDetail />} />
                <Route exact path='/order/:id' element={<OrderDetail />} />
                <Route exact path='/user/:id' element={<UserDetail />} />
                <Route exact path='/order/update/:id' element={<ResiInput />} />
            </Routes>
        </Router>
    )
}

export default MainRouter