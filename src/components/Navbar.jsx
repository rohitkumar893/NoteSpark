import React from 'react'
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/ContextProvider'

const Navbar = () => {
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout();
    window.location.reload();
  }

  return (
    <div className='paddings w-full text-medium h-[60px] bg-blue-500 text-white flex justify-between items-center text-[25px]'>
        <Link to='/' className='text-[25px] font-medium'><img src="logo-small.png" className='h-[35px]'/></Link>
        <div className='flex gap-[12px] md:gap-[20px] text-medium text-[17px] md:text-[18px] font-medium'>
          {!user ? (
            <>
              <Link to='/login' className='bg-blue-400 w-[60px] h-[34px] flex items-center justify-center rounded-md'>Login</Link>
              <Link to='/signup' className='bg-blue-400 w-[72px] h-[34px] flex items-center justify-center rounded-md'>Signup</Link>
            </>) :
            (
              <button className='bg-blue-400 w-[72px] cursor-pointer h-[34px] flex items-center justify-center rounded-md' onClick={handleLogout}>Logout</button>
            )}     
        </div>
    </div>
  )
}

export default Navbar