const express= require("express")
const app = express()
const bcrypt = require("bcrypt")
const body_parser = require("body-parser")
const mysql = require("mysql2")
require("dotenv").config()





app.use(body_parser.urlencoded({
    extended: true
}));
app.use(require('body-parser').json());



const con = mysql.createConnection(process.env.MYSQL_CON)
con.connect((err) => {
    if (err) throw err;
    else {
        console.log("connected to mysql")
    }
})



app.get("/",(req,res)=>{
    res.sendFile(__dirname +"/signup.html")
})


app.post("/signup", (req, res) => {
    bcrypt.hash(`${req.body.password}`, 10, function (err, hash) {
        if (err) throw err;
        else {
            con.query(`INSERT INTO Students (name,campus_id,password, contact_number) VALUES (?,?,?,?)`,[req.body.name, req.body.campusid,hash,req.body.contact_number], (error, result) => {
                if (error) throw error;
                else {
                    console.log("inserted")
                    res.redirect("\login_page")
                }
            })
        }

            })
    });

app.get("/login_page", (req, res) => {
    res.sendFile(__dirname +"/login.html")
})
    

app.post("/login", (req, res) => {
    console.log("inside herer pls")
    con.query(`SELECT * FROM Students WHERE campus_id = '${req.body.campusid}'`, (err, result) => {
        console.log("hetere")
        if (err) throw err;
        else if (result.length === 0) {
            console.log("inside")
            res.send("incorrect password or password")
            return
        }
        else {
            bcrypt.compare(req.body.password, result[0].password, function (err, results) {
                if (err) throw err;
                if (!results) {
                    console.log("incorrect")
                    res.send("Incorrect email or password")
                    return
                }

                if (results) {

                    res.send("welcome, your password succeeded")
                }
            });
        }
    })
})
    


app.listen(3000, ()=>{
    console.log("server listening on port 3000")
})
