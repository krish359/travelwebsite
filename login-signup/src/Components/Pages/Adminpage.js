import React from 'react'
import userpic from '../Assets/person.png'
import passwordpic from '../Assets/password.png'
import { useNavigate } from 'react-router-dom'
import { useState,useEffect } from 'react'
import Axios from 'axios'
import './Adminpage.css'
import Navbar from '../Navbar/Navbar'
export default function AdminPage(){
    
    const [user,setUser] = useState(" ")
    const [password,setPassword] = useState("");
    const [loginStatus, setLoginStatus] = useState("Welcome to AdminPage");
    const [modal, setModal] = useState(false);
    Axios.defaults.withCredentials = true;
    const toggleModal = () => {
      setModal(true);
    };
    const login = () => {
        Axios.post("http://localhost:3002/login", {
          user: user,
          password: password,
        }).then((response) => {
          if (response.data.message) {
            setLoginStatus(response.data.message);
          } else if(response.data[0].user==='adminenter'){
            setLoginStatus("UserName is Admin");

            handleClick();
            
          }
          else{
            setLoginStatus("Please provide admin credentials");
          }
        }).catch(err=>console.log(err));
      };

      useEffect(() => {
        Axios.get("http://localhost:3002/login").then((response) => {
          if (response.data.loggedIn === true) {
            setLoginStatus("Wrong Password");
          }
        }).catch(err=>console.log(err));
      }, []);


    const navigate = useNavigate();
    function handleClick(){
      toggleModal();
      
      setTimeout(()=>{
        navigate("/admindashboard",{state:{user: user}})
      },8000);
    }
    
    
    return(
        <div>
        <Navbar></Navbar>
        <div className='container'>
        {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
          <img className='gift' src='https://cdn.dribbble.com/users/121337/screenshots/1024835/loading2.gif' alt="Animated Gif"/>
          </div>
        </div>
      )}
            <div className="header">
                <div className="text">Admin Page</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                <div className="input">
                    <img src={userpic} alt="" />
                    <input type="text" placeholder="Name" onChange={(event)=>{
                        setUser(event.target.value)
                    }}/>
                </div>
                <div className="input">
                    <img src={passwordpic} alt="" />
                    <input type="password" placeholder="Password" onChange={(event)=>{
                        setPassword(event.target.value)
                    }}/>
                </div>
            </div>
            
            <div className="submitcontainer">
                <div className="submit" onClick={login}>Login</div>
                
            </div>
            <div>
            <h1 className="status">{loginStatus}</h1>
            </div>
        </div>
     </div>   
    )
}


