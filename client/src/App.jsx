import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AdminSellerApprovals from './pages/admin/AdminSellerApproval'
import AdminDashboard from './pages/admin/AdminDashboard'

function App() {
  const [count, setCount] = useState(0)
  const [token, setToken] = useState(
    () => localStorage.getItem('accessToken') || ''
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin" replace />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/sellers" element={<AdminSellerApprovals token={token} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
