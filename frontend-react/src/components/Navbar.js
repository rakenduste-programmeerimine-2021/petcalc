import { Link } from "react-router-dom";
import './App.css';

function Navbar () {
    return(
        <>
            <div className="navbar">
                <div><Link to="/">
                    Home
                </Link></div>
                <div><Link to="/form">
                    Form
                </Link></div>        
                <div><Link to="/register">
                    Register
                </Link></div>        
                <div><Link to="/login">
                    Login
                </Link>       
                </div>
            </div>
        </>
    )
}

export default Navbar;