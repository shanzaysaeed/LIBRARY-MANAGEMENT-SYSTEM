import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./stsignup.css"
import baseURL from "../routerlink";



function Signupst() {

  const navigate = useNavigate();
  const [username, setusername]= useState("")
  const [campusid, setcampusid]= useState("")
  const [contact,  setcontact]  = useState("")
  const [password, setpassword]= useState("")
  const [error, seterror]= useState("")
  

  const handlesubmit=(e)=>{
    e.preventDefault()

    seterror("")

    fetch(baseURL+`/stsignup`,{
      method: "POST",
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify({
        u_name: username,
        c_id: campusid,
        c_num: contact,
        pass: password
      })
    })
    .then((res)=>res.json())  
    .then((data)=>{  
      if(data.hasOwnProperty('suc')){
        navigate("/stlogin");
      }
      else{
        seterror(data.err) 
      }     
  })

  }

  return (
    <div id="outer_div" >
     <nav id="navbar-section">
        <h1 id="page-title">Welcome to LMS</h1>
        <a style={{textDecoration: "none", color:"white"}}  href="" onClick={()=>{navigate("/")}} >Change Status</a>
    </nav>

    <div id="main_div">
        <h1 id='box_heading'>  Signup</h1>
        <div style={{color: "red"}} >{error}</div>
        <form id="form" onSubmit={handlesubmit}>
            <input type="text"     required onChange={(e)=>setusername(e.target.value)} className='field' placeholder=  "username" />
            <input type="number"   required onChange={(e)=>setcampusid(e.target.value)} className='field' placeholder=  "campus id"/>
            <input type="number"   required onChange={(e)=>setcontact(e.target.value)} className='field'  placeholder=   "contact"  />
            <input type="password" required onChange={(e)=>setpassword(e.target.value)} className='field' placeholder=  "password" />
            <input type="submit" value="Signup" id="button"  name="signup"/>
        </form>
         <div style={{marginTop:"12px"}}><Link to="/stlogin">Already have an account?</Link></div>
    </div>
    </div>
  )
}
export default Signupst