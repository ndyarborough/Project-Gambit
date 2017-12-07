import React from 'react';
import { Col } from 'reactstrap';
import './BattleCard.css';
class BattleCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isHovering : false,
            selectedHero: '',
            selectedClass: '',
        }
    }
  // GOOD: set this.state.isHovering to true on mouse over
  handleMouseOver = () => {
    this.setState({ isHovering: true });
  }
  // GOOD: set this.state.isHovering to false on mouse leave
  handleMouseOut = () => {
    this.setState({ isHovering: false });
  }
  // style={{border: this.state.isHovering ? "#f99e1a solid 2px" : "#eee solid 1px"}}
  handleclick = (event) => {
    const id = event.target.id;
    if(  id === '') {
        console.log('clicked a child');
        this.setState({
            selectedHero: id,
            selectedClass: 'selected'
        });
        // event.target.parentElement.style.background = 'red'
    } else {
        console.log('clicked a parent');
        this.setState({
            selectedHero: id,
            selectedClass: 'selected'
        });
        // event.target.style.background = 'red'
        console.log(this.state.selectedHero)
    }
    // document.getElementById(name).style.background = 'red';
  }
    render() {
        return (
            <Col onClick={this.props.clickHandler} id={this.props.character} className={`${this.props.handleSelection} battleCard`} md={this.props.columnSize}>
                <h4  className='cardName'>{this.props.character}</h4>
                <img alt={`../../imgs/${this.props.character}.png`} className='characterPic' src={require(`../../imgs/${this.props.character}.png`)} />
            </Col>
        )
    }
}
export default BattleCard;