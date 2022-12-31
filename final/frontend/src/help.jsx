import React from "react";
import axios from 'axios';
import {Link, useNavigate} from "react-router-dom";
// import {useEffect} from 'react';
import {useState} from 'react';
import "./sfnavsect.css"
import baseURL from "./routerlink";


const Help = () => {
    var full_url = document.URL; // Get current url
    var url_array = full_url.split('?') // Split the string into an array with / as separator
    const us_id=url_array[1].split(":")[1]

    const [query, setQuery] = useState({
        query:"", 
        status:"Unresolved"
    });

    const [error,setError] = useState(false)

    const handleChange = (e) =>{
        setQuery(prev=>({...prev, [e.target.name]: e.target.value}))
    };


    const navigate = useNavigate();
    const handleclick=()=>{
        localStorage.removeItem("token_stud");
        navigate("/stlogin")
    }

    const handleClick = async e =>{
        e.preventDefault()
        try{
            const qno = await axios.get(baseURL+"/maxquery");
            await axios.post(baseURL+`/help/${us_id} `+ qno.data.count, query)
            navigate(`/sthome?id:${us_id}`)
        }catch(err){
            console.log(err);
            setError(true)
        }
    }
    function refreshPage() {
        window.location.reload(false);
      }
    // console.log(query)
    return (
        <div style={{marginTop:"50px"}}>
        <div class="dropdown">
            <nav id="navbar-section">
                <h1 id="page-title">Welcome to LMS</h1>
            <div>
                <button class="dropbtn">Dropdown</button>
                <div class="dropdown-content">
                <li><a class="nav_items" onClick={()=>navigate(`/sthome?id:${us_id}`)} href="">Home Page</a></li>
                <li><a href="" onClick={()=>navigate(`/borrowed_books?id:${us_id}`)}>View Isuued Books</a></li>
                <li><a href="" onClick={()=>navigate(`/request?id:${us_id}`)}>Request a Book</a></li>
                <li><a href="" onClick={refreshPage}>Ask for help</a></li>
                <li><a href="" onClick={handleclick}>Log out</a></li>
                </div>
                </div>
            </nav> 
        </div>        <h1 className='head'>Ask for help</h1>
        <div id="main_div">
                <div style={{color: "red"}}>{error}</div>
                <form id="form" >
                    <textarea id="w3review" placeholder="query" name="query" className='field' rows="6" cols="50" maxlength="495" onChange={handleChange}/>
                    <button id="button" className="formButton" onClick={handleClick}>ask</button>
                </form>
                {error && "Something went wrong!"}
                <div style={{marginTop:"12px"}}><Link to={`/sthome?id:${us_id}`}>Home page</Link></div>
            </div>
        </div>
    )
}

export default Help;