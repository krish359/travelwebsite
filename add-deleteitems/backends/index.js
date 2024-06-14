const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

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
    methods: ["GET", "POST"],
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
        res.send({message: "user available"});
      }
    }
  )
});

app.post("/regist_delete",(req,res)=>{
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
        db.query(
          "DELETE FROM register_table where email = ?",[emai],
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
  const sql = "SELECT user, email, original from register_table";
  db.query(sql,(err,data)=>{
      if(err) return res.json(err);
      return res.json(data);
  })
})

app.get('/course_books', (req,res)=>{
  const sql = "SELECT * from course_books";
  db.query(sql,(err,data)=>{
      if(err) return res.json(err);
      return res.json(data);
  })
})

app.get('/course', (req,res)=>{
  const sql = "SELECT * from course_books";
  db.query(sql,(err,data)=>{
      if(err) return res.json(err);
      return res.json(data);
  })
})

app.listen(3002, () => {
  console.log("running server");
});
