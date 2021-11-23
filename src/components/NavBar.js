import React from 'react';
import { NavLink } from 'react-router-dom'

const NavBar = () =>  {
    return (
        <div className="nav-bar">
            <NavLink to='/about' className="navlink">
                    <h2>Om oss</h2>
            </NavLink>
        </div> 
    )
}  
export default NavBar