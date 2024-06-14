import React from 'react'
import videoBg from '../Assets/switzerland.mp4'
import { useNavigate } from 'react-router-dom'
const Introduction = () => {
    const navigate = useNavigate();
    function loginhandler( ){
     
        navigate("/login");
    }

    
  return (
    
    <div className='mai'>
        <div className="overla"></div>
        <video src={videoBg} autoPlay loop muted />
        <div className="conten">
            <h1>Welcome To Library Management System</h1>
            <button className='submit' onClick={loginhandler}>Login Page</button>
        </div>
    </div>
  )
}

export default Introduction