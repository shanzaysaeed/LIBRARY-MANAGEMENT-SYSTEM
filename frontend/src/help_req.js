import React, { useEffect, useState} from 'react'
import './issued_books.css'

function Helpreq() {
  const [booksinfo, setbooksinfo]= useState("")
  useEffect(()=>{
  console.log("sent")
  fetch("http://localhost:5000/helpreq")
  .then((res)=>res.json())
  .then((data)=>{  
      setbooksinfo(data)
  })
  },[])
  const resolved=(e,sid,query)=>{
    const state=e.target.textContent
    console.log(state)
    booksinfo.map((info)=> {
      if (info.sid === sid && info.query === query){
          fetch(`http://localhost:5000/${state}`, {  
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstParam: sid,
            secondParam: query,
        })}).then((res)=>res.json())
        .then((data)=>{  
        setbooksinfo(data)
      })}
      
    })
  }
  return (
    <div>
      <h1 style={{textAlign: "center"}}>Help Requests</h1>
        <table id='table'>
            <tr>
              <th>Student </th>
              <th>Resolved by</th>
              <th>Query</th>
              <th>Status</th>
            </tr>
              
              {booksinfo && booksinfo.map((info, key)=>{
                return ( 
                  <tr key={key}>
                    <td>{info.sid} </td>
                    <td>{info.st_name} </td>
                    <td>{info.query} </td>
                    <td>{info.status}</td>
                    <td><button onClick={(event)=> resolved(event,info.sid,info.query)}>{info.status ==="closed"?"Resolved":"Unresolved"}</button></td>
                  </tr>
                 )
              })}
        </table>
    </div>
  )
}
export default Helpreq