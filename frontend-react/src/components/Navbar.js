import { Link } from "react-router-dom";

function Navbar () {
    return(
        <>
            <div className="header">
                <div><Link to="/">
                    Home
                </Link></div>
            <div><Link to="/thing">
                    Login
                </Link></div>        
            </div>
        </>
    )
}

export default Navbar;