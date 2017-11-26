import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navigation = () => 
    <div>
        <Navbar>
            <NavbarBrand href='/'>Project Gambit</NavbarBrand>
            <Nav> 
                <NavItem>
                    <Link to='/register'>Register</Link>    
                </NavItem>
                <NavItem>
                <Link to='/login'>Login</Link>
                </NavItem>
                <NavItem>
                <Link to='/team'>Team</Link>
                </NavItem>
                <NavItem>
                <Link to='/search'>Search</Link>
                </NavItem>
                <NavItem>
                <Link to='/profile'>Profile</Link>
                </NavItem>
            </Nav>
        </Navbar>
    </div>


export default Navigation;