import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './CharacterSelect.css';
  
export default class CharacterSelect extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false,
      dropdownValue: 'Character'
    };
  }

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  handleChange = (event) => {
    this.setState({
      dropdownValue: event.target.innerText
    })
  }

  render() {
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          {this.state.dropdownValue}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem header>Attack</DropdownItem>
          <DropdownItem onClick={this.handleChange}>Doomfist</DropdownItem>
          <DropdownItem onClick={this.handleChange}>Genji</DropdownItem>
          <DropdownItem onClick={this.handleChange}>Mcree</DropdownItem>
          <DropdownItem onClick={this.handleChange}>Pharah</DropdownItem>
          <DropdownItem onClick={this.handleChange}>Reaper</DropdownItem>
          <DropdownItem onClick={this.handleChange}>Soldier: 76</DropdownItem>
          <DropdownItem onClick={this.handleChange}>Sombra</DropdownItem>
          <DropdownItem onClick={this.handleChange}>Tracer</DropdownItem>
          <DropdownItem divider />
          <DropdownItem header>Defense</DropdownItem>
          <DropdownItem onClick={this.handleChange}>Bastion</DropdownItem>
          <DropdownItem onClick={this.handleChange}>Junkrat</DropdownItem>
          <DropdownItem onClick={this.handleChange}>Hanzo</DropdownItem>
          <DropdownItem onClick={this.handleChange}>Mei</DropdownItem>
          <DropdownItem onClick={this.handleChange}>Torbjorn</DropdownItem>
          <DropdownItem onClick={this.handleChange}>Widowmaker</DropdownItem>
          <DropdownItem divider />
          <DropdownItem header>Tank</DropdownItem>
          <DropdownItem onClick={this.handleChange}>D.VA</DropdownItem>
          <DropdownItem onClick={this.handleChange}>Orisa</DropdownItem>
          <DropdownItem onClick={this.handleChange}>Reinhardt</DropdownItem>
          <DropdownItem onClick={this.handleChange}>Roadhog</DropdownItem>
          <DropdownItem onClick={this.handleChange}>Winston</DropdownItem>
          <DropdownItem onClick={this.handleChange}>Zarya</DropdownItem>
          <DropdownItem divider />
          <DropdownItem header>Support</DropdownItem>
          <DropdownItem onClick={this.handleChange}>Ana</DropdownItem>
          <DropdownItem onClick={this.handleChange}>Lucio</DropdownItem>
          <DropdownItem onClick={this.handleChange}>Mercy</DropdownItem>
          <DropdownItem onClick={this.handleChange}>Moira</DropdownItem>
          <DropdownItem onClick={this.handleChange}>Symmetra</DropdownItem>
          <DropdownItem onClick={this.handleChange}>Zenyata</DropdownItem>
          <DropdownItem divider />
        </DropdownMenu>
      </Dropdown>
    );
  }
}