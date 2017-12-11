import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import Profile from './pages/Profile';
import Search from './pages/Search';
import Team from './pages/Team';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      navLinks: ['Register', 'Login'],
      currentPage: '',
    }
  }

  render(){ 
    return(
      <Router>
        <Switch>  
          <Route exact path='/' component={Home} />
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />
          <Route path='/profile' component={Profile} />
          <Route path='/search' component={Search} />
          <Route path='/team' component={Team} />
          <Route component={NoMatch} />
        </Switch>
    </Router>
    )
  }
}
 
export default App;