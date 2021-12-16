import { logoutUser } from "../store/actions";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../store";
import { useHistory } from "react-router-dom";


function Logout() {

    const [state, dispatch] = useContext(Context);
    const history = useHistory();
  
    const handleLogout = async () => {
      await dispatch(logoutUser());
      history.push('/form');
      
    }

return(<Link style={{float:"right"}} onClick={handleLogout}>Log out</Link>);

}

export default Logout;