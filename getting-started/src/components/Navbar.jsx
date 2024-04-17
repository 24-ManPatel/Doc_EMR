import React from 'react'
import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-semibold">EMR Management</div>
        <ul className="flex space-x-4">
          <li><Link to='/' className="text-white hover:text-gray-300 font-semibold">Home</Link> </li>
          <li><Link to='/register' className="text-white hover:text-gray-300 font-semibold">Register</Link> </li>
          <li><Link to='/login' className="text-white hover:text-gray-300 font-semibold">Login</Link> </li>
          <li></li>
        </ul>
      </div>
    </nav>
  )
}

