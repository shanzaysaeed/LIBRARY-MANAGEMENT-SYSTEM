import React, { useEffect, useState} from 'react'
import './issued_books.css'
import Sfnav from './sfnavsect'


function Booksiss() {
  const [booksinfo, setbooksinfo]= useState("")
  useEffect(()=>{
  console.log("sent")
  fetch("http://localhost:5000/issbooks_info")
  .then((res)=>res.json())
  .then((data)=>{  
      setbooksinfo(data)
  })
  },[])
  return (
    <div style={{marginTop:"50px"}}>
    <Sfnav></Sfnav>
      <h1 style={{textAlign: "center"}}>Issued Books list </h1>
        <table id='table'>
            <tr>
              <th>Book Title</th>
              <th>Issued to</th>
              <th>Issued by</th>
              <th>Due Date</th>
            </tr>
              
              {booksinfo && booksinfo.map((info, key)=>{
                return ( 
                  <tr key={key}>
                    <td>{info.title} </td>
                    <td>{info.sid} </td>
                    <td>{info.st_name} </td>
                    <td>{info.d_date}</td>
                  </tr>
                 )
              })}
        </table>
    </div>
  )
}
export default Booksiss