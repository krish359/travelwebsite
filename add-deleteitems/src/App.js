import './Components/Pages/Dashboard'
import './App.css';
import Dashboard from './Components/Pages/Dashboard';

import {useState,useEffect} from 'react'
function App() {
  const [data,setData]=useState([])
    useEffect(()=>{
        fetch('http://localhost:3002/course')
        .then(res=>res.json())
        .then(data=>setData(data))
        .catch(err=>console.log(err));
    },[])
  return (
    <Dashboard feed={data}></Dashboard>
  )
}

export default App;
