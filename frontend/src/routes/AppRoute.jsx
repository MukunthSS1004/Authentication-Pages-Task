import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../pages/login'
import SignUp from '../pages/signup'
import Welcome from '../pages/userpage'

export default function Approute() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}