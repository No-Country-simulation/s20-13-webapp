import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppHome from './layout/AppHome'
import Login from './components/auth/Login'
import Home from './views/Home'
import CaretakerProfile from './views/CaretakerProfile'

export default function Router() {
  return (
    <BrowserRouter>

      <Routes>
        <Route element={<AppHome />}>
          <Route path="/auth" element={<Login />} />
        </Route>
        <Route element={<AppHome />}>
          <Route path="/" element={<Home />} />
          <Route path={"/caretaker/:id"} element={<CaretakerProfile/>}/>
        </Route>

      </Routes>
    </BrowserRouter >
  )
}

