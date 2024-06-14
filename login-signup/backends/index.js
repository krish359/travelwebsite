const { toFormData } = require("axios");
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const stripe=require("stripe")("sk_test_51PQGAX2KO8VExv2RqXNcbqXbFCrjkr37Qcf2oCaqfw2m0ZMj5TIB6w69oHKkxQvOsogbnHjlYh1pGfUua8iU2Ubt00iS5lPwN4")

const uuid = require("uuid").v4;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const bcrypt = require("bcrypt");

const { response } = require("express");

const saltRounds = 10;

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST","PUT"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "root",
  database: "librar",
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
  }
  )
  .then(result=>res.status(200).json(result))
  
  .catch(err=>console.log(err))
  
  })

app.post("/regist",(req,res)=>{
  const emai = req.body.email;
  db.query(
    "SELECT * FROM register_table where email = ?",[emai],
    (err,result)=>{
      console.log(err);
      console.log(result);
      if(!result.length>0){
        res.send({message: "user not exist"});
      }
      else{
        res.send({message: "user available at id ",re: result});
      }
    }
  )
});


app.post("/deletebook",(req,res)=>{
  const emai = req.body.email;
  db.query(
    "DELETE FROM course_books where SNo = ?",[emai],
    (err,result)=>{
      console.log(err);
      console.log(result);
      if(!result.length>0){
        res.send({message: "Deleted Successfully"});
      }
      else{
        res.send({message: "Failed to Delete"});
      }
    }
  )
});

app.put("/usercourse_delete",(req,res)=>{
  const userid = req.body.userid;
  const SNo = req.body.SNo;
  db.query(
    "DELETE FROM user_course where userid=? AND SNo = ?",[userid,SNo],
    (err,result)=>{
      console.log(err);
      console.log(result);
      if(!result.length>0){
        res.send({message: "Deleted Successfully"});
      }
      else{
        res.send({message: "Failed to Delete"});
      }
    }
  )
});

app.put("/usercourse_borrow",(req,res)=>{
  const userid = req.body.userid;
  const SNo = req.body.SNo;
  
  const date = req.body.date;
  console.log(date);
  db.query(
    "UPDATE user_course SET Status='Borrowed',Borrowed_Till=? WHERE userid=? AND SNo = ?",[date,userid,SNo],
    (err,result)=>{
      console.log(err);
      console.log(result);
      if(!result.length>0){
        res.send({message: "Updated Successfully"});
      }
      else{
        res.send({message: "Failed to Update"});
      }
    }
  )
  db.query(
    "UPDATE course_books SET quantity=quantity-1,Borrowed_quantity=Borrowed_quantity+1 WHERE SNo = ?",[SNo],
    (err,result)=>{
      console.log(err);
      console.log(result);
      
      
    }
  )
});


app.put("/regist_delete",(req,res)=>{
  const emai = req.body.email;
  db.query(
    "SELECT * FROM register_table where userid = ?",[emai],
    (err,result)=>{
      console.log(err);
      console.log(result);
      if(!result.length>0){
        res.send({message: "user not exist"});
      }
      else{
        db.query(
          "DELETE FROM register_table where userid = ?",[emai],
          (err,result)=>{
            console.log(err);
            console.log(result);
            res.send({message: "Deleted Successfully"});
          }
        )
      }
    }
  )
});


app.put("/register_update", (req, res) => {
  const id = req.body.userid;
  const user = req.body.user;
  const password = req.body.password;
  const email = req.body.email;
  const original = req.body.password;
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }

    db.query(
      "UPDATE register_table SET user=?,email=?,password=?,original=? WHERE userid=?",
      [user, email, hash,original,id],
      (err, result) => {
        console.log(err);
      }
    );
  });
});

