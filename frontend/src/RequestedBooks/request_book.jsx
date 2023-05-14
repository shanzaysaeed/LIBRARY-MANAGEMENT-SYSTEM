import React from "react";
import axios from 'axios';
import {Link, useNavigate} from "react-router-dom";
import "../sfnavsect.css"
// import {useEffect} from 'react';
import {useState} from 'react';
import baseURL from "../routerlink";


const Request = () => {
    var full_url = document.URL; // Get current url
    var url_array = full_url.split('?') // Split the string into an array with / as separator
    const us_id=url_array[1].split(":")[1]
    
    const navigate = useNavigate();
    const handleclick=()=>{
        localStorage.removeItem("token_stud");
        navigate("/stlogin")
    }
    
    
    const [book, setBook] = useState({
        title:"", 
        author:"", 
        edition:"", 
        status:"Unapproved"
    });

    const [error,setError] = useState(false)

    const handleChange = (e) =>{
        setBook(prev=>({...prev, [e.target.name]: e.target.value}))
    };

    const handleClick = async e =>{
        e.preventDefault()
        try{
            await axios.post(baseURL+`/requestbook/${us_id}`, book)
            navigate(`/sthome?id:${us_id}`)
        }catch(err){
            console.log(err);
            setError(true)
        }
    }
    function refreshPage() {
        window.location.reload(false);
      }

    // console.log(book)
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
                <li><a href="" onClick= {refreshPage}>Request a Book</a></li>
                <li><a href="" onClick={()=>navigate(`/help?id:${us_id}`)}>Ask for help</a></li>
                <li><a href="" onClick={handleclick}>Log out</a></li>
                </div>
                </div>
            </nav> 
        </div>
        <h1 className='head'>Request Book</h1>
        <div id="main_div">
                {/* <h1  id='box_heading'>Request Book</h1> */}
                <div style={{color: "red"}}>{error}</div>
                    <form id="form">
                        <input type="text" placeholder="title" className="field" onChange={handleChange} name="title" maxlength="252"/> <br />
                        <input type="text" placeholder="author" className="field" onChange={handleChange} name="author" maxlength="98"/> <br />
                        <input type="number" placeholder="edition" className="field" onChange={handleChange} name="edition"/> <br />
                        <button id="button" onClick={handleClick}>Request</button>
                    </form>
                {error && "Something went wrong!"}
                <div style={{marginTop:"12px"}}><Link to={`/sthome?id:${us_id}`}>Home page</Link></div>
            </div>
        </div>
    )
}

export default Request;