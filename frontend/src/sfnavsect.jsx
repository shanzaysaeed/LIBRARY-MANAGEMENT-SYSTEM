import { useNavigate } from "react-router-dom";
import "./sfnavsect.css"



const Sfnav = ()=>{
  const navigate = useNavigate();
  const handleclick=()=>{
    localStorage.removeItem("token_staff");
    navigate("/sflogin")
  }


  return(
    <div class="dropdown">
    <nav id="navbar-section">
        <h1 id="page-title">Welcome to LMS</h1>
        <div>
        <button class="dropbtn">Dropdown</button>
        <div class="dropdown-content">
          <li><a class="nav_items" onClick={()=>navigate("/sfhome")} href="">Home Page</a></li>
          <li><a class="nav_items" onClick={()=>navigate("/issbooks")} href="">Issued Books</a></li>
          <li><a class="nav_items" onClick={()=>navigate("/addbook")} href="">Add Books</a></li>
          <li><a class="nav_items" onClick={()=>navigate("/reqBooks")} href="">Rquested Books</a></li>
          <li><a class="nav_items" onClick={()=>navigate("/helpreq")} href="">Help Requests</a></li>
          <li><a class="nav_items" onClick={()=>navigate("/retBooks")} href="">Returned Books</a></li>
          <li><a class="nav_items" onClick={handleclick} href="">logout</a></li>
        </div>
        </div>
     </nav> 
  </div>
    

  
  )

}

export default Sfnav