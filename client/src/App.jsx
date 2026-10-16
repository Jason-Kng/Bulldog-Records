import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import AdminSellerApprovals from './AdminSellerApproval'

function App() {
  const [count, setCount] = useState(0)

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSmFuZSBEb2UiLCJpYXQiOjE3OTIxNjYyMDgsImV4cCI6MTc5MjE2OTgwOH0.iiV_As9bnKrSmAp9GMG5eKNhxRET-JpMULxB7iwnbeA'

  return (
    <>
      <AdminSellerApprovals token={token} />
    </>
  )
}

export default App
