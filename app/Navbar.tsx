import React from 'react'

function Navbar() {
  return (
    <nav 
      className="navbar p-4 text-white flex rounded-2xl shadow-2xl"
      style={{
        background: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '16px',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(5px)',
        WebkitBackdropFilter: 'blur(5px)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
      }}
    >
      <ul className="flex space-x-6">
        <li className="font-bold text-lg mr-10">Dexter Blogs</li>
        <li className="hover:underline cursor-pointer">Home</li>
        <li className="hover:underline cursor-pointer">About</li>
        <li className="hover:underline cursor-pointer">Contact</li>
      </ul>
    </nav>  
  )
}

export default Navbar