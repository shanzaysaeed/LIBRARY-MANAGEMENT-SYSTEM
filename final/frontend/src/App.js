
import Booksreq from "./req_books" 
import Booksret from "./retunred_books"
import Booksiss from "./issued_books"
import Helpreq from "./help_req"
import Signupst from "./stsignup"
import Loginst from "./stlogin"
import Authentication from "./auth"
import Signupsf from "./sfsignup"
import Loginsf from "./sflogin"
import Sthome from "./st_home";
import BorrowedBooks from "./borrowed_books";
import Request from "./request_book";
import Help from "./help";
import Sfhome from "./sf_home";
import Addbook from "./Add";
import Updatebook from "./Update";
import "./style.css"
import Axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import baseURL from "./routerlink"

console.log("baseURL ", baseURL)
// import Routerlink from "./routerlink"
const { Outlet } = require("react-router-dom")

// const baseURL= baseURL+""
const Route = require("react-router-dom").Route;
const Routes = require("react-router-dom").Routes;

function App() {
// const val= <Routerlink/>
// console.log(val)
const [authcheck_staff, setauthcheck_staff]= useState(false)
const [authcheck_std, setauthcheck_std]= useState(false)
const [rescheck_sf, setrescheck_sf]= useState(false)
const [rescheck_st, setrescheck_st]= useState(false)
  useEffect(()=>
  {
    Axios.post(baseURL+"/isstaffauth",{
      "jwt_token_staff": localStorage.getItem("token_staff")
  })
  .then((res)=>{
      console.log("here ", res.data)
      if(res.data.hasOwnProperty("auth")){
          console.log("here")
          setauthcheck_staff(true)
        }
        else{
          setauthcheck_staff(false)
        }
        setrescheck_sf(true)
  })
  },[])

// const Check=()=>{
//   return <div>you're not authorized</div>
// }
const Protectedroutes_staff= ()=>{
  return ( rescheck_sf &&   (authcheck_staff ? <Outlet/> : <Authentication/>))
}

  useEffect(()=>{
    Axios.post(baseURL+"/isstdauth",{
      "jwt_token_std":localStorage.getItem("token_stud")
  })
  .then((res)=>{
      // console.log("here ", res.data)
      if(res.data.hasOwnProperty("auth")){
        console.log("student")
        setauthcheck_std(true)
      }
      else{
        setauthcheck_std(false)
      }
      setrescheck_st(true)
  })

},[])



const Protectedroutes_std=()=>{
  return ( rescheck_st &&   (authcheck_std ? <Outlet/> : <Authentication/>))
}
  return (
    <Routes>
       <Route  path="/sfsignup" element={<Signupsf/>} />
       <Route  path="/sflogin"  element={<Loginsf/>} />
       <Route  path="/"         element={<Authentication/>} />
       <Route  path="/stsignup" element={<Signupst/>} />3
       <Route  path="/stlogin"  element={<Loginst/>} />
       <Route element={<Protectedroutes_staff/>}>
       <Route  path="/helpreq"  element={<Helpreq/>} />
       <Route  path="/issbooks" element={<Booksiss/>} />
       <Route  path="/retbooks" element={<Booksret/>} />
       <Route  path ="reqbooks" element={<Booksreq/>}/>
       <Route  path="/sfhome"   element={<Sfhome />} />
       <Route  path="/addbook"  element={<Addbook />} />
       <Route  path="/updatebook/:id" element={<Updatebook />} />
       </Route>
       <Route element={<Protectedroutes_std/>}>
       <Route  path="/sthome" element={<Sthome />} />
       <Route  path="/borrowed_books" element={<BorrowedBooks />} />
       <Route  path="/request" element={<Request/>} />
       <Route  path="/help"    element={<Help />} />
      </Route>
    </Routes>
  )
}
export default App