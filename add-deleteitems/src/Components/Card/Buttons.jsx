import React from 'react'
import {useState,useEffect} from 'react'
import './Buttons.css'
function Buttons({menuItems, filterItems, setItem}){
    const [data,setData]=useState([])
    useEffect(()=>{
        fetch('http://localhost:3002/course_books')
        .then(res=>res.json())
        .then(data=>setData(data))
        .catch(err=>console.log(err));
    },[])
    return(
        <div className='submitcontaine'>
         {
            menuItems.map(val=>(
                <button className='submi'
                onClick={()=>filterItems(val)}>
                    {val}
                    
                </button>
            ))
         }
         <button className='submi'
            onClick={()=>setItem(data)}>
                    All

                </button>
        </div>
    )
}
export default Buttons