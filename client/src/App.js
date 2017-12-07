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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      navLinks: ['Register', 'Login'],
      currentPage: '',
    }
  }
  // this.handleNavbarLinks = (page) => {
  //   console.log(page);
  // }
  componentDidMount = () => {
    switch(this.state.currentPage) {
      case 'register':
        this.setState({ navLinks: ['Login', 'Register']})
                break;
              case 'login':
        this.setState({ navLinks: ['Login', 'Register']})
                break;
              case 'profile':
        this.setState({ navLinks: ['Profile', 'Search', 'Logout',]})
                break;
              case 'search':
        this.setState({ navLinks: ['Profile', 'Search', 'Logout',]})
                break;
              case 'team':
        this.setState({ navLinks: ['Profile', 'Search', 'Logout', 'Team']})
                break;
              default:
        this.setState({ navLinks: ['Register', 'Login']})
    }
  }

  changePage = (event) => {
    const page = event.target.innerText.toLowerCase();
    this.setState({ currentPage: page});
    


  }


  render(){ 
    return(
      <Router>
      <div>
        <Navbar links={this.state.navLinks} changePage={this.changePage}/>
        <Switch>  
          <Route exact path='/' component={Home} />
          <Route path='/register' changePage={this.changePage} component={Register} />
          <Route path='/login' component={Login} />
          <Route path='/profile' component={Profile} />
          <Route path='/search' component={Search} />
          <Route path='/team' component={Team} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
    )
  }
}
 
export default App;