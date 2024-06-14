import React from 'react'

import './Card.css'
function Card( {item}){
    return(
        <div className='overall'>
            {item.map((val)=>(
                    <div key={val.SNo} className='card-container'>
            <div className='image-contain'>
                <img src={val.image} alt="" />
            </div>
            <div className='card-content'>
            <div className='card-title'>
                <h3>{val.title}</h3>
            </div>
            <div className='card-body'>
                <p><b>Author: </b> {val.description}</p>
            </div>
            </div>
            <div>
                <button className='zoro'>
                    Borrow Book
                </button>
                
            </div>
            </div>
             ))}
        </div>
    )
}
export default Card