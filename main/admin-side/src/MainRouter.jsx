import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom'

const Container = styled.div`

`

const MainRouter = () => {
    return (
        <Router>
            <Routes>
                <Route exact path='/' element={<Homepage />} />
                <Route exact path='/login' element={user ? <Navigate to="/" /> : <Login />} />
            </Routes>
        </Router>
    )
}

export default MainRouter