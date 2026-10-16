import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import AdminSellerApprovals from './AdminSellerApproval'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AdminSellerApprovals token={token} />
    </>
  )
}

export default App
