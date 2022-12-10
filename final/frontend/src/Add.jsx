import React from "react";
import axios from 'axios';
import {Link, useNavigate} from "react-router-dom";
// import {useEffect} from 'react';
import {useState} from 'react';

const Addbook = () => {
    const [book, setBook] = useState({
        id:"", 
        title:"", 
        released_date:"", 
        edition:"", 
        author:"", 
        cost:"", 
        status:"Available"
    });

    const [error,setError] = useState(false)
    const navigate = useNavigate();

    const handleChange = (e) =>{
        setBook(prev=>({...prev, [e.target.name]: e.target.value}))
    };

    const handleClick = async e =>{
        e.preventDefault()
        try{
            await axios.post("http://localhost:5000/addbook", book)
            navigate("/sfhome")
        }catch(err){
            console.log(err);
            setError(true)
        }
    }

    console.log(book)
    return (
        <div id="outer_div">
            <nav id="navbar-section">
                <h1 id="page-title">Welcome to LMS</h1>
            </nav>
            <div id="main_div">
                <h1  id='box_heading'>Add Book</h1>
                <div style={{color: "red"}}>{error}</div>
                <form id="form">
                    <input type="number" placeholder="id" className='field' onChange={handleChange} name="id"/> 
                    <input type="text" placeholder="title" className='field' onChange={handleChange} name="title" maxlength="495"/> 
                    <input type="text" placeholder="release date" className='field' onChange={handleChange} name="released_date"/> 
                    <input type="text" placeholder="edition" className='field' onChange={handleChange} name="edition" maxlength="48" /> 
                    <input type="text" placeholder="author" className='field' onChange={handleChange} name="author" maxlength="98"/> 
                    <input type="number" placeholder="cost" className='field' onChange={handleChange} name="cost" maxlength="48"/>
                    <button id="button" onClick={handleClick}>Add</button>
                </form>
                {error && "Something went wrong!"}
                <div style={{marginTop:"12px"}}><Link to="/sfhome">Home page</Link></div>
            </div>
        </div>
    )
}

export default Addbook;