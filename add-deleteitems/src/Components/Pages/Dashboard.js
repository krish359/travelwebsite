import React,{useState,useEffect} from 'react'


import Buttons from '../Card/Buttons'
import Card from '../Card/Card'
import './Dashboard.css'
function Dashboard({feed}){
    
    const [data,setData]=useState(feed)
    
    useEffect(()=>{
        fetch('http://localhost:3002/course_books')
        .then(res=>res.json())
        .then(data=>setData(data))
        .catch(err=>console.log(err));
    },[])
    
    const [item,setItem]=useState(data)
    const menuItems = [...new Set(data.map((val)=>val.category))]

const filterItems=(cat)=>{
    const newItems = data.filter((newVal)=>newVal.category === cat)
    setItem(newItems)

}


    return (
        <div className='Dashboardbody'>
            
            <div className='welcome'>
                <div className='start'>Welcome to Library Books Collection</div>
            </div>
            <div>
              <div>
                <Buttons menuItems={menuItems} filterItems={filterItems} setItem={setItem}></Buttons>
                        <Card item={item}></Card>  
              </div>
        </div>
            
        </div>
    )
}

export default Dashboard