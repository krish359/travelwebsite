import React from 'react'
import { Link } from "react-router-dom";
import './AdminNavbar.css'

function AdminNavbar(){
    return (
        <div className='navbar'>
            <div className='super'>
            Welcome Admin
            </div>
            
            <div className='navbarlo'>
                Welcome to Library Management System
            </div>
            <ul className='navbar-menu'>
            
                
                <li><Link to={"/"}>Logout</Link></li>
            </ul>
        </div>
    )
}

export default AdminNavbar