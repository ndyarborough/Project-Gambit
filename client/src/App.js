import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import Navbar from './components/Navbar';

const App = () =>
  <Router>
    <div>
      <Navbar />
      <Switch>  
        <Route exact path="/" component={Home} />
        <Route path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>;

export default App;