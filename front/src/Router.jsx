import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppHome from './layout/AppHome'
import Login from './components/auth/Login'

export default function Router() {
  return (
    <BrowserRouter>

      <Routes>
        <Route element={<AppHome />}>
          <Route path="/auth" element={<Login />} />

        </Route>



      </Routes>
    </BrowserRouter >
  )
}

