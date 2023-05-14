import React, { useEffect, useState} from 'react'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../StudentSignup/stsignup.css"
import baseURL from "../routerlink";


function Signupsf() {

  const navigate = useNavigate();
  const [username, setusername]= useState("")
  const [position, setposition]= useState("Librarian")
  const [contact, setcontact]  = useState("")
  const [staffid, setstaffid]  = useState("")
  const [password, setpassword]= useState("")
  const [error, seterror]= useState("")
  

  const handlesubmit=(e)=>{
    e.preventDefault()

    seterror("")

    fetch(baseURL+`/sfsignup`,{
      method: "POST",
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify({
        u_name: username,
        pos: position,
        c_num: contact,
        pass: password,
        s_id: staffid
      })
    })
    .then((res)=>res.json())  
    .then((data)=>{  
      if(data.hasOwnProperty('suc')){
        navigate("/sflogin");
      }
      else{
        console.log(data)
        seterror(data.err) 
      }     
  })

  }

  return (
    <div id="outer_div" >
     <nav id="navbar-section">
        <h1 id="page-title">Welcome to LMS</h1>
        <a style={{textDecoration: "none", color:"white"}} onClick={()=>{navigate("/")}} >Change Status</a>

    </nav>

    <div id="main_div">
        <h1 id='box_heading'>  Signup</h1>
        <div style={{color: "red"}} >{error}</div>
        <form id="form" onSubmit={handlesubmit}>
            <input type="text"     required onChange={(e)=>setusername(e.target.value)} className='field' placeholder=  "name" />
            <input type="number"   required onChange={(e)=>setstaffid(e.target.value)}  className='field' placeholder=  "staff id"/>
            <input type="number"   required onChange={(e)=>setcontact(e.target.value)}  className='field' placeholder=  "contact"  />
            <input type="password" required onChange={(e)=>setpassword(e.target.value)} className='field' placeholder=  "password" />
            <div style={{marginTop:"8px"}}>
                <label style={{color:"grey", fontSize:"14px"}} htmlFor="">Choose a position: </label>
                <select name="" id="" onClick={(e)=>setposition(e.target.value)}>
                    <option value="Librarain">Librarian</option>
                    <option value="Book Attendent">Book Attendent</option>
                </select>
            </div>
            <input style={{marginTop:"16px"}} type="submit" value="Signup" id="button"  name="signup"/>
        </form>
         <div style={{marginTop:"12px"}}><Link to="/sflogin">Already have an account?</Link></div>
    </div>
    </div>
  )
}
export default Signupsf