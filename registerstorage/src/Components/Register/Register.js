
import './Register.css'

import { useState,useEffect } from 'react'
import Axios from 'axios'

export default function Registration(){

    const [email,setEmail] = useState("")
    const [user,setUser] = useState("")
    const [password,setPassword] = useState("");
    const [loginStatus, setLoginStatus] = useState("Welcome");
    Axios.defaults.withCredentials = true;
const Register=() => {
    Axios.post("http://localhost:3002/register", {
        user: user,
        email: email,
        password: password,
      }).then((response) => {
        console.log(response);
      });
};

const login = () => {
    Axios.post("http://localhost:3002/login", {
      user: user,
      password: password,
    }).then((response) => {
      if (response.data.message) {
        setLoginStatus(response.data.message);
      } else {
        setLoginStatus(response.data[0].user);
      }
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3002/login").then((response) => {
      if (response.data.loggedIn === true) {
        setLoginStatus("Wrong Password");
      }
    });
  }, []);

    return(
        <div className='container'>
            <div className="header">
                <div className="text">Login</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                <div className="input">
                    <img src={user} alt="" />
                    <input type="text" placeholder="Name" onChange={(event)=>{
                        setUser(event.target.value)
                    }}/>
                </div>
                
                <div className="input">
                    <img src={email} alt="" />
                    <input type="email" placeholder="Email Id" onChange={(event)=>{
                        setEmail(event.target.value)
                    }} />
                </div>
                <div className="input">
                    <img src={password} alt="" />
                    <input type="password" placeholder="Password" onChange={(event)=>{
                        setPassword(event.target.value)
                    }}/>
                </div>
            </div>
            
            
            <div className="submitcontainer">
                
                <button className="submit" onClick={Register}> Sign Up</button>
                
                <button className="submit" onClick={login}>Login</button>
            </div>
            <div>
            <h1>{loginStatus}</h1>
            </div>
        </div>
    )


}
