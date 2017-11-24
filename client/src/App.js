import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import Navbar from './components/Navbar';
import Profile from './pages/Profile';
import Search from './pages/Search';
import Team from './pages/Team';

const App = () =>
  <Router>
    <div>
      <Navbar />
      <Switch>  
        <Route exact path='/' component={Home} />
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
        <Route path='/profile' component={Profile} />
        <Route path='/search' component={Search} />
        <Route path='/team' component={Team} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>;

export default App;