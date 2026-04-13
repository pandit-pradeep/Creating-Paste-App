import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex flex-row gap-4 bg-red-500 text-white p-4 place-content-evenly'>
      <NavLink to="/">
        Home
      </NavLink>



      <NavLink to="/pastes">
        Pastes
      </NavLink>
    </div>
  )
}

export default Navbar
