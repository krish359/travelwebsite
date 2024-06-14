import {useEffect,useState} from 'react'
import './App.css';

function App() {
  const [loggedIn,setLoggedIn]=useState(true);
  const checkForInactivity = ()=>{
   const expireTime = localStorage.getItem("expireTime");
   if(expireTime<Date.now()){
    console.log('logout');
    setLoggedIn(false);
   }
  }
  const updateExpireTime= ()=>{
    const expireTime=Date.now()+10000;
    localStorage.setItem("expireTime",expireTime);
  }
  useEffect(()=>{
   const interval = setInterval(()=>{
    checkForInactivity();
   },1000);
   return ()=>clearInterval(interval);
  },[]);
  useEffect(()=>{
  updateExpireTime();
  window.addEventListener("click",updateExpireTime);
  window.addEventListener("keypress",updateExpireTime);
  window.addEventListener("scroll",updateExpireTime);
  window.addEventListener("mousemove",updateExpireTime);
  return()=>{
  window.addEventListener("click",updateExpireTime);
  window.addEventListener("keypress",updateExpireTime);
  window.addEventListener("scroll",updateExpireTime);
  window.addEventListener("mousemove",updateExpireTime);
  }
  },[]);
  return (
    <div className="App">
     Logged in:{loggedIn.toString()}
    </div>
  );
}

export default App;
