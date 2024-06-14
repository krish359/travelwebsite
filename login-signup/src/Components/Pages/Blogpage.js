import React from 'react'
import Barchart from '../Barchart/Barchart'
import Navbar from '../Navbar/Navbar'
import './Blogpage.css'
function Blogpage(){
    return(
    <div>
        <Navbar></Navbar>
        <div className="world">
            Blog
        <div className="underline"></div>
    </div>
    <Barchart></Barchart>
        </div>
    )
}

export default Blogpage