import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navigation = (props) =>
    <div>
        <Navbar>
            <NavbarBrand href='/'>Project Gambit</NavbarBrand>
            <Nav> 
                {
                 // Create a link for each available route
                props.links.map((link, i) => {
                    const linky = '/' + link;
                    return (
                            <NavItem key={linky}>
                                <Link onClick={props.changePage} to={linky}>{link}</Link>
                            </NavItem>
                            ) 
                })
                }
            </Nav>
        </Navbar>
    </div>


export default Navigation;