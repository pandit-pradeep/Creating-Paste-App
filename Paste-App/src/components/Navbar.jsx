import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex flex-row gap-4 bg-gradient-to-r from-[#ff5733] to-[#33cfff] font-semibold text-white p-4 place-content-evenly'>
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
