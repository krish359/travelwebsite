import React,{useState} from 'react'
import { useLocation } from "react-router-dom";
import DashboardNavbar from '../DashboardNavbar/DashboardNavbar'
import StripeCheckout from "react-stripe-checkout"
import { useNavigate } from 'react-router-dom'
function Feepay() {
    const location=useLocation();
    const navigate = useNavigate();
    // const userid=location.state.userid;
    // const user=location.state.c;
    const title=location.state.title;
    const image=location.state.image;
    const description = location.state.description;
    const e = location.state.Borrowed_Till;
    const [product,setProduct]=useState({
        name: title,
        price: 1,
        productBy:"facebook"
        })
        
        const makePayment=token=>{
          const body = {
            token,
            product
          }
          const headers ={
            "Content-Type":"application/json"
          }
        return fetch('http://localhost:3002/payment',{
          method:"POST",
          headers,
          body: JSON.stringify(body)
        }).then(response=>{
          console.log("RESPONSE",response)
          const {status}= response;
          console.log("STATUS",status)
          if(status===200){
            setProduct(product);
            navigate("/success");
          }
          else{
            navigate("/fail");
          }
        })
        .catch(err=>console.log(err))
        }
  return (
    <div>
        <DashboardNavbar></DashboardNavbar>
        <div style={{marginLeft:'40%',marginTop:'5cm'}}>
            
          <div className='card-container'>
          <div style={{height:'350px',width:'400px',overflow:'hidden'}}>
                <img style={{height:'350px',width:'400px',overflow:'hidden'}} src={image} alt="" />
            </div>
            <div className='card-content'>
            <div className='card-title'>
                <h3>{title}</h3>
            </div>
            <div className='card-body'>
                <p><b>Author: </b>{description}</p>
                <div style={{display:'flex'}}>
                     <b style={{paddingTop:'0.5cm',marginRight:'20px'}}>Borrow Till: </b>
                     <input type='date' placeholder='Enter Borrow Date' value={e}/>
                  </div>
                  <StripeCheckout stripeKey="pk_test_51PQGAX2KO8VExv2Rbe0rrclyN2haw2jg9J8AnkU5S8VqpTw8TBR7Pmp1WYIqMMVxlFhXaF0lNkli5dmlyYZSWr3C00JCMxQ7AK" token={makePayment} name="Payment" amount={(product.price*100)}>
       <button className="submit" style={{marginLeft:'20%'}}>Pay Fine {product.price} $</button>
        </StripeCheckout>
            </div>
            </div>
          </div>
          
          </div>
    </div>
  )
}

export default Feepay