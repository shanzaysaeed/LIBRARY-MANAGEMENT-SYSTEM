import React from "react";
import axios from 'axios';
import {Link, useNavigate} from "react-router-dom";
// import {useEffect} from 'react';
import {useState} from 'react';

const Add = () => {
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

    const handleChange = (e) =>{
        setBook(prev=>({...prev, [e.target.name]: e.target.value}))
    };

    const handleClick = async e =>{
        e.preventDefault()
        try{
            await axios.post("http://localhost:8800/books", book)
            navigate("/")
        }catch(err){
            console.log(err);
            setError(true)
        }
    }

    console.log(book)
    return (
        <div className = 'form'>
            <h1>Add New Book</h1>
            <input type="number" placeholder="id" onChange={handleChange} name="id" /> <br />
            <input type="text" placeholder="title" onChange={handleChange} name="title"/> <br />
            <input type="text" placeholder="release date" onChange={handleChange} name="released_date"/> <br />
            <input type="text" placeholder="edition" onChange={handleChange} name="edition"/> <br />
            <input type="text" placeholder="author" onChange={handleChange} name="author"/> <br />
            <input type="number" placeholder="cost" onChange={handleChange} name="cost"/><br />
            <br />
            <button className="formButton" onClick={handleClick}>Add</button>
            {error && "Something went wrong!"}
            <br />
            <Link to="/">See all books</Link>
        </div>
    )
}

export default Add;