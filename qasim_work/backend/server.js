const express= require("express")
const app = express()
const cors= require("cors")
const mysql= require("mysql2")
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
dotenv.config({path:".env"});



app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json())
app.use(cors())


const con = mysql.createConnection(process.env.MYSQL_CON)


con.connect((err) => {
    if (err) throw err;
    else {
        console.log("connected to mysql")
    }
})


app.get("/" ,(req,res)=>{
    res.sendFile("/frontend/src/App.js")
})


app.post("/Unresolved",(req,res)=>{
    con.query(`UPDATE Help SET status = 'closed' WHERE student_id=${req.body.firstParam} AND query='${req.body.secondParam}'`, (err,result)=>{
        if(err)
        throw err
        else{
            con.query('select Help.query as query, Students.campus_id as sid, Staff.name as st_name, Help.status as status from Help join Students on Students.student_id= Help.student_id join Staff on Staff.staff_id =  Help.resolved_by ORDER BY query_no DESC;', (err, result2)=>{
                if(err)
                throw err
        
                else{
                    // console.log(result2)
                    res.send(result2)
                }
            })
        }
    })
    
})

app.post("/Resolved",(req,res)=>{
    console.log("here in resolved")
    con.query(`UPDATE Help SET status = 'open' WHERE student_id=${req.body.firstParam} AND query='${req.body.secondParam}'`, (err,result)=>{
        if(err)
        throw err
        else{
            con.query('select Help.query as query, Students.campus_id as sid, Staff.name as st_name, Help.status as status from Help join Students on Students.student_id= Help.student_id join Staff on Staff.staff_id =  Help.resolved_by ORDER BY query_no DESC;', (err, result2)=>{
                if(err)
                throw err
        
                else{
                    // console.log(result2)
                    res.send(result2)
                }
            })
        }
    })

})
app.get("/helpreq", (req,res)=>{
    con.query('select Help.query as query, Students.campus_id as sid, Staff.name as st_name, Help.status as status from Help join Students on Students.student_id= Help.student_id join Staff on Staff.staff_id =  Help.resolved_by ORDER BY query_no DESC;', (err, result)=>{
        if(err)
        throw err
        else{
            res.send(result)
        }
    })
})

app.get("/retbooks_info", (req,res)=>{  
    con.query('SELECT Books.title as title, Students.campus_id as sid, Staff.name as st_name ,Returned_Books.due_date as d_date, Returned_Books.returned_date as  r_date FROM Returned_Books join Books on Books.book_id= Returned_Books.book_id join Students on Students.student_id= Returned_Books.student_id join Staff on Staff.staff_id= Returned_Books.issued_by where 1=1', (err, result)=>{
        if(err)
        throw err

        else{
            res.send(result)
        }
    })
})

app.get("/issbooks_info", (req,res)=>{
    con.query('SELECT Books.title as title, Students.campus_id as sid, Staff.name as st_name,Issued_Books.due_date as d_date FROM Issued_Books join Books on Books.book_id= Issued_Books.book_id join Students on Students.student_id= Issued_Books.student_id join Staff on Staff.staff_id= Issued_Books.issued_by where 1=1', (err, result)=>{
        if(err)
        throw err

        else{
            res.send(result)
        }
    })
})

app.get("/reqbooks_info", (req,res)=>{
    con.query('SELECT * FROM Requested_books JOIN  Students ON Requested_books.requested_by= Students.student_id where 1=1;', (err, result)=>{
        if(err)
        throw err
        else{
            res.send(result)
        }
    })
})

app.post("/Approve",(req,res)=>{
        con.query(`UPDATE Requested_books SET status = 'confirmed' WHERE book_title='${req.body.firstParam}' AND requested_by=${req.body.secondParam}`, (err,result)=>{
            if(err)
            throw err
            else{
                con.query('SELECT * FROM Requested_books JOIN  Students ON Requested_books.requested_by= Students.student_id where 1=1;', (err, result2)=>{
                    if(err)
                    throw err
                    else{
                        res.send(result2)
                    }
                })
            }
        })
})

app.post("/Reject",(req,res)=>{
    con.query(`UPDATE Requested_books SET status = 'cancelled' WHERE book_title='${req.body.firstParam}' AND requested_by=${req.body.secondParam}`, (err,result)=>{
        if(err)
        throw err
        else{   
            con.query('SELECT * FROM Requested_books JOIN  Students ON Requested_books.requested_by= Students.student_id where 1=1;', (err, result2)=>{
                if(err)
                throw err
        
                else{
                    res.send(result2)
                }
            })
        }
    })
})


app.post("/register",(req,res)=>{
    console.log(req.body)
    res.send("hello peter")

})



app.listen(5000, ()=>{
    console.log("server listening on port 5000")
})
