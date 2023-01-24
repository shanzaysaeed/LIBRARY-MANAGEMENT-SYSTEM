const dotenv = require("dotenv");
const mysql = require('mysql2');
const express = require('express');
const bodyParser = require('body-parser')
dotenv.config({path:".env"});
// const { promisify } = require("util");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));

/*
//DO NOT MODIFY ANY PART OF THIS CODE USELESS TOLD TO DO SO.
*/ 
/*Add you connestion details to the env file*/
const connectionString = mysql.createConnection(process.env.MYSQL_CON)
connectionString.connect((err) => {
    if (err) throw err;
    else {
        console.log("connected to mysql")
    }
})


function createTable(CreateQuerry)
{
    console.log(CreateQuerry)
    /*
    The function is responsible for creating tables in your database. Do not modify it.
    */
   return new Promise((resolve, reject)=>{
    connectionString.query(CreateQuerry,
        (err,result)=>
        {
            if(err)
            {
                console.log(err)
                console.log("Table creation failed");
                reject(err);
            }
            else
            {
                console.log("Table created");
                resolve()
                //console.log(result);
            }
        });

   });
}
    


// const createTablePromised = promisify(createTable)

/*
    Here you will be writing your create table queries and storing them in a const variable.
*/

connectionString.connect( (error)=>
{
    if(!error)
    {
        console.log("Connection has been established");
        connectionString.query(`CREATE DATABASE IF NOT EXISTS ${process.env.database}`, async (err2,result) =>
        {
            if(err2)
            {
                console.log(err2);
            }
            else
            {
                console.log("Database Created");
                try{
                    //call create table here using await like done below here.
                    // await createTable(CreateQuerry)
                }
                catch(err)
                {
                    console.log(err)
                }
                
                /*
                Here you will be calling the createTable function to create each table passing the above created 
                variable as a paramter to the function.
                */
               table_query_1= 'CREATE TABLE LMS.Students (campus_id int NOT NULL, name Varchar(100) NOT NULL, password Varchar(255) NOT NULL, contact_number Varchar(100) NOT NULL, total_fine_due int , PRIMARY KEY(campus_id));'
               createTable(table_query_1)
                
                table_query_2='CREATE TABLE LMS.Books (book_id int NOT NULL  AUTO_INCREMENT,title varchar(500) NOT NULL,released_date DATE DEFAULT NULL, edition varchar(50) DEFAULT NULL ,author varchar(100) NOT NULL,cost int DEFAULT NULL, status varchar(50) DEFAULT "available",  PRIMARY KEY (book_id));'
                createTable(table_query_2)

                table_query_3= 'CREATE TABLE LMS.Staff (staff_id int NOT NULL, name Varchar(100) NOT NULL, password Varchar(255) NOT NULL, contact_number Varchar(255) NOT NULL,position varchar(100) NOT NULL, PRIMARY KEY (staff_id));'
                createTable(table_query_3)

                table_query_4= 'CREATE TABLE LMS.Issued_Books (book_id int NOT NULL, student_id int NOT NULL, issued_by int NOT NULL, due_date DATE NOT NULL, FOREIGN KEY (book_id) REFERENCES Books(book_id), FOREIGN KEY (student_id) REFERENCES Students(campus_id), PRIMARY KEY(book_id, student_id),  FOREIGN KEY (issued_by) REFERENCES Staff(staff_id));'
                createTable(table_query_4)

                table_query_5= 'CREATE TABLE LMS.Returned_Books(book_id int NOT NULL, student_id int NOT NULL, issued_by int NOT NULL, due_date DATE NOT NULL, returned_date DATE NOT NULL, FOREIGN KEY (book_id) REFERENCES Books(book_id), FOREIGN KEY (student_id) REFERENCES Students(campus_id), PRIMARY KEY(book_id, student_id),  FOREIGN KEY (issued_by) REFERENCES Staff(staff_id));'
                createTable(table_query_5)

                table_query_6= 'CREATE TABLE LMS.Requested_Books( book_title  Varchar(255) NOT NULL, requested_by int NOT NULL, author Varchar(100) NOT NULL, edition varchar(50) DEFAULT NULL , status Varchar (20), PRIMARY KEY (book_title, requested_by) , FOREIGN KEY (requested_by) REFERENCES Students(campus_id));'
                createTable(table_query_6)

                table_query_7= 'CREATE TABLE LMS.Help (query_no int NOT NULL UNIQUE AUTO_INCREMENT,student_id int NOT NULL,query varchar(500) NOT NULL,status varchar(100) DEFAULT NULL,PRIMARY KEY (query,student_id), FOREIGN KEY(student_id)  REFERENCES Students(campus_id) );'
                createTable(table_query_7)

                connectionString.end();

            }
        });
    }
    else
    {
        console.log("Connection failed");
        console.log(error);
    }
});