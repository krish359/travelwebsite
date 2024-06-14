import React from 'react'
import bookpic from '../Assets/library_front.jpg'
function Bookcard({item}){
    return(
        <div className='container'>
            <div className='row justify-content-center'>
                {item.map((val)=>(
                    <div key={val.id} className='col-md-4 col-sd-6 card my-3 border-0'>
                            <div className='card-img-top text-center'>
                                <img src={bookpic} alt = "hello" className='w-75'></img>
                                
                             
                            </div>
                            <div className='card-body'>
                                <div className='card-title fw-bold fs-4'>
                                    {val.title}
                                </div>
                                <div className='card-text'>
                                    {val.body}
                                </div>
                            </div>
                    </div>
                ))}

            </div>

        </div>
    )
}

export default Bookcard