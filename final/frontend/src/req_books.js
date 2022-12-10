import React, { useEffect, useState} from 'react'
import './req_books.css'
import Sfnav from './sfnavsect'


function Booksreq() {
  const [booksinfo, setbooksinfo]= useState("")

  useEffect(()=>{
  console.log("sent")
  fetch("http://localhost:5000/reqbooks_info")
  .then((res)=>res.json())
  .then((data)=>{  
      setbooksinfo(data)
  })
  },[])

  const approval=(e,title,sid)=>{
    booksinfo.map((info)=> {
      const state=e.target.textContent
      console.log(state)
      if (info.book_title === title && info.requested_by === sid){
          fetch(`http://localhost:5000/${state}`, {  
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstParam: title,
            secondParam: sid,
        })}).then((res)=>res.json())
        .then((data)=>{  
        setbooksinfo(data)
      })}
      
    } )
  }

  // const rejection=(title,sid)=>{
  //   booksinfo.map((info)=> {
  //     if (info.book_title === title && info.requested_by === sid){
  //         fetch('http://localhost:5000/rejectbook', {  
  //         method: 'POST',
  //         headers: {
  //           'Accept': 'application/json',
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           firstParam: title,
  //           secondParam: sid,
  //       })}).then((res)=>res.json())
  //       .then((data)=>{  
  //       setbooksinfo(data)
  //     })}
      
  //   } )
  // }

  return (
    <div style={{marginTop:"50px"}}>
    <Sfnav></Sfnav>
      <h1 style={{textAlign: "center"}}>Requested Books list </h1>
        <table id='table'>
            <tr>
              <th>Book Title</th>
              <th>Reuqested by</th>
              <th>Author</th>
              <th>Edition</th>
              <th>Approval</th>
            </tr>
              
              {booksinfo && booksinfo.map((info, key)=>{
                return ( 
                  <tr key={key}>
                    <td>{info.book_title} </td>
                    <td>{info.campus_id} </td>
                    <td>{info.author} </td>
                    <td>{info.edition}</td>
                    <td>{info.status} </td>
                    <td><button onClick={(event)=> approval(event,info.book_title,info.requested_by)}>{info.status ==="confirmed"?"Reject":"Approve"}</button></td>
                    {/* <td><button onClick={()=> rejection(info.book_title,info.requested_by)}>Reject</button></td> */}
                  </tr>
                 )
              })}
             
        </table>
    </div>
    
  )
}

export default Booksreq