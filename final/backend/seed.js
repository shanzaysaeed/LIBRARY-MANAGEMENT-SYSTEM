const dotenv = require("dotenv");
const mysql = require('mysql2');
const express = require('express');
const bodyParser = require('body-parser')
const fs = require('fs');
const csv = require('csv-parser');
dotenv.config({path:".env"});
var app = express();
app.use(bodyParser.urlencoded({extended:true}));

// var connectionString = mysql.createConnection(
//     {
//         MYSQL_CON
//     }
// );
const connectionString = mysql.createConnection(process.env.MYSQL_CON)


async function reader(file)
{
    const results = [];
    return new Promise(function(resolve,reject){
        fs.createReadStream(file).pipe(csv()).on('data', (data) => results.push(data)).on('end', () => {
            resolve(results)
        })
    });
    
}

function seedData(query)
{
    /*
    Call this fuction to  insert a record into your db to the respective table using 
    the query.The variable query corresponds to the sql query you will write to accomplish this. 
     */
    connectionString.query(query,
    (err2,result)=>
    {
        if(err2)
        {
            console.log("Seeding Failed");
            console.log(err2);
        }
        else
        {
            console.log("Seeding done");
        }
     });
}

connectionString.connect(async (err)=>
{
    if(err)
    {
        console.log(err);
    }
    else
    {
        // let file_data = await reader('MOCK_DATA.csv')
        let file_data = await reader('data2.csv')
       
        for (let i = 0; i < file_data.length; i++) 
        {
            let element = file_data[i]
            for (const key in element) 
            {
                if (key == 'cost')
                {
                    if (element[key] == "")
                    {
                        element[key] = 1000;
                    }

                }
                if (key == 'released_date'){
                    let d = element[key].split("/")
                    element[key] = d[2] + "-" + d[0] + "-" + d[1]
                    element[key] = `'${element[key]}'`
                }
                else
                {
                    element[key] = `"${element[key]}"` ;
                }
            }
        }

        let query = "INSERT INTO Books VALUES "

        for (let i = 0; i < 15000; i++) 
        {
            let element = file_data[i]

            query += `(${element['book_id']}, ${element['title']}, ${element['released_date']}, 
                ${element['edition']}, ${element['author']}, ${element['cost']}, ${element['status']}), `

        }
        query = query.slice(0, -2)
        await seedData(query);



        
        connectionString.end();
    }
});