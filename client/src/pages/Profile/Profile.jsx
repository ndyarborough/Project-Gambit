import React from 'react';
import './Profile.css';
import { Container, Col, Row } from 'reactstrap';
import CharacterSelect from '../../components/CharacterSelect';
import axios from 'axios';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            muted: false,
            gamertag: 'Its that Easey',
            platform: 'XBL',
            icon: 'https://d1u1mce87gyfbn.cloudfront.net/game/unlocks/0x0250000000000317.png',
            skillRating: 4329,
            tier: 'http://blzgdapipro-a.akamaihd.net/game/rank-icons/season-2/rank-7.png',
            currentHero: 'doomfist',
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

    handleHeroChange = (event) => {
        const hero = event.target.innerText;
        // API Call Goes Here //
        // getHeroStats(hero);
        // Set data from response equal to this.state.heroStats 
        this.setState({
            // heroStats: res.data
            currentHero: hero
        });
    }

    loadProfile = () => {
        axios.get(`http://localhost:3001/api/getstats`, {
        })
        .then(function (response) {
          console.log(response);
          }).catch(function(error) {
            console.log(error);
          })       
      }

    muteToggle = () => {
        console.log('toggle mute')
        if(this.state.muted === false) {
            this.setState({
                muted: true
            })
        } else {
            this.setState({
                muted: false
            })
        }
    }

    componentDidMount() {
        // API CALL FOR PROFILE
        this.loadProfile();
    }

    render() {
        return (
            <div id='profilePage'>
                <Row id='info'>
                    <Col md='1'>
                        <img className='profileImgs' src={this.state.icon} />
                    </Col>
                    <Col md='4' className='accountInfo'>
                        <h1 className='username'>{this.state.gamertag} <small>on {this.state.platform}</small></h1>
                    </Col>
                    <Col id='skill' md='3'>
                        <Row>
                            <h3 className='skillRating'>Skill Rating: {this.state.skillRating}<span></span></h3>
                        </Row>
                    </Col>
                    <Col md='3' className='topHero'>
                        <h1 className='bestHeader'>Top Hero: Reaper</h1>
                    </Col>
                    <Col md='1'>
                        <img className='profileImgs bestHero' src='https://cdn.arstechnica.net/wp-content/uploads/2016/06/overreaper.jpg' />
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
                <CharacterSelect currentHero={this.state.currentHero} handler={this.handleHeroChange} />
                <Row className='heroStats'>
                    <Col md='3'>
                        <img src={require(`../../imgs/${this.state.currentHero.toLowerCase().replace('.', '').replace(':', '').replace(' ', '')}.png`)} />
                    </Col>
                    <Col md='9' className='raw-hero-stats'>
                        <Row>
                            <Col md='3'>
                                <h2>Hero Stats</h2>
                                <h3><small>Hours Played: </small>{this.state.heroStats.hoursPlayed}</h3>
                                <h3><small>Eliminations: </small>{this.state.heroStats.eliminations}</h3>
                                <h3><small>Accuracy: </small>{this.state.heroStats.accuracy}</h3>
                                <h3><small>Objective Kills: </small>{this.state.heroStats.eliminations}</h3>
                                <h3><small>Objective Time: </small>{this.state.heroStats.eliminations}</h3>
                                <h3><small>E/D: </small>{this.state.heroStats.kdr}</h3>
                                <h3><small>Wins: </small>{this.state.heroStats.wins}</h3>
                                <h3><small>Healing: </small>{this.state.heroStats.hoursPlayed}</h3>
                                <h3><small>Damage: </small>{this.state.heroStats.eliminations}</h3>
                            </Col>
                            <Col md='9'>
                                <h2 className='introHeader'>Meet {this.state.currentHero}!</h2>
                                <video muted={this.state.muted} onClick={this.muteToggle} src={require(`../../imgs/${this.state.currentHero.toLowerCase().replace('.', '').replace(':', '').replace(' ', '')}-intro.webm`)} autoPlay loop>
                                </video>
                            </Col>
                        </Row>
                            </Col>
                        </Row>
            </div>
                    )
    }
}

export default Profile;