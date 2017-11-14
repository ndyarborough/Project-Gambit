import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './pages/Home';
import Register from './pages/Register';

const App = () =>
  <Router>
    <div>
        <Switch>  
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
        </Switch>
    </div>
  </Router>;

export default App;