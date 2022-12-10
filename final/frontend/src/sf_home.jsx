import React from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import {useEffect} from 'react';
import {useState} from 'react';
import arrow from './arrow.png';
import Sfnav from './sfnavsect'

const Sfhome = () => {
    const [ses_info, setses_info]= useState("")

    useEffect(()=>{
    fetch("http://localhost:5000/sess_info")

    // console.log("here")
    // .then((res)=>res.json())
    .then((data)=> console.log(data))

  },[])
 
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
                const res = await axios.get("http://localhost:5000/books")
                setBooks(res.data)
            }catch(err){
                console.log(err)
            }
        }
        fetchAllBooks()
    },[])

    const handleDelete = async (book)=>{
        try{
            await axios.delete("http://localhost:5000/delbook/"+book.book_id)
            window.location.reload()
            console.log(book);
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
            // console.log("http://localhost:5000/books/"+col.innerText+"/"+Search.s)
            const res = await axios.get("http://localhost:5000/searchbook/"+col.innerText+"/"+Search.s)
            setBooks(res.data)
        }catch(err){
            console.log(err);
        }
    }

    // console.log(Search)
    return (
        <div style={{marginTop:"50px"}}>
            <Sfnav></Sfnav>
            <h1 className='head'>Home page</h1>
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
                <th>Release Date</th>
                <th>Edition</th>
                <th>Author</th>
                <th>Cost</th>
                <th>Status</th>
                <th>Action</th>
                </tr>
                
                {books && books.map((book, key)=>{
                    return ( 
                    <tr key={key}>
                        <td>{book.book_id} </td>
                        <td>{book.title} </td>
                        <td>{book.released_date.slice(0,10)}</td>
                        <td>{book.edition}</td>
                        <td>{book.author}</td>
                        <td>{book.cost}</td>
                        <td>{book.status}</td>
                        <td><button className='delete' onClick={()=>handleDelete(book)}>Delete Book</button> <br />
                        <button className="update"><Link to={`/updatebook/${book.book_id}`} style={{ color: "inherit", textDecoration: "none" }} >Update Book</Link></button></td>
                    </tr>
                    )
                })}
            </table>
            <div className='bottom'>
                <br />
                <br />
                <button onClick={refreshPage}>See all books</button>
                <button ><Link to="/addbook">Add new Book</Link></button>
            </div>
        </div>
    )
}

export default Sfhome;