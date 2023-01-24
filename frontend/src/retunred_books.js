import React, { useEffect, useState} from 'react'
import './returned_books.css'
import Sfnav from './sfnavsect'
import baseURL from "./routerlink";



function Booksret() {

 
  const [booksinfo, setbooksinfo]= useState("")

  useEffect(()=>{
  console.log("sent")
  fetch(baseURL+"/retbooks_info")
  .then((res)=>res.json())
  .then((data)=>{  
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear()
    today = yyyy + '-' + mm + '-' + dd;
    console.log(today)
    let temp_data= data.filter((obj)=>{
        console.log(obj)
        console.log(today)
        if(obj.r_date === today){   
            return true
        }
        else{
            return false
        }
    })
      setbooksinfo(temp_data)
  })
  },[])
  return (
    <div style={{marginTop:"50px"}}>
    <Sfnav></Sfnav>
      <h1 style={{textAlign: "center"}}>List of Books Returned today  </h1>
        <table id='table'>
            <tr>
              <th>Book Title</th>
              <th>Issued to</th>
              <th>Issued by</th>
              <th>Due Date</th>
              <th>Returned Date</th>
            </tr>
              
              {booksinfo && booksinfo.map((info, key)=>{
                return ( 
                  <tr key={key}>
                    <td>{info.title} </td>
                    <td>{info.sid} </td>
                    <td>{info.st_name} </td>
                    <td>{info.d_date}</td>
                    <td>{info.r_date} </td>
                  </tr>
                 )
              })}
             
        </table>
    </div>
    
  )
}

export default Booksret