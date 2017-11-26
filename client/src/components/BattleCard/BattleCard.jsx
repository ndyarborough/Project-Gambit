import React from 'react';
import { Col } from 'reactstrap';
import './BattleCard.css';

const BattleCard = (props) => {
    return (
        <Col className='battleCard' md={props.columnSize}>
            <h4 className='username'>{props.username}</h4>
            <img src={require(`../../imgs/${props.character}-photo.png`)} />
        </Col>
    )
}

export default BattleCard;