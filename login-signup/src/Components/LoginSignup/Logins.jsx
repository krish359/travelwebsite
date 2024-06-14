import React from 'react'
import './Login.css'
import userpic from '../Assets/person.png'
import emailpic from '../Assets/email.png'
import passwordpic from '../Assets/password.png'
import { useNavigate } from 'react-router-dom'
import { useState,useEffect } from 'react'
import Axios from 'axios'
import './Modal.css'
// import Animatedgif from '../Animatedgif/Animatedgif'
import validator from 'validator'
export default function LoginSignup(){
    const [email,setEmail] = useState("")
    const [user,setUser] = useState("")
    const [password,setPassword] = useState("");
    const [loginStatus, setLoginStatus] = useState("Welcome to Login Page");
    const [modal, setModal] = useState(false);
    const [emailError, setEmailError] = useState(" ");
    const [colori, setcolori] = useState('nogo');
    Axios.defaults.withCredentials = true; 
  const toggleModal = () => {
    setModal(true);
  };
  const validateEmail = (e) => { 
    var email =  e;
    setEmail(e);
  
    if (validator.isEmail(email)) { 
      setEmailError("Valid Email") 
      console.log(emailError);
      setcolori('togo');
    } else { 
      setEmailError("Enter valid Email!") 
      console.log(emailError);
      setcolori('nogo');
    } 
  }
    const login = () => {
      validateEmail(email);
        Axios.post("http://localhost:3002/login", {
          user: user,
          password: password,
          email: email,
        }).then((response) => {
          
          if (response.data.message) {
            setLoginStatus(response.data.message);
          } else {
            console.log(response);
            console.log(response.data[0].userid);
            console.log(emailError);
            setLoginStatus("UserName is "+[response.data[0].user]);
            if(emailError!=="Enter valid Email!"){
            handleClick(response.data[0].userid);
            }
            
          }
        }).catch(err=>console.log(err));
      
      };

      useEffect(() => {
        Axios.get("http://localhost:3002/login").then((response) => {
          if (response.data.loggedIn === true) {
            setLoginStatus("Welcome to User Page");
          }
        }).catch(err=>console.log(err));
      }, []);


    const navigate = useNavigate();
    function handleClick(id){
     
      toggleModal();
      setTimeout(()=>{
        navigate("/Dashboard",{state:{user: user, userid: id}})
      },6000);
      
      
    }
    return(
      <div>
      {/* <div className='animated'>
          <Animatedgif  src="https://i.pinimg.com/originals/c9/16/09/c916096959c5846e90b548dd11b9e667.gif" alt="Animated Gif"/>
          </div> */}
        <div className='containers'>
          {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
          <img className='gift' src='https://i.pinimg.com/originals/71/3a/32/713a3272124cc57ba9e9fb7f59e9ab3b.gif' alt="Animated Gif"/>
          </div>
        </div>
      )}
            <div className="header">
                <div className="text">Login Page</div>
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
                    <img src={emailpic} alt="" />
                    <input type="email" placeholder="Email Id" autoComplete="off" onChange={(event)=>{
                        
                        validateEmail(event.target.value)
                    }}/>
                </div>
                <h className={colori} style={{marginLeft:'38%',fontSize:'17px'}}>{emailError}</h>
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
            <div>
            <h1 className="redirect">Don't have an account? <a href="/signuppage"><u>Click Here</u></a></h1>
            </div>
            <h1 className="status">{loginStatus}</h1>
            </div>
        </div>
        </div>
    )
}


