import React from 'react';
import { NavLink } from 'react-router-dom'

const Header = () =>  {
    return (
        <NavLink to='/' style={{textDecoration: "none"}} className="navlink">
            <header>
                <h2>Malin och Stella i Taiwan</h2>
            </header>
        </NavLink>
        

        
    )
}  
export default Header