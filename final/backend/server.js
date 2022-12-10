const cookieSession = require('cookie-session')
const express= require("express")
const app = express()
// const cors= require("cors")
const mysql= require("mysql2")
const dotenv = require("dotenv");
const bcrypt = require("bcrypt")
const cookieParser= require("cookie-parser")
// const expressSession= require("express-session")
const bodyParser = require('body-parser');
// const { json } = require("body-parser");
const jwt= require("jsonwebtoken");
// const { decode } = require("punycode");
// const session = require("express-session");
dotenv.config({path:".env"});


app.use(express.json())
// var  corsOptions  = {
//     origin: 'http://localhost:3000', //frontend url
//     credentials: true}

    // app.use(cookieParser)
// app.use(cookieParser())
// app.use(cors(corsOptions))


app.use(bodyParser.urlencoded({extended:true}));
app.use(require('body-parser').json());


// app.use(cookieSession({
//     name: 'session',
//     keys: [process.env.SESSION_KEY],
//     maxAge: 168 * 60 * 60 * 1000 // 1 week
// }))


const con = mysql.createConnection(process.env.MYSQL_CON)

// const authenticateMiddleware = (req, res, next) => {
//     if (req.session.hasOwnProperty("user_id")) {
//         next()
//     }
//     else res.send("Access Denied")
// }
const cors = require('cors');
const e = require('express');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));


con.connect((err) => {
    if (err) throw err;
    else {
        console.log("connected to mysql")
    }
})




// const sess = {
//     username: '',
//     password: ''
// 


const verifyjwt_staff= (req,res, next)=>{
    const token_staff = req.headers["x-access-token_staff"]
    console.log("here")
    if(!token_staff){
        res.json({msg:"token required"})
    }
    else{
        jwt.verify(token_staff, process.env.SESSION_KEY, (err,decode)=>{
            if(err){
                res.json({msg:"not verified"})
            }
            else{
                console.log("yaha")
                req.userid =decode.id
                next()
            }
        })
    }
}
const verifyjwt_std=(req,res, next)=>{
    const token_std= req.headers["x-access-token_std"]
    if(!token_std){
        res.json({msg:"token required"})
    }
    else{
        jwt.verify(token_std, process.env.SESSION_KEY,(err,decode)=>{
            if(err){
                res.json({msg: "not verified"})
            }
            else{
                
                req.std_id= decode.student_id
                console.log("verify ", 2)
                next()
            }
        })
    }

}

app.get("/isstaffauth",verifyjwt_staff,(req,res)=>{
    // console.log("sending")
    res.json({auth:"yes"})
})

app.get("/isstdauth",verifyjwt_std, (req,res)=>{
    console.log("student sending")
    res.json({auth:"yes"})

})


app.post("/sfsignup",(req,res)=>{
    // console.log(req.body)
    bcrypt.hash(`${req.body.pass}`, 10, (err, hash)=>{
        if(err) throw err
        else{
            con.query("INSERT INTO Staff (name, staff_id, password, contact_number, position) VALUES(?,?,?,?,?)", [req.body.u_name, req.body.s_id, hash,req.body.c_num, req.body.pos],(error, result)=>{
                if(error){
                    res.json({err:"staff already exist"})
                    throw error
                }
                else{
                    console.log("suucea")
                    res.json({suc: "success"})
                }
            })
        }

    })
    
})

