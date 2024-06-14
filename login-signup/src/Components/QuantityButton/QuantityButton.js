import React from 'react'
import {useState} from 'react'


import './QuantityButton.css'

function QuantityButton(){
    let [quantity,setquantity]=useState( 0);
    
    const decrement=()=>{
        if(quantity===0){
            setquantity(0)
        }
        else{
            let x=quantity-1;
           
            setquantity(x);
        }
    }
    const increment=()=>{
        let y=quantity+1;
        setquantity(y);
    }
   
return(
<div className="quantitybutton">
    <button className="decrement" onClick={decrement}>-</button>
    <button className="presentquantity">{quantity}</button>
    <button className="increment" onClick={increment}>+</button>
    
</div>
)

}
export default QuantityButton
