import React from 'react'
import { Link,useLocation } from "react-router-dom";
import '../Navbar/Navbar.css'
import './DashboardNavbar.css'
import { useNavigate } from 'react-router-dom'
function DashboardNavbar(){
    const location=useLocation();
    console.log(location);
    const a=location.state.userid;
    const b=location.state.user;
    const navigate = useNavigate();
    function clickhandle( ){
      navigate("/cart",{state:{userid: a, user: b}})
      window.location.reload();
    }
    function profilehandle( ){
        navigate("/profile",{state:{userid: a, user: b}})
        window.location.reload();
      }
    function dashboardhandle( ){
        navigate("/Dashboard",{state:{userid: a, user: b}})
    
      }
    return (
        <div className='navbar'>
            <div className='super'>
            Welcome {b}
            </div>
            
            <div className='navbarlog'>
                Welcome to Library Management System
            </div>
            <ul className='navbar-menu'>
            <li><button className="submitb" onClick={()=>dashboardhandle()}>DASHBOARD</button></li>
            <li><button className="submitb" onClick={()=>clickhandle()}>CART</button></li>
            <li><button className="submitb" onClick={()=>profilehandle()}>PROFILE</button></li>
                <li><Link to={"/"}>Logout</Link></li>
            </ul>
        </div>
    )
}

export default DashboardNavbar