import React from 'react'
import Data from '../Data/Data'
function Buttons({menuItems, filterItems, setItem}){
    return(
        <div className='d-flex'>
         {
            menuItems.map(val=>(
                <button className='btn-dark text-white p-1 px-2 mx-5 btn fw-bold mb-2'
                onClick={()=>filterItems(val)}>
                    {val}

                </button>
            ))
         }
         <button className='btn-dark text-white p-1 px-2 mx-5 btn fw-bold'
            onClick={()=>setItem(Data)}>
                   
                    All

                </button>
        </div>
    )
}
export default Buttons