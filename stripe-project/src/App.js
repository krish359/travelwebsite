import logo from './logo.svg';
import './App.css';
import React,{useState} from 'react'
import StripeCheckout from "react-stripe-checkout"
function App() {
  const [product,setProduct]=useState({
  name: "Reatc by facebook",
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
  return fetch('http://localhost:8282/payment',{
    method:"POST",
    headers,
    body: JSON.stringify(body)
  }).then(response=>{
    console.log("RESPONSE",response)
    const {status}= response;
    console.log("STATUS",status)
  })
  .catch(err=>console.log(err))
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <StripeCheckout className='payment-form' stripeKey="pk_test_51PQGAX2KO8VExv2Ro9FlYxpJVwQawdhnPYomjuX3SFlis1OGdtJUzJaJ1HvHECgWb9EvbNNALAmUB76yQSiUXbjy00cvApC7QE" token={makePayment} name="By react" amount={(product.price*100)}>
       <button className="btn-large blue">Buy react just in {product.price} $</button>
        </StripeCheckout>
      </header>
    </div>
  );
}

export default App;
