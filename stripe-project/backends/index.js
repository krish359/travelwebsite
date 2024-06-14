const { toFormData } = require("axios");
const cors = require("cors");
const express = require("express");

const stripe=require("stripe")("sk_test_51PQGAX2KO8VExv2RFTA4VWahOnGBO8uSXxQ4C0HocGTkSv7n2mt6jgnw8y5G0msDABQtfVwiC5OFPOHvvEFyssSA00YsSe0e5U")

const uuid = require("uuid").v4;
const app=express();

//middleware
app.use(express.json())
app.use(cors())

//routes
app.get("/",(req,res)=>{
  res.send("IT works now")
});

app.post("/payment",(req,res)=>{

const {product,token}=req.body;
console.log("PRODUCT",product);
console.log("PRICE",product.price);
const idempotencyKey = uuid()

return stripe.customers.create({
  email: token.email,
  source: token.id
}).then(customer=>{
    stripe.charges.create({
      amount: product.price*100,
      currency: 'usd',
      customer: customer.id,
      receipt_email: token.email,
      description: `purchase of product.name`,
      shipping: {
        name: token.card.name,
        address: {
          country: token.card.address_country
        }
      }
    },{idempotencyKey: idempotencyKey})
}).then(result=>res.status(200).json(result))
.catch(err=>console.log(err))

})


//listen
app.listen(8282,()=> console.log("Listening at port 8282"))