app.post("/sflogin", (req,res)=>{
    con.query(`SELECT * FROM Staff WHERE staff_id = '${req.body.s_id}'`, (err, result) => {
        if (err) throw err;
        else if (result.length === 0) {
            res.json({err: "invalid"})
        }
        else {
            bcrypt.compare(req.body.pass, result[0].password, function (err, results) {
                if (err) throw err;
                if (!results) {
                    res.json({err: "invalid"})
                }
                if (results) {
                    // 2 = req.body.s_id
                    // sess.password = req.body.pass

                    // console.log(result)
                    const id= result[0].staff_id
                    console.log(id)
                    const token_staff = jwt.sign({id}, process.env.SESSION_KEY,{
                        expiresIn: 86400,
                    })


                    res.json({tok: token_staff ,suc: "success"})
                }

            });
        }
    })
})
app.post("/stsignup", (req, res) => {
    bcrypt.hash(`${req.body.pass}`, 10, function (err, hash) {
        if (err) throw err;
        else {
            con.query(`INSERT INTO Students (name,campus_id,password, contact_number) VALUES (?,?,?,?)`,[req.body.u_name, req.body.c_id,  hash,  req.body.c_num], (error, result) => {
                if (error){
               
                    res.json({err: "Student alreaday exist"})
                }
                else {
                    res.json({suc: "success"})
            
                }
            })
        }})
    });

app.post("/stlogin", (req, res) => {
    console.log(req.body)
    con.query(`SELECT * FROM Students WHERE campus_id = '${req.body.c_id}'`, (err, result) => {
        if (err) throw err;
        else if (result.length === 0) {
            res.json({err: "invalid"})
        }
        else {
            bcrypt.compare(req.body.pass, result[0].password, function (err, results) {
                if (err) throw err;
                if (!results) {
                    res.json({err: "invalid"})
                }
                if (results) {
                    const student_id= result[0].campus_id
                    // console.log(student_id)
                    const token_student= jwt.sign({student_id},process.env.SESSION_KEY,{
                        expiresIn: 86400,
                    })
                    res.json({tok: token_student,  suc: "success",id: result[0].campus_id})
                }
            });
        }
    })
})

app.post("/Unresolved",(req,res)=>{
    con.query(`UPDATE Help SET status = 'closed' WHERE student_id=${req.body.firstParam} AND query='${req.body.secondParam}'`, (err,result)=>{
        if(err)
        throw err
        else{
            con.query('select Help.query as query, Students.campus_id as sid, Help.status as status from Help join Students on Students.campus_id= Help.student_id  ORDER BY query_no DESC;', (err, result2)=>{
                if(err)
                throw err
                else{
                    res.send(result2)
                }
            })
        }
    })
    
})

app.post("/Resolved",(req,res)=>{
    con.query(`UPDATE Help SET status = 'open' WHERE student_id=${req.body.firstParam} AND query='${req.body.secondParam}'`, (err,result)=>{
        if(err)
        throw err
        else{
            console.log("paassed")
            con.query('select Help.query as query, Students.campus_id as sid, Help.status as status from Help join Students on Students.campus_id= Help.student_id ORDER BY query_no DESC;', (err, result2)=>{
                if(err)
                throw err
                else{
                    res.send(result2)
                }
            })
        }
    })
})
app.get("/helpreq", (req,res)=>{
    con.query('select Help.query as query, Students.campus_id as sid, Help.status as status from Help join Students on Students.campus_id= Help.student_id  ORDER BY query_no DESC;', (err, result)=>{
        if(err)
        throw err
        else{
            console.log(result)
            res.send(result)
        }
    })
})

app.get("/retbooks_info", (req,res)=>{  
    con.query('SELECT Books.title as title, Students.campus_id as sid, Staff.name as st_name ,Returned_Books.due_date as d_date, Returned_Books.returned_date as  r_date FROM Returned_Books join Books on Books.book_id= Returned_Books.book_id join Students on Students.campus_id= Returned_Books.student_id join Staff on Staff.staff_id= Returned_Books.issued_by where 1=1', (err, result)=>{
        if(err)
        throw err

        else{
            res.send(result)
        }
    })
})

app.get("/issbooks_info", (req,res)=>{
    con.query('SELECT Books.title as title, Students.campus_id as sid, Staff.name as st_name,Issued_Books.due_date as d_date FROM Issued_Books join Books on Books.book_id= Issued_Books.book_id join Students on Students.campus_id= Issued_Books.student_id join Staff on Staff.staff_id= Issued_Books.issued_by where 1=1', (err, result)=>{
        if(err)
        throw err

        else{
            res.send(result)
        }
    })
})

