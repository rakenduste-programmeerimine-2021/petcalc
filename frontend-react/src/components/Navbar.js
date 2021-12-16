import { NavLink } from "react-router-dom";
import { useContext } from "react";
import './Navbar.css';
import { Context } from "../store";

function Navbar () {
  const [state, dispatch] = useContext(Context);
  
  return(
    <div class="navcontainer">
      <div class="navsubcont">
        <h1>PetCalc</h1>
      </div>
      <div class="navsubcont">
        {!state.auth.token && 
        (   
        <ul>
            <li><NavLink exact to="/" activeClassName="active">Form</NavLink></li>        
            <li><NavLink to="/register" activeClassName="active">Register</NavLink></li>        
            <li><NavLink to="/login" activeClassName="active">Login</NavLink></li>
        </ul>
        )
        }
        {state.auth.token && 
        ( 
          <ul>
              <li><NavLink exact to="/" activeClassName="active">Form</NavLink></li>       
              <li><NavLink to="/manager" activeClassName="active">Pet Manager</NavLink></li>        
              <li><NavLink to="/profile" activeClassName="active">Options</NavLink></li>
          </ul>
        )
        }
      </div>
    </div>
  )
}

export default Navbar;