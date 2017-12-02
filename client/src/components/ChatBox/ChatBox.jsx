import React from 'react';
import { Col } from 'reactstrap';
import './ChatBox.css';

const ChatBox = (props) => {
    return (
        <Col className='chatBox' md={props.columnSize}>
            <h1 className='chatBoxText'>{props.title}</h1>
        </Col>
    )
}

export default ChatBox;