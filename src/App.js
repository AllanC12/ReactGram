import './App.css';

import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom"

//components
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

//pages
import Home from './pages/home/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
       <Navbar/>
        <Routes>
           <Route path="/" element={<Home/>}/>
           <Route path="/login" element={<Login/>}/>
           <Route path="/register" element={<Register/>}/>
        </Routes>
       <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
