import React from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import {useEffect} from 'react';
import {useState} from 'react';
import arrow from './arrow.png';
// import Stnav from './stnav';
import { useNavigate } from "react-router-dom";
import "./sfnavsect.css"


const Sthome = () => {
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
                const res = await axios.get("http://localhost:5000/books")
                console.log("data",res.data)
                setBooks(res.data)
            }catch(err){
                console.log(err)
            }
        }
        fetchAllBooks()
    },[])

    const handleIssue = async(book)=>{
        try{
            

            const res = await axios.get("http://localhost:5000/getlib")
            // console.log(res.data.staff_id)

            await axios.post(`http://localhost:5000/issuebook/${us_id} ` + res.data.staff_id, book)
            await axios.put(`http://localhost:5000/updateStatus/`+ book.book_id, book)
            // console.log(book);
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
        <div class="dropdown">
            <nav id="navbar-section">
                <h1 id="page-title">Welcome to LMS</h1>
            <div>
                <button class="dropbtn">Dropdown</button>
                <div class="dropdown-content">
                <li><a class="nav_items" onClick={refreshPage} href="">Home Page</a></li>
                <li><a href="" onClick={()=>navigate(`/borrowed_books?id:${us_id}`)}>View Isuued Books</a></li>
                <li><a href="" onClick={()=>navigate(`/request?id:${us_id}`)}>Request a Book</a></li>
                <li><a href="" onClick={()=>navigate(`/help?id:${us_id}`)}>Ask for help</a></li>
                <li><a href="" onClick={handleclick}>Log out</a></li>
                </div>
                </div>
            </nav> 
        </div>
            
            <h1 className='head'>Home Page</h1>
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
               {console.log(books)}
                
                { books &&
                 books.map((book, key)=>{
                    return ( 
                    <tr key={key}>
                        <td>{book.book_id} </td>
                        <td>{book.title} </td>
                        <td>{book.released_date.slice(0,10)}</td>
                        <td>{book.edition}</td>
                        <td>{book.author}</td>
                        <td>{book.cost}</td>
                        <td>{book.status}</td>
                        {
                            book.status==="Available"?
                             <td><button className='delete' onClick={()=>handleIssue(book)}>Issue Book</button></td>
                            : <td><button className='delete'> Issued</button></td> 
                        }
                       
                    </tr>
                    )
                })}
            </table>

            <div className='bottom'>
                <br />
                <br />
                <button onClick={refreshPage}>See all books</button>
                {/* <button className="update"><Link to={`/updatebook/${book.book_id}`} style={{ color: "inherit", textDecoration: "none" }} >Update Book</Link></button></td>  */}
                <button ><Link to={`/borrowed_books?id:${us_id}`}  >View Issued Books</Link></button>
                <button ><Link to={`/request?id:${us_id}`}>Request a Book</Link></button>
                <button ><Link to={`/help?id:${us_id}`}>Ask for help</Link></button>
            </div>
        </div>
    )
}

export default Sthome;