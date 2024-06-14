import React from 'react'
import './Navbar.css'
import { Link } from "react-router-dom";
function Navbar(){
    return (
        <div className='navbar'>
            <div className='navbar-logo'>
                LIBRARY MANAGEMENT SYSTEM
            </div>
            <ul className='navbar-menu'>
            <li><a href="/">Home</a></li>
            <li><Link to={"/admin"}>Admin</Link></li>   
                <li><Link to={"/blog"}>Blog</Link></li>
                <li><Link to={"/Contact"}>Contact</Link></li>
            </ul>
        </div>
    )
}

export default Navbar