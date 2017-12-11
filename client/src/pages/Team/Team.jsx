import React from 'react';
import { Row } from 'reactstrap';
import BattleCard from '../../components/BattleCard/BattleCard.jsx';
import './Team.css';
import Chat from '../../components/ChatBox/ChatBox.jsx';
import Navigation from '../../components/Navigation';

class Team extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           team: [
            {
               username: 'baseballman04',
               character: 'bastion',
            },
            {
                username: 'serajWRECKS23',
                character: 'genji',
            },
            {
                username: 'newcharacter',
                character: 'reaper',
             },
            {
                username: 'mrwonderful',
                character: 'winston',
            },
            {
                username: 'mranderson',
                character: 'junkrat',
            },
            {
                username: 'mrnickallen',
                character: 'reinhardt',
            }
            ]
        };
    }

    // API Call that gets data for that specific team

    render() { 
        return (
            <div id='teamPage'>
                <Navigation links={['Profile', 'Search', 'Team']} />
                <Row id='team-battle'>
                {
                 // Create a card for each team member
                 this.state.team.map((item, i) => {
                        return <BattleCard
                                    key={this.state.team[i].character} 
                                    columnSize='2'
                                    character={this.state.team[i].character} 
                                    username={this.state.team[i].username}
                                />})
                }

                </Row>
                <Row id='chat-box'>
                <Chat
                    columnSize='12'
                    title='This is the chat box' />                
                </Row>
            </div>
        )
    }
}

export default Team;