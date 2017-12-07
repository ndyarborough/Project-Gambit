import React from 'react';
import { Col } from 'reactstrap';
import './ChatBox.css';

class ChatBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
        }
    }

    handleChange = event => {
        this.setState({ message: event.target.value });
    }

    handleFormSubmit = () => {
        // socket.emit('chat message', $('#m').val());
        // $('#m').val('');
        // return false;
    }

    render() {
        return (
            <Col className='chatBox' md='12'>
                <ul id="messages"></ul>
                <form>
                    <input value={this.state.message} onChange={this.handleChange} id="m" autoComplete="off" /><button onClick={this.handleSubmit}>Send</button>
                </form>
            </Col>
        )
    }
}


export default ChatBox;