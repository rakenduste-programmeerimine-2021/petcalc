import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from './components/Navbar.js';
import Thing from './components/Thing.js';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Route path="/" component={Navbar} />
        <Switch>
          <Route exact path='/thing' component={Thing} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
