import express from "express";
import mysql from "mysql"
import cors from "cors"

const app = express()
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database: "lms"
})

app.use(express.json())
app.use(cors())

app.get("/", (req,res)=>{
    res.json("Hello This is backend")
})

app.get("/books", (req,res)=>{
    const q = 'Select * from books'
    db.query(q,(err,data)=>{
        if(err){
            console.log("No Books in Database")
            return res.json(err)
        }
        return res.json(data)
    })
})

app.get("/books/:col/:search", (req,res)=>{
    const search =  req.params.search
    const col =  req.params.col
    const q = 'Select * from books where ' + col + " = ?" 
    db.query(q, search, (err,data)=>{
        if(err){
            console.log("No Books in Database")
            return res.json(err)
        }
        return res.json(data)
    })
})

app.post("/books", (req,res)=>{
    console.log(req.body)
    const q = "INSERT INTO books Values (?)"
    const values = [
        req.body.id, 
        req.body.title, 
        req.body.released_date, 
        req.body.edition, 
        req.body.author, 
        req.body.cost
    ];
    db.query(q,[values], (err,data)=>{
        if(err){
            console.log("Unable to add Books")
            return res.json(err)
        }
        console.log("Book has been added")
        return res.json("Book has been added Successfully")
    })
})

app.delete("/book/:id", (req, res)=>{
   const bookId =  req.params.id
   const q = "DELETE FROM books WHERE book_id = ?"
    db.query(q, bookId, (err,data)=>{
        if(err){
            console.log("Unable to delete Books")
            return res.json(err)
        }
        console.log("Book has been deleted")
        return res.json("Book has been deleted Successfully")
    })
})

app.put("/books/:id", (req, res) => {
    const bookId = req.params.id;
    
    const q = "UPDATE books SET book_id = ?, title = ?, released_date = ?, edition = ?, author = ? , cost = ? WHERE book_id = ?";
  
    const values = [
        req.body.id, 
        req.body.title, 
        req.body.released_date, 
        req.body.edition, 
        req.body.author, 
        req.body.cost
    ];
  
    db.query(q, [...values,bookId], (err, data) => {
        if(err){
            console.log("Unable to Update Book")
            return res.json(err)
        }
        console.log("Book has been updated")
        return res.json("Book has been updated Successfully")
    })
  });

app.listen(8800, ()=>{
   console.log("Connected to backend")

})