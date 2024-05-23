import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'

const MyRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<h1>Login</h1>} />
        </Routes>
    </BrowserRouter>
  )
}

export default MyRoutes