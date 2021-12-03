import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from './components/Navbar.js';
import Form from './components/Form.js';
import Register from './components/Register.js';
import Login from './components/Login.js';
import { Context } from "./store";
import { useContext } from "react";
import Profile from './components/Profile.js';
import Manager from './components/Manager.js';
import UserForm from './components/UserForm.js';

function App() {
  const [state, dispatch] = useContext(Context);
  return (
    <div>
      <BrowserRouter>
        <Route path="/" component={Navbar} />
        {!state.auth.token &&
          (<Switch>
            <Route exact path='/form' component={Form} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
          </Switch>)
        }
        {state.auth.token &&
          (<Switch>
            <Route exact path='/profile' component={Profile} />
            <Route exact path='/manage' component={Manager} />
            <Route exact path='/form' component={UserForm} />
          </Switch>)
        }
      </BrowserRouter>
    </div>
  );
}

export default App;
