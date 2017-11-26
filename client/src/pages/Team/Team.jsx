import React from 'react';
import { Col, Row } from 'reactstrap';
import BattleCard from '../../components/BattleCard/BattleCard.jsx';
import './Team.css';

class Team extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           team: [
            {
               username: 'felixgunner547',
               character: 'reaper',
            },
            {
                username: 'serajWRECKS23',
                character: 'genji',
            },
            {
                username: 'newcharacter',
                character: 'reaper',
             }]
        };
    }

    // API Call that gets data for that specific team

    render() { 
        return (
            <Row id='teamPage'>
                <Row id='team-battle'>
                {
                 // Create a card for each team member
                 this.state.team.map((item, i)=> {
                        return <BattleCard  
                                    columnSize='2'
                                    character={this.state.team[i].character} 
                                    username={this.state.team[i].username}
                                />})
                }

                </Row>
            </Row>
        )
    }
}

export default Team;