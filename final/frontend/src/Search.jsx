import React from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import {useEffect} from 'react';
import {useState} from 'react';
import baseURL from "./routerlink";

// import Add from "./pages/Add";

const Search = () => {
    const [books, setBooks] = useState([])
    useEffect(()=>{
        // console.log("here0")
        const fetchAllBooks = async()=>{
            // console.log("here1")
            try{
                // console.log("here2")
                const res = await axios.get(baseURL+"/books")
                setBooks(res.data)
            }catch(err){
                // console.log("here3")
                console.log(err)
            }
        }
        // console.log("here4")
        fetchAllBooks()
    },[])

    const handleDelete = async (id)=>{
        try{
            await axios.delete(baseURL+"/book/"+id)
            window.location.reload()
        }catch(err){
            console.log(err)
        }
    }

    return (
        <div>
            <h1>Library Management System</h1>
            <div className="title">
                <p>Book Id</p>
                <p>Title</p>
                <p>Release Date</p>
                <p>Edition</p>
                <p>Author</p>
                <p>Cost</p>
            </div>
            <div className='books'>
                {books.map(book=>(
                  <div className='book' key={book.book_id}>
                    <p>{book.book_id}</p>
                    <p>{book.title}</p>
                    <p>{book.released_date}</p>
                    <p>{book.edition}</p>
                    <p>{book.author}</p>
                    <span>{book.cost}</span>
                  </div>  
                ))}
            </div>
            <br />
            {/* <button><Link to="/add">Add new book</Link></button> */}
        </div>
    )
}

export default Search;