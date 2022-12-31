
// import { useEffect } from "react"
import { useState } from "react"
import { useNavigate,Link } from "react-router-dom"
import Axios from "axios"
import "./stlogin.css"
import baseURL from "./routerlink";




function Loginst(){
    const navigate= useNavigate()
    const [satffif, setstaffid]= useState("")
    const [password, setpassword]= useState("")
    const [error, seterror]= useState("")
   
    const handlesubmit=(e)=>{
        e.preventDefault()
        seterror("")
        fetch(baseURL+"/sflogin",{
            method:"POST",
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                s_id: satffif,
                pass: password
              })
            }).then((res)=>res.json())
            .then((data)=>{
                if(data.hasOwnProperty("suc")){
                    localStorage.setItem("token_staff" , data.tok)
                    Axios.get(baseURL+"/isstaffauth",{
                        headers:{
                            "x-access-token_staff": localStorage.getItem("token_staff")
                        }
                    })
                    .then((res)=>{
                        console.log(res.data)
                        if(res.data.hasOwnProperty("auth")){
                            navigate("/sfhome")
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
           
       </nav>
        <div id="main_div">
            <h1  id='box_heading'>Login</h1>
            <div style={{color: "red"}}>{error}</div>
            <form id="form" onSubmit={handlesubmit}>
                <input type="number"   required className='field' placeholder="staff id" onChange={(e)=>setstaffid(e.target.value)} />
                <input type="password" required className='field' placeholder="password" onChange={(e)=>setpassword(e.target.value)} />
                <input type="submit" value="Login" id="button"/>
            </form>
            <div style={{marginTop:"12px"}}><Link to="/sfsignup">Don't have an account? click here</Link></div>
        </div>
    </div>
)}

export default Loginst