app.get("/reqbooks_info", (req,res)=>{
    con.query('SELECT * FROM Requested_Books JOIN  Students ON Requested_Books.requested_by= Students.campus_id where 1=1;', (err, result)=>{
        if(err)
        throw err
        else{
            res.send(result)
        }
    })
})

app.post("/Approve",(req,res)=>{
        con.query(`UPDATE Requested_Books SET status = 'confirmed' WHERE book_title='${req.body.firstParam}' AND requested_by=${req.body.secondParam}`, (err,result)=>{
            if(err)
            throw err
            else{
                con.query('SELECT * FROM Requested_Books JOIN  Students ON Requested_Books.requested_by= Students.campus_id where 1=1;', (err, result2)=>{
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
    con.query(`UPDATE Requested_Books SET status = 'cancelled' WHERE book_title='${req.body.firstParam}' AND requested_by=${req.body.secondParam}`, (err,result)=>{
        if(err)
        throw err
        else{   
            con.query('SELECT * FROM Requested_Books JOIN  Students ON Requested_Books.requested_by= Students.campus_id where 1=1;', (err, result2)=>{
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

// Staff Use Cases
app.delete("/delbook/:id", (req, res)=>{
    const bookId =  req.params.id
    const q = "DELETE FROM Books WHERE book_id = ?"
     con.query(q, bookId, (err,data)=>{
         if(err){
             console.log("Unable to delete Books")
            // res.json(err)
         }
         else{
            console.log("Book has been deleted")
            res.json("Book has been deleted Successfully")
         }
         
     })
 })


 app.get("/books", (req,res)=>{
    const q = 'select * from Books LIMIT 10'
    con.query(q,(err,data)=>{
        if(err){
            console.log("No Books in Database")
        }
        else{
            res.json(data)
        }
    })
})

 app.get("/searchbook/:col/:search", (req,res)=>{
    const search =  req.params.search
    let col = 'title'

    if ((req.params.col).toLowerCase() != 'search by'){
        col =  (req.params.col).toLowerCase()
    }

    const q = `select * from Books where  ${col}  like  '${search}%' LIMIT 10`
    console.log(q)
    con.query(q, (err,data)=>{
        if(err){
            console.log("No Books in Database")
            throw err
        }
        else{
            res.json(data)
        }
    })
})

 app.post("/addbook", (req,res)=>{
    // console.log(req.body)
    const q = "INSERT INTO Books Values (?)"
    const values = [
        req.body.id, 
        req.body.title, 
        req.body.released_date, 
        req.body.edition, 
        req.body.author, 
        req.body.cost,
        req.body.status = "Available"
    ];
    con.query(q,[values], (err,data)=>{
        if(err){
            console.log("Unable to add Books")
            res.json(err)
        }
        else{
            console.log("Book has been added")
            res.json("Book has been added Successfully")
        }
        
    })
})

app.put("/updatebook/:id", (req, res) => {
    const bookId = req.params.id;
    
    const q = "UPDATE Books SET book_id = ?, title = ?, released_date = ?, edition = ?, author = ? , cost = ? WHERE book_id = ?";
  
    const values = [
        req.body.id, 
        req.body.title, 
        req.body.released_date, 
        req.body.edition, 
        req.body.author, 
        req.body.cost,
    ];
  
    con.query(q, [...values,bookId], (err, data) => {
        if(err){
            console.log("Unable to Update Book")
            // return res.json(err)
        }
        else{
            console.log("Book has been updated")
        res.json("Book has been updated Successfully")
        }
        
    })
  });

// Student Use Cases
// app.get("/books", (req,res)=>{
//     const q = 'Select * from Books'
//     con.query(q,(err,data)=>{
//         if(err){
//             console.log("No Books in Database")
//             // return res.json(err)
//             // return
//         }
//         res.json(data)
//     })
// })

app.get("/borrowedbooks/:id", (req,res)=>{
    console.log('here')
    var par= req.params.id
    const q = 'SELECT * FROM Issued_Books natural join Books where student_id = ?' 
    // change here
    con.query(q,par,(err,data)=>{
        if(err){
            console.log("No Books in Database")
            // return res.json(err)
        }
        else{
            res.json(data)

        }
    })
})

app.get("/getlib", (req,res)=>{
    const q = 'select * from Staff where position = "Librarian"'
    con.query(q,(err,data)=>{
        if(err){
            console.log("No Books in Database")
            // return res.json(err)
        }
        else{
            res.json(data[0])

        }
    })
})

app.post("/issuebook/:id", (req,res)=>{
    console.log("params",req.params)
    var par= req.params.id
    par= par.split(" ")
    const lib_id = par[1];
    // console.log(lib_id)


    var due_date = new Date(Date.now() + 12096e5);
    var due_date = due_date.toISOString().slice(0,10);
    
    const q = "INSERT INTO Issued_Books Values (?)"
    console.log("hehet", 2)
    
    const values = [
        req.body.book_id, 
        par[0],
        lib_id,
        due_date, 
    ];
    console.log(q,[values])
    con.query(q,[values], (err,data)=>{
        if(err){
            console.log("Unable to issue Books")
            // return res.json(err)
        }
        else{
            console.log("Book has been issued")
         res.json("Book has been issued Successfully")

        }
        
    })
})

app.put("/setfine/:date", (req,res)=>{
    // console.log('fine')
    console.log("params",req.params)
    var par= req.params.date
    par= par.split(" ")


    var due_date = new Date(par[1]);
    var fine = 0
    var current_date = new Date(Date.now());
    // console.log(current_date)
    // console.log(due_date)
    var y_diff = current_date.getFullYear()- due_date.getFullYear()
    if (y_diff >1){
        var m_diff = current_date.getMonth() - due_date.getMonth();
        if (m_diff >=0){
            day_diff = current_date.getDate() - due_date.getDate() 
            if (day_diff >= 0){
                fine = (day_diff + (m_diff*30) + (y_diff*365)) * 1000
            }
        }
    }
    else if (y_diff >= 0){
        var m_diff = current_date.getMonth() - due_date.getMonth();
        if (m_diff >=0){
            day_diff = current_date.getDate() - due_date.getDate() 
            if (day_diff >= 0){
                fine = (day_diff + (m_diff*30)) * 1000
            }
        }
    }
    // console.log(fine)

    const q = "UPDATE Students SET total_fine_due = total_fine_due + ? WHERE campus_id = ?";
  
    // change here  
    con.query(q, [fine, par[0]], (err, data) => {
        if(err){
            console.log("Unable to Update fine")
            // return res.json(err)
        }
        else{
            console.log("fine has been updated")
        res.json("fine has been updated Successfully")

        }
        
    })
})

app.post("/returnbook/:id/", (req,res)=>{
    console.log("params",req.params)
    var par= req.params.id
    par= par.split(" ")

    const lib_id = par[1];
    let current_date = new Date(Date.now()).toISOString().slice(0,10);
    let due_date = new Date(req.body.due_date).toISOString().slice(0,10);

    const q = "INSERT INTO Returned_Books Values (?)"

    const values = [
        req.body.book_id, 
        par[0],
        lib_id,
        due_date,
        current_date,
    ];
    con.query(q,[values], (err,data)=>{
        if(err){
            if(err.code === "ER_DUP_ENTRY"){
                res.json("Book has been returned Successfully")
            }
            else{
                console.log("Unable to return Books")
            }
        }
        else{
            console.log("Book has been returned")
            res.json("Book has been returned Successfully")
        }
        
    })
})

app.delete("/book/:id", (req, res)=>{
    console.log("params",req.params)
    var par= req.params.id
    par= par.split(" ")

    const bookId =  par[1]
    const q = "DELETE FROM Issued_Books WHERE book_id = ? and student_id = ?"

    // chnage here
    con.query(q, [bookId,par[0]], (err,data)=>{
        if(err){
            console.log("Unable to return Books")
            // return res.json(err)
        }
        else{
        console.log("Book has been returned")
        res.json("Book has been return Successfully")

        }
        
    })
})


app.put("/updateStatus/:id", (req, res) => {
    const bookId = req.params.id;
    
    const q = "UPDATE Books SET status = ? WHERE book_id = ?";
  
    const values = [
        "Unavailable"
    ];
  
    con.query(q, [...values,bookId], (err, data) => {
        if(err){
            console.log("Unable to Update Book")
            // return res.json(err)
        }
        else{
            console.log("Book has been updated")
         res.json("Book has been updated Successfully")

        }
        
    })
});

app.put("/revertStatus/:id", (req, res) => {
    const bookId = req.params.id;
    console.log(bookId)
    const q = "UPDATE Books SET status = ? WHERE book_id = ?";
  
    const values = [
        "Available"
    ];
  
    con.query(q, [...values,bookId], (err, data) => {
        if(err){
            console.log("Unable to Update Book")
            //  res.json(err)
        }
        else{
            console.log("Book has been updated")
            res.json("Book has been updated Successfully")
        }
        
    })
});


app.get("/getduedate/:id", (req,res)=>{
    console.log("params",req.params)
    var par= req.params.id
    par= par.split(" ")
    // const lib_id = par[1];
    const bookId = par[1];
    const q = 'select due_date from Issued_Books natural join Books where student_id = ? and book_id = ?'
    // change here
    con.query(q,[par[0],bookId],(err,data)=>{
        if(err){
            console.log("No Books in Database")
            // return res.json(err)
        }
        else{
         res.json(data[0])

        }
    })
})

app.put("/Renew/:id", (req, res) => {
    // const bookId = req.params.id;
    console.log("params",req.params)
    var par= req.params.id
    par= par.split(" ")
    const bookId=par[1]
    // UPDATE issued_books natural join books set title = "New Title" where book_id = 1
    const q = "UPDATE Issued_Books natural join Books SET due_date = ? WHERE book_id = ? and student_id = ?";
    old_date = Date.parse(req.body.due_date)
    new_date = new Date(old_date + 12096e5)
    new_date = new_date.toISOString().slice(0,10);
    console.log(new_date)
    // change here
    const values = [
        new_date,
        bookId,
        par[0]
    ];

  
    con.query(q, [...values,bookId], (err, data) => {
        if(err){
            console.log("Unable to Update due date")
            // return res.json(err)
        }
        // console.log(data)
        else{
        console.log("due date has been updated")
        res.json("due date has been updated Successfully")

        }
        
    })
});

app.post("/requestbook/:id", (req,res)=>{
    const q = "INSERT INTO Requested_Books Values (?)"
    console.log(req.params.id)

    const values = [
        req.body.title, 
        req.params.id,
        // 123,
        req.body.author, 
        req.body.edition, 
        req.body.status, 
    ];

    console.log(q,values)
    con.query(q,[values], (err,data)=>{
        if(err){
            console.log("Unable to request Books")
            //  res.json(err)
        }
        else{
            console.log("Book has been requested")
            res.json("Book has been requested Successfully")
        }
       
    })
})


app.get("/maxquery", (req,res)=>{
    const q = 'select count(query_no) as count from Help'
    con.query(q,(err,data)=>{
        if(err){
            console.log("No query in Database")
            // return res.json(err)
        }
        else{
            res.json(data[0])
        }
        
    })
})


app.post("/help/:qno", (req,res)=>{
    console.log("params",req.params)
    var par= req.params.qno
    par= par.split(" ")
    let qno = par[1];
    qno+= 1
    if (qno == null){
        qno = 0
    }
    const q = "INSERT INTO Help values (?)"

    const values = [
        qno, 
        par[0],
        req.body.query, 
        req.body.status, 
    ]
    console.log(q, [values])
    con.query(q,[values], (err,data)=>{
        if(err){
            console.log("Unable to request help")
            // return res.json(err)
        }
        else{
            console.log("help has been requested")
            res.json("help has been requested Successfully")
        }
       
    })
})


app.listen(5000, ()=>{
    console.log("server listening on port 5000")
})
