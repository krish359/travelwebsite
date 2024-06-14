import React from 'react'
import './SignupPage.css'
import { useState } from 'react'
import Axios from 'axios'
import '../LoginSignup/Modal.css'
import './AddBook.css'
import Navbar from '../Navbar/Navbar'
import { useNavigate } from 'react-router-dom'
function SignupPage(){
    const [user,setUser] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("");
    const [loginStatus, setLoginStatus] = useState(" ");
    const [modal, setModal] = useState(false);
    Axios.defaults.withCredentials = true;
  const toggleModal = () => {
    setModal(!modal);
  };
  const navigate = useNavigate();
    function handleClick(){
      navigate("/")
    }
  const Register=() => {
    setLoginStatus("Sign Up Successful");
    Axios.post("http://localhost:3002/register", {
        user: user,
        email: email,
        password: password,
      }).then((response) => {
        console.log(response);
      }).catch(err=>console.log(err));
      toggleModal();
      
};
    return(
        <div>
            <Navbar></Navbar>
        <div className='con'>
        {modal && (
      <div className="modal">
        <div onClick={toggleModal} className="overlay"></div>
        <div className="modal-content">
          <h2>Signup Successful</h2>
          <p>
            You can login with your Credentails now
          </p>
          <button className="close-modal" onClick={toggleModal}>
            X
          </button>
        </div>
      </div>
    )}
          <div className="header">
              <div className="text">SignUp Page</div>
              <div className="underline"></div>
          </div>
          <div className="inputs">
              <div className="details">Enter Username</div>
              <div className="input">
                  <input type="text" placeholder="User" onChange={(event)=>{
                      setUser(event.target.value)
                  }}/>
              </div>
              <div className="details">Enter Email </div>
              <div className="input">
                  <input type="text" placeholder="Email" onChange={(event)=>{
                      setEmail(event.target.value)
                  }}/>
              </div>
              <div className="details">Enter Password</div>
              <div className="input"> 
                  <input type="text" placeholder="Password" onChange={(event)=>{
                      setPassword(event.target.value)
                  }}/>
              </div>
          </div>
          
          <div className="submitcontainer">
              <div className="submit" onClick={Register} >Sign Up</div>
              <div className="submit" onClick={handleClick} >Back</div>
          </div>
          <div>
          <h1 className="status">{loginStatus}</h1>
          </div>
      </div>
      </div>
    )
}

export default SignupPage