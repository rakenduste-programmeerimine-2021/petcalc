import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from './components/Navbar.js';
import Form from './components/Form.js';
import Register from './components/Register.js';
import Login from './components/Login.js';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Route path="/" component={Navbar} />
        <Switch>
          <Route exact path='/form' component={Form} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
