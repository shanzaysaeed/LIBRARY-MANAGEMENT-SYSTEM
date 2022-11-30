const express = require("express");
const mysql = require("mysql");

const app = express();
var cors = require('cors');

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "123456",
    database: "library"
});


app.post('/register', (req,res) => {

    const email = req.body.emailS;
    const fname = req.body.name1S;
    const lname = req.body.name2S;
    const password = req.body.passS;


    db.query(
        "INSERT INTO signup (first_name, last_name, password, email) VALUES (?,?,?,?)",
        [fname,lname,password,email],
        (err,result) => {
            console.log(err);
        }
    );
});


app.post('/login', (req,res) => {
     const email = req.body.emailS;
     const password = req.body.passS;


    db.query(
        "SELECT * FROM signup WHERE email = ? AND password = ?",
        [email,password],
        (err,result) => {
            if(err)
            {
              console.log(err);
            }
            if(result)
            {
               res.send(result);

            }
            else{
                res.send({message: "No User Found"});
            }
            
        }
    );
})
app.listen(3006, ()=> {
    console.log("Running at 3006")
});