const express = require('express');
const mysql = require('mysql')
const cors = require('cors')
const app = express()
app.use(cors())

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password:'root',
    database:'librar'
})

app.get('/',(re,res)=>{
    return res.json("From Backend Side");
})

app.get('/book_copies', (req,res)=>{
    const sql = "SELECT * FROM book_copies";
    db.query(sql,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.listen(7090,()=>{
    console.log("listening");
})