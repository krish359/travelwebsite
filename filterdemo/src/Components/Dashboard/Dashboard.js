import React, { useState } from 'react'


import 'bootstrap/dist/css/bootstrap.min.css'

import Data from '../Data/Data'
import Bookcard from '../Bookcard/Bookcard'
import Buttons from '../Buttons/Buttons'
function Dashboard(){
    const [item,setItem]=useState(Data)
    const menuItems = [...new Set(Data.map((val)=>val.category))]

const filterItems=(cat)=>{
    const newItems = Data.filter((newVal)=>newVal.category === cat)
    setItem(newItems)

}

    return (
        <div>
            <div className="container-fluid">
              <div className="row">
                <h1 className='text-center col-12 fw-bold mt-3 mb-5'>Library books</h1>
                <Buttons menuItems={menuItems} filterItems={filterItems} setItem={setItem}></Buttons>
                  <Bookcard item={item}></Bookcard>
              </div>
        </div>
        </div>
        

    )
}

export default Dashboard