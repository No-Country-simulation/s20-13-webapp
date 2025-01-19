import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppHome from './layout/AppHome'
import Login from './components/auth/Login'
import Home from './components/views/Home'

export default function Router() {
  return (
    <BrowserRouter>

      <Routes>
        <Route element={<AppHome />}>
          <Route path="/" element={<Login />} />

        </Route>
        <Route element={<AppHome />}>
          <Route path="/home" element={<Home />} />
        </Route>

      </Routes>
    </BrowserRouter >
  )
}

