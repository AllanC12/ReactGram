import "./Navbar.css";

//componentes
import { NavLink, Link } from "react-router-dom";

//icons
import {
  BsSearch,
  BsHouseDoorFill,
  BsFillPersonFill,
  BsFillCameraFill,
} from "react-icons/bs";

//hooks
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

//redux
import { logout,reset } from "../slices/authSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const { auth } = useAuth();

  const [query,setQuery] = useState()

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = () => {  
    dispatch(logout())
    dispatch(reset())
    navigate("/login")
  }

  const handleSearch = (e) => {
    e.preventDefault()

    if(query){
      return navigate(`/search?q=${query}`)
    }
  }

  return (
    <nav id="nav">
      <Link to="/">ReactGram</Link>
      <form id="search-form" onSubmit={handleSearch}>
        <BsSearch />
        <input placeholder="Pesquisar..." type="text" onChange={(e)=> setQuery(e.target.value)}/>
      </form>

      <ul id="nav-links">
        {auth ? (
          <>
            <li>
              <NavLink to="/">
                <BsHouseDoorFill />
              </NavLink>
            </li>
            {user && (
              <li>
                <NavLink to={`/users/${user.id}`}>
                  <BsFillCameraFill />
                </NavLink>
              </li>
            )}

            <li>
              <NavLink to="/profile">
                <BsFillPersonFill />
              </NavLink>
            </li>

            <li onClick={handleLogout}>
              <span>Sair</span>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/login">Entrar</NavLink>
            </li>

            <li>
              <NavLink to="/register">Cadastrar</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
