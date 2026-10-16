// import { useState } from 'react'
import './App.css'
import { Link, Route, Routes } from 'react-router-dom';
// import { useMessages } from './context/MessagesContext.jsx';
import Login from './login.jsx';
import Buyer from './buyerDashboard.jsx';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="navbar-brand">
          Bulldog Records
        </Link>

        <div className="navbar-search">
          <input type="text" placeholder="Search albums..." className="search-bar" />
        </div>

        <div className="navbar-links">
          <Link to="/" className="nav-link">
            Cart
          </Link>
          <Link to="/" className="nav-link">
            Orders
          </Link>
          <Link to="/" className="nav-link">
            Account
          </Link>
        </div>
      </nav>

      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/buyer' element={<Buyer />} />
      </Routes>


    </>
  )
}

export default App
