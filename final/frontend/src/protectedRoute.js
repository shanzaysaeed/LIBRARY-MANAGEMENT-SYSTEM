import Axios from "axios"
import { useEffect } from "react"
import Home from "./App"
const { Outlet } = require("react-router-dom")
import baseURL from "./routerlink";




const useAuth=()=>{
    useEffect(()=>{
        Axios.get(baseURL+"/isuerauth",{
        headers:{
            "x-access-token": localStorage.getItem("token")
        }
    })
    .then((res)=>res.json())
    .then((data)=>{
        if(data.hasOwnProperty("auth")){
            return true
        }
        else{
            return false
        }
    })
    },[])
    

}
const Protectedroutes= ()=>{
    const isauth= useAuth();
    return (isauth? <Outlet/>: <Home/> )
}


export default Protectedroutes;