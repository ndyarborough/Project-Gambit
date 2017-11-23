import React from 'react';
import './Home.css';
import charactersImage from '../../imgs/overwatch-cast.jpg.optimal.jpg';
import { Link } from 'react-router-dom';

const Home = () => 
        <div id='home'>
                <div id='welcomeBox'>
                        <h1>Pick your comp hero before the game starts!</h1>
                        <hr />
                        <div id='characterPic'></div>
                        <Link to='/register'>Create my Account and get started</Link>
                </div>
        </div>

export default Home;