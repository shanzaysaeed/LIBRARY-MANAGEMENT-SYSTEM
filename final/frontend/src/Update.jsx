import React from "react";
import axios from 'axios';
import {useNavigate, Link, useLocation} from "react-router-dom";
// import {useEffect} from 'react';
import {useState} from 'react';

const Updatebook = () => {
    const [book, setBook] = useState({
        id:"", 
        title:"", 
        released_date:"", 
        edition:"", 
        author:"", 
        cost:"", 
    });

    const [error,setError] = useState(false)

    const navigate = useNavigate();
    const location = useLocation();
    const bookId = location.pathname.split("/")[2];

    const handleChange = (e) =>{
        setBook(prev=>({...prev, [e.target.name]: e.target.value}))
    };

    const handleClick = async e =>{
        e.preventDefault()
        try{
            await axios.put("http://localhost:5000/updatebook/"+ bookId, book)
            navigate("/sfhome")
        }catch(err){
            console.log(err);
            setError(true);
        }
    }

    console.log(book)
    return (
        <div id="outer_div">
            <nav id="navbar-section">
                <h1 id="page-title">Welcome to LMS</h1>
            </nav>
            <div id="main_div">
                <h1  id='box_heading'>Update Book</h1>
                <div style={{color: "red"}}>{error}</div>
                <form id="form">
                    <input type="number" className='field' placeholder="id" onChange={handleChange} name="id" /> 
                    <input type="text" className='field' placeholder="title" onChange={handleChange} name="title"/> 
                    <input type="text" className='field' placeholder="release date" onChange={handleChange} name="released_date"/> 
                    <input type="text" className='field' placeholder="edition" onChange={handleChange} name="edition"/> 
                    <input type="text" className='field' placeholder="author" onChange={handleChange} name="author"/> 
                    <input type="number" className='field' placeholder="cost" onChange={handleChange} name="cost"/>
                    <button id="button" onClick={handleClick}>Update</button>
                </form>
                {error && "Something went wrong!"}
                <div style={{marginTop:"12px"}}><Link to="/sfhome">See all books</Link></div>
            </div>
        </div>
    )
}

export default Updatebook;