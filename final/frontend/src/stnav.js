import { useNavigate } from "react-router-dom";
import "./sfnavsect.css"
import baseURL from "./routerlink";

const Stnav = (prop)=>{
  const navigate = useNavigate();
  const handleclick=()=>{
    localStorage.removeItem("token_stud");
    navigate("/stlogin")
  }

  return(
    <div class="dropdown">
    <nav id="navbar-section">
        <h1 id="page-title">Welcome to LMS</h1>
      <div>
        <button class="dropbtn">Dropdown</button>
        <div class="dropdown-content">
        <li><a class="nav_items" onClick={()=>{navigate("/sthome")}} href="">Home Page</a></li>
        <li><a href="" onClick={()=>navigate("/borrowed_books")}>View Isuued Books</a></li>
        <li><a href="" onClick={()=>navigate("/request")}>Request a Book</a></li>
        <li><a href="" onClick={()=>navigate("/help")}>Ask for help</a></li>
        <li><a href="" onClick={handleclick}>Log out</a></li>
        </div>
        </div>
     </nav> 
  </div>

)}

export default Stnav