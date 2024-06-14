import React from 'react'

import './Card.css'
function Card( {item}){
    return(
        <div className='overall'>
            {item.map((val)=>(
                    <div key={val.id} className='card-container'>
            <div className='image-container'>
                <img src={val.image} alt="Bai" />
            </div>
            <div className='card-content'>
            <div className='card-title'>
                <h3>{val.title}</h3>
            </div>
            <div className='card-body'>
                <p><b>Author: </b> {val.body}</p>
            </div>
            </div>
            
            </div>
             ))}
        </div>
    )
}
export default Card