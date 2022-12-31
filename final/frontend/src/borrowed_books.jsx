import React from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import {useEffect} from 'react';
import {useState} from 'react';
import arrow from './arrow.png';
import Stnav from './stnav';
import { useNavigate } from "react-router-dom";
import "./sfnavsect.css"
import baseURL from "./routerlink";



const BorrowedBooks = () => {
    var full_url = document.URL; // Get current url
    var url_array = full_url.split('?') // Split the string into an array with / as separator
    const us_id=url_array[1].split(":")[1]
    
    const navigate = useNavigate();
    const handleclick=()=>{
      localStorage.removeItem("token_stud");
      navigate("/stlogin")
    }

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

        script.async = true;
      
        document.body.appendChild(script);
      
        return () => {
            document.body.removeChild(script);
        }
    }, []);
    
    let [books, setBooks] = useState([])
    useEffect(()=>{
        // console.log("here0")
        const fetchAllBooks = async()=>{
            try{
                const res = await axios.get(baseURL+`/borrowedbooks/${us_id}`)
                setBooks(res.data)
            }catch(err){
                console.log(err)
            }
        }
        fetchAllBooks()
    },[])

    const handleRenew = async(book)=>{
        try{
            const res = await axios.get(baseURL+`/getduedate/${us_id} ` + book.book_id)
            await axios.put(baseURL+`/renew/${us_id} `+ book.book_id, res.data)
            refreshPage();
            // console.log(book);
        }catch(err){
            console.log(err)
        }
    }

    const handleReturn = async(book)=>{
        try{
            const lib = await axios.get(baseURL+"/getlib")
            await axios.put(baseURL+`/setfine/${us_id} ` + book.due_date)
            await axios.post(baseURL+`/returnbook/${us_id} ` + lib.data.staff_id, book)
            await axios.delete(baseURL+`/book/${us_id} `+book.book_id)
            await axios.put(baseURL+`/revertStatus/`+ book.book_id, book)
            refreshPage();
        }catch(err){
            console.log(err)
        }
    }


    const [Search, setSearch] = useState({ 
        s:"", 
    });

    function refreshPage() {
        window.location.reload(false);
      }

    const handleChange = (e) =>{
        setSearch(prev=>({...prev, [e.target.name]: e.target.value}))
    };

    const handleClick = async e =>{
        e.preventDefault()
        try{
            const col = document.getElementById("selecttext");
            console.log(col)
            console.log(baseURL+"/books/"+col.innerText+"/"+Search.s)
            const res = await axios.get(baseURL+"/books/"+col.innerText+"/"+Search.s)
            setBooks(res.data)
        }catch(err){
            console.log(err);
        }
    }

    console.log(Search)
    return (
        <div style={{marginTop:"50px"}}>

        <div class="dropdown">
            <nav id="navbar-section">
                <h1 id="page-title">Welcome to LMS</h1>
            <div>
                <button class="dropbtn">Dropdown</button>
                <div class="dropdown-content">
                <li><a class="nav_items" onClick={()=>navigate(`/sthome?id:${us_id}`)} href="">Home Page</a></li>
                <li><a href="" onClick={refreshPage}>View Isuued Books</a></li>
                <li><a href="" onClick={()=>navigate(`/request?id:${us_id}`)}>Request a Book</a></li>
                <li><a href="" onClick={()=>navigate(`/help?id:${us_id}`)}>Ask for help</a></li>
                <li><a href="" onClick={handleclick}>Log out</a></li>
                </div>
                </div>
            </nav> 
        </div>
            <h1 className='head'>Issued Books</h1>
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
            <br />
            <table id='table'>
                <tr>
                <th>Book Id</th>
                <th>Title</th>
                <th>Due Date</th>
                <th>Action</th>
                </tr>
                
                {books && books.map((book, key)=>{
                    return ( 
                    <tr key={key}>
                        <td>{book.book_id} </td>
                        <td>{book.title} </td>
                        <td>{book.due_date.slice(0,10)}</td>
                        <td><button className='delete' onClick={()=>handleRenew(book)}>Renew Book</button> <br />
                        <button className='delete' onClick={()=>handleReturn(book)}>Return Book</button></td>
                    </tr>
                    )
                })}
            </table>
            <div className='bottom'>
                <br />
                <br />
                <button ><Link to={`/sthome?id:${us_id}`}>Home page</Link></button>
            </div>
        </div>
    )
}

export default BorrowedBooks;