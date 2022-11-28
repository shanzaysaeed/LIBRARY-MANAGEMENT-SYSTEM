import React from 'react';
import axios from 'axios';
import {Link, useNavigate} from "react-router-dom";
import {useEffect} from 'react';
import {useState} from 'react';
import arrow from './arrow.png';
// import Add from "./pages/Add";

const Books = () => {
    useEffect(() => {
        const script = document.createElement('script');
        
        let select =document.getElementById("select");
        let list =document.getElementById("list");
        let selecttext =document.getElementById("selecttext");
        let options =document.getElementsByClassName("options");
        let inputfield =document.getElementById("inputfield");
    
        select.onclick = function(){
            list.classList.toggle("open");
        }
        // console.log(selecttext);
    
        for(let option of options){
            option.onclick = function(){ 
                selecttext.innerHTML = this.innerHTML;
                inputfield.placeholder = "Search By " + selecttext.innerHTML;
            }
        }

        // script.src = "https://use.typekit.net/foobar.js";
        script.async = true;
      
        document.body.appendChild(script);
      
        return () => {
            document.body.removeChild(script);
        }
    }, []);
    
    const [books, setBooks] = useState([])
    useEffect(()=>{
        // console.log("here0")
        const fetchAllBooks = async()=>{
            try{
                const res = await axios.get("http://localhost:8800/books")
                setBooks(res.data)
            }catch(err){
                console.log(err)
            }
        }
        fetchAllBooks()
    },[])

    const handleDelete = async (id)=>{
        try{
            await axios.delete("http://localhost:8800/book/"+id)
            window.location.reload()
        }catch(err){
            console.log(err)
        }
    }

    const [Search, setSearch] = useState({ 
        s:"", 
    });

    const navigate = useNavigate();

    const handleChange = (e) =>{
        setSearch(prev=>({...prev, [e.target.name]: e.target.value}))
    };

    const handleClick = async e =>{
        e.preventDefault()
        try{
            const col = document.getElementById("selecttext");
            console.log(col)
            console.log("http://localhost:8800/books/"+col.innerText+"/"+Search.s)
            const res = await axios.get("http://localhost:8800/books/"+col.innerText+"/"+Search.s)
            setBooks(res.data)
        }catch(err){
            console.log(err);
        }
    }

    console.log(Search)
    return (
        <div>
            <h1>Library Management System</h1>
            <div class="container">
                <div class="search-bar">
                    <div id="select">
                        <p id="selecttext">Search by</p>
                        <img src={arrow} alt="arrow" />
                        <ul id="list">
                            <li class="options">Book_ID</li>
                            <li class="options">Title</li>
                            <li class="options">Released_Date</li>
                            <li class="options">Edition</li>
                            <li class="options">Author</li>
                        </ul>
                    </div>
                    <input type="text" id="inputfield" placeholder="search book" onChange={handleChange} name="s"/>
                    <button onClick={handleClick}>Search</button>
                </div>
            </div>
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
                    <button className='delete' onClick={()=>handleDelete(book.book_id)}>Delete Book</button>
                    <button className="update"><Link to={`/update/${book.book_id}`} style={{ color: "inherit", textDecoration: "none" }} >Update Book</Link></button>
                  </div>  
                ))}
            </div>
            <br />
            <button><Link to="/add">Add new Book</Link></button>
        </div>
    )
}

export default Books;