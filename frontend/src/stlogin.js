import { useState } from "react"
import { useNavigate,Link } from "react-router-dom"
import  Axios  from "axios"
import baseURL from "./routerlink";

import "./stlogin.css"

function Loginst(){
    const navigate= useNavigate()
    const [campusid, setcampusid]= useState("")
    const [password, setpassword]= useState("")
    const [error, seterror]= useState("")
    

    const handlesubmit=(e)=>{
        e.preventDefault()
        seterror("")
        fetch(baseURL+"/stlogin",{
            method:"POST",
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                c_id: campusid,
                pass: password
              })
            }).then((res)=>res.json())
            .then((data)=>{
                if(data.hasOwnProperty("suc")){
                    localStorage.setItem("token_stud", data.tok)
                    const userid= data.id
                    Axios.post(baseURL+"/isstdauth",{
                        "jwt_token_std":localStorage.getItem("token_stud")
                    })
                    .then((res)=>{
                        console.log(res.data)
                        if(res.data.hasOwnProperty("auth")){
                            navigate(`/sthome?id:${userid}`)
                            // window.location.href = window.location.href;
                            // location.reload()
                            window.location.reload()
                        }
                    })
                }
                else{
                    seterror("Invalid email or password") 
                }
            })
    }
    return(
    <div id="outer_div" >
        <nav id="navbar-section">
           <h1 id="page-title">Welcome to LMS</h1>
           <a style={{textDecoration: "none", color:"white"}}  href="" onClick={()=>{navigate("/")}} >Change Status</a>
       </nav>
        <div id="main_div">
            <h1  id='box_heading'>Login</h1>
            <div style={{color: "red"}}>{error}</div>
            <form id="form" onSubmit={handlesubmit}>
                <input type="number"   required className='field' placeholder="campusid" onChange={(e)=>setcampusid(e.target.value)} />
                <input type="password" required className='field' placeholder="password" onChange={(e)=>setpassword(e.target.value)} />
                <input type="submit" value="Login" id="button"/>
            </form>
            <div style={{marginTop:"12px"}}><Link to="/stsignup">Don't have an account? click here</Link></div>
        </div>
    </div>
)}

export default Loginst