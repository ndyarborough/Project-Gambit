import React from 'react';
import './Profile.css';
import { Container, Col, Row } from 'reactstrap';
import CharacterSelect from '../../components/CharacterSelect';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gamertag: '',
            platform: 'XBL',
            icon: 'https://d1u1mce87gyfbn.cloudfront.net/game/unlocks/0x0250000000000317.png',
            skillRating: 4329,
            tier: 'http://blzgdapipro-a.akamaihd.net/game/rank-icons/season-2/rank-7.png',
            lifetimeStats: {
                gamesPlayed: 212,
                wins: 153,
                kdr: 5.72,
                healing: '9,330',
                damage: '3,345,093',
                eliminations: '8,732',
            },
            heroStats: {
                name: 'D.Va',
                eliminations: 2.98,
                hoursPlayed: 47,
                kdr: 5.84,
                accuracy: 33,
                wins: 153,
                healing: 0,
                damage: 1318,
                objKills: 1,
                objTime: 8.07,
            },
        }
    };

    render() {
        return(
            <div id='profilePage'>
                <Row id='info'>
                    <Col md='5' className='accountInfo'>    
                        <img src={this.state.icon} />
                        <h1 className='username'>It's that Easey <small>on {this.state.platform}</small></h1>
                    </Col>  
                    <Col id='skill' md={{size: 2, offset:1}}>
                        <Row>
                            <h3 className='skillRating'>{this.state.skillRating}</h3>
                        </Row>
                        <Row><h3>Skill Rating</h3></Row>
                    </Col> 
                    <Col md='4' className='topHero'> 
                        <img className='bestHero' src='https://cdn.arstechnica.net/wp-content/uploads/2016/06/overreaper.jpg' />
                        <h1 className='bestHeader'>Top Hero: Reaper</h1>
                    </Col>
                </Row>
                <h1 className='header'>Lifetime Stats</h1>
                <Row className='lifetime'> 
                    <Col md='2'>Games Played: {this.state.lifetimeStats.gamesPlayed}</Col>
                    <Col md='2'>Wins: {this.state.lifetimeStats.wins}</Col>
                    <Col md='2'>Eliminations: {this.state.lifetimeStats.eliminations}</Col>
                    <Col md='2'>Damage: {this.state.lifetimeStats.damage}</Col>
                    <Col md='2'>Healing: {this.state.lifetimeStats.healing}</Col>
                    <Col md='2'>E/D: {this.state.lifetimeStats.kdr}</Col>
                </Row>
                <CharacterSelect />
                <h1 className='header'>Specific Hero Stats</h1>
                <Row className='heroStats'>
                    <Col md='1'></Col>
                    <Col md='1'></Col>
                    <Col md='1'>Eliminations: {this.state.heroStats.eliminations}</Col>
                    <Col md='1'>Wins: {this.state.heroStats.wins}</Col>
                    <Col md='1'>Hours Played: {this.state.heroStats.gamesPlayed}</Col>
                    <Col md='1'>Damage: {this.state.heroStats.damage}</Col>
                    <Col md='1'>Healing: {this.state.heroStats.healing}</Col>
                    <Col md='1'>E/D: {this.state.heroStats.kdr}</Col>
                    <Col md='1'>Accuracy: {this.state.heroStats.accuracy}</Col>
                    <Col md='1'>Objective Kills: {this.state.heroStats.objKills}</Col>
                    <Col md='1'>Objective Time: {this.state.heroStats.objTime}</Col>
                    <Col md='1'></Col>
                </Row>

            </div>
        )
    }
}

export default Profile;