app.put("/books_update", (req, res) => {
  const SNo = req.body.SNo;
  const title = req.body.title;
  const image = req.body.image;
  const description = req.body.description;
  const quantity = req.body.quantity;
    db.query(
      "UPDATE course_books SET title=?,image=?,description=?,quantity=? WHERE SNo=?",
      [title,image,description,quantity,SNo],
      (err, result) => {
        console.log(err);
      }
    );
});
app.put("/rating_update", (req, res) => {
  const userid = req.body.userid;
  const rating = req.body.Rating;
  const rating_description=req.body.rating_description;
  
    db.query(
      "UPDATE register_table SET Rating=?,rating_description=?,feedbackstatus='Submitted' WHERE userid=?",
      [rating,rating_description,userid],
      (err, result) => {
        console.log(err);
      }
    );
    db.query(
      "UPDATE ratinglist SET usercount=usercount+1 WHERE ratingid=?",
      [rating],
      (err, result) => {
        console.log(err);
      }
    );
});

app.put("/rating_reset", (req, res) => {
  const userid = req.body.userid;
  const ratingid=req.body.ratingid;
    db.query(
      "UPDATE register_table SET Rating=NULL,rating_description=NULL,feedbackstatus='Save Feedback' WHERE userid=?",
      [userid],
      (err, result) => {
        console.log(err);
      }
    );
    db.query(
      "UPDATE ratinglist SET usercount=usercount-1 WHERE ratingid=?",
      [ratingid],
      (err, result) => {
        console.log(err);
      }
    );
});

app.post("/register", (req, res) => {
  const user = req.body.user;
  const password = req.body.password;
  const email = req.body.email;
  const original = req.body.password;
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }

    db.query(
      "INSERT INTO register_table (user, email, password,original) VALUES (?,?,?,?)",
      [user, email, hash,original],
      (err, result) => {
        console.log(err);
      }
    );
  });
});

app.put("/user_course", (req, res) => {
  const userid = req.body.userid;
  const bookid = req.body.bookid;
  const user = req.body.user;
  const title = req.body.title;
  const image = req.body.image;
  const description = req.body.description;
  const Status = 'Carted';
  
    db.query(
      "INSERT INTO user_course (userid, SNo,user, title,image,description,Status) VALUES (?,?,?,?,?,?,?)",
      [userid,bookid,user,title,image,description,Status],
      (err, result) => {
        console.log(err);
      }
    )
}
);

app.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});



app.post("/login", (req, res) => {
  const user = req.body.user;
  const password = req.body.password;

  db.query(
    "SELECT * FROM register_table WHERE user = ?;",
    user,
    (err, result) => {
      if (err) {
        res.send({ err: err });
        
      }
      
      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            req.session.user = result;
            console.log(req.session.user);
            res.send(result);
          } else {
            res.send({ message: "Wrong username/password combination!" });
          }
        });
      } else {
        res.send({ message: "User doesn't exist" });
      }
    }
  );
});

app.get('/register_table', (req,res)=>{
  const sql = "SELECT * from register_table";
  db.query(sql,(err,data)=>{
      if(err) return res.json(err);
      return res.json(data);
  })
})
app.get('/most_popular', (req,res)=>{
  const sql = "SELECT * FROM course_books ORDER BY Borrowed_quantity DESC LIMIT 1";
  db.query(sql,(err,data)=>{
      if(err) return res.json(err);
      return res.json(data);
  })
})

app.get('/recently_added', (req,res)=>{
  const sql = "SELECT * FROM course_books ORDER BY SNo DESC LIMIT 1";
  db.query(sql,(err,data)=>{
      if(err) return res.json(err);
      return res.json(data);
  })
})

app.get('/ratinglist', (req,res)=>{
  const sql = "SELECT * from ratinglist ORDER BY category DESC";
  db.query(sql,(err,data)=>{
      if(err) return res.json(err);
      return res.json(data);
  })
})

app.get('/user_course', (req,res)=>{
  
  db.query("SELECT * FROM user_course",(err,data)=>{
      if(err) return res.json(err);
      return res.json(data);
  })
})


app.get('/course_books', (req,res)=>{
  const sql = "SELECT * FROM course_books";
  db.query(sql,(err,data)=>{
      if(err) return res.json(err);
      return res.json(data);
  })
})

app.post("/cour", (req, res) => {
  const title = req.body.title;
  const image = req.body.image;
  const description = req.body.description;
  

    db.query(
      "INSERT INTO course_books (title, image, description) VALUES (?,?,?)",
      [title,image,description],
      (err, result) => {
        console.log(err);
      }
    );
});


app.listen(3002, () => {
  console.log("running server");
});
