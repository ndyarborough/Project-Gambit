import React from 'react';
import { Col } from 'reactstrap';
import './BattleCard.css';

const BattleCard = (props) => {
    return (
        <Col className='battleCard' md={props.columnSize}>
            <h4 className='cardName'>{props.username}</h4>
            <img className='characterPic' src={require(`../../imgs/${props.character}.png`)} />
        </Col>
    )
}

export default BattleCard;