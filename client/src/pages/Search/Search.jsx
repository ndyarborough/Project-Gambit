import React from 'react';
import './Search.css';
import CharacterSelect from '../../components/CharacterSelect';
import { Col } from 'reactstrap';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {
        return (
            <div id='search'>
                <Col md='3'>
                    <CharacterSelect />
                    <button id='findTeam'>Find Team</button>
                </Col>
            </div>
        )
    }


};

export default Search;