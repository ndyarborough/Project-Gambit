import React from 'react';
import './Profile.css';
import { Container, Col, Row } from 'reactstrap';
import CharacterSelect from '../../components/CharacterSelect';

class Profile extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {

    //     }
    // };

    render() {
        return(
            <div id='profilePage'>
                <div id='info'>
                    <img src='https://tekutiger.files.wordpress.com/2017/06/myversion-nullmari-icon-1500x1500.jpg' />
                    <div className='accountInfo'>    
                        <h1 className='username'>It's that Easey</h1>
                        <div className='icon'></div>
                    </div>   
                       <div className='topHero'> 
                            <h1 className='bestHeader'>Top Hero: Reaper</h1>
                            <img className='bestHero' src='https://cdn.arstechnica.net/wp-content/uploads/2016/06/overreaper.jpg' />
                        </div>
                </div>
                <div id='findGroup'>
                    <button>Find Group</button>
                </div>
                <div id='heroStats'>
                    <CharacterSelect />
                    <Container className='stat-breakdown'> 
                        <Col className='left' md='3'>
                            <Row>
                                <h2>Hours Played: <span>13 Hours</span></h2>
                            </Row>
                            <Row>
                                <h2>Wins: <span>112</span></h2>
                            </Row>
                            <Row>
                                <h2>Eliminations: <span>3864</span></h2>
                            </Row>
                            <Row>
                                <h2>Accuracy: <span>22%</span></h2>
                            </Row>
                        </Col>  
                        <Col className='right' md='3'>
                            <Row>
                                <h2>Healing: <span>N/A</span></h2>
                            </Row>
                            <Row>
                                <h2>Damage: <span>14347</span></h2>
                            </Row>
                            <Row>
                                <h2>Objective Kills: <span>234</span></h2>
                            </Row>
                            <Row>
                                <h2>Objective Time: <span>0:12/min</span></h2>
                            </Row>
                        </Col>
                    </Container>
                </div>
            </div>
        )
    }
}

export default Profile;