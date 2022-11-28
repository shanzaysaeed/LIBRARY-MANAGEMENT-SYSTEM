
import Booksreq from "./req_books" 
import Booksret from "./retunred_books"
import Booksiss from "./issued_books"
import Helpreq from "./help_req";

const Route = require("react-router-dom").Route;
const Routes = require("react-router-dom").Routes;



function App() {
  const Home =()=>{
    return <h1> hello this is the home page</h1>
  }
  return (
    <Routes>
       <Route  path="/"  element={<Home/>} />
       <Route  path="/helpreq"  element={<Helpreq/>} />
       <Route  path="/issbooks"  element={<Booksiss/>} />
       <Route  path="/retbooks"  element={<Booksret/>} />
       <Route  path ="reqbooks" element={<Booksreq/>}/>
    </Routes>
  )
}

export default App