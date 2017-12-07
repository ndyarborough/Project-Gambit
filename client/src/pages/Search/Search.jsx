import React from 'react';
import { Col, Button, Row } from 'reactstrap';
import BattleCard from '../../components/BattleCard/BattleCard.jsx';
import CategorySelect from '../../components/CategorySelect/CategorySelect.jsx';
import './Search.css';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isHovering: false,
            selectedHero: '',
            currentCategory: '',
            categories: ['All', 'Offense', 'Defense', 'Tank', 'Support'],
            Heroes: [
                {
                    character: 'ana',
                    status: 'support',
                },
                {
                    character: 'bastion',
                    status: 'defense',
                },
                {
                    character: 'doomfist',
                    status: 'offensive',
                },
                {
                    character: 'dva',
                    status: 'tank',
                },
                {
                    character: 'genji',
                    status: 'offensive',
                },
                {
                    character: 'hanzo',
                    status: 'defense',
                },
                {
                    character: 'junkrat',
                    status: 'defense',
                },
                {
                    character: 'lucio',
                    status: 'support',
                },
                {
                    character: 'mccree',
                    status: 'offensive',
                },
                {
                    character: 'mei',
                    status: 'defense',
                },
                {
                    character: 'mercy',
                    status: 'support',
                },
                {
                    character: 'moira',
                    status: 'support',
                },
                {
                    character: 'orisa',
                    status: 'tank',
                },
                {
                    character: 'pharah',
                    status: 'offensive',
                },
                {
                    character: 'reaper',
                    status: 'offensive',
                },
                {
                    character: 'reinhardt',
                    status: 'tank',
                },
                {
                    character: 'roadhog',
                    status: 'tank',
                },
                {
                    character: 'soldier76',
                    status: 'offensive',
                },
                {
                    character: 'sombra',
                    status: 'offensive',
                },
                {
                    character: 'symmetra',
                    status: 'support',
                },
                {
                    character: 'torbjorn',
                    status: 'defense',
                },
                {
                    character: 'tracer',
                    status: 'offensive',
                },
                {
                    character: 'widowmaker',
                    status: 'defense',
                },
                {
                    character: 'winston',
                    status: 'tank',
                },
                {
                    character: 'zarya',
                    status: 'tank',
                },
                {
                    character: 'zenyatta',
                    status: 'support',
                }
            ],
            displayHeroes: [
                {
                    character: 'ana',
                    status: 'support',
                },
                {
                    character: 'bastion',
                    status: 'defense',
                },
                {
                    character: 'doomfist',
                    status: 'offensive',
                },
                {
                    character: 'dva',
                    status: 'tank',
                },
                {
                    character: 'genji',
                    status: 'offensive',
                },
                {
                    character: 'hanzo',
                    status: 'defense',
                },
                {
                    character: 'junkrat',
                    status: 'defense',
                },
                {
                    character: 'lucio',
                    status: 'support',
                },
                {
                    character: 'mccree',
                    status: 'offensive',
                },
                {
                    character: 'mei',
                    status: 'defense',
                },
                {
                    character: 'mercy',
                    status: 'support',
                },
                {
                    character: 'moira',
                    status: 'support',
                },
                {
                    character: 'orisa',
                    status: 'tank',
                },
                {
                    character: 'pharah',
                    status: 'offensive',
                },
                {
                    character: 'reaper',
                    status: 'offensive',
                },
                {
                    character: 'reinhardt',
                    status: 'tank',
                },
                {
                    character: 'roadhog',
                    status: 'tank',
                },
                {
                    character: 'soldier76',
                    status: 'offensive',
                },
                {
                    character: 'sombra',
                    status: 'offensive',
                },
                {
                    character: 'symmetra',
                    status: 'support',
                },
                {
                    character: 'torbjorn',
                    status: 'defense',
                },
                {
                    character: 'tracer',
                    status: 'offensive',
                },
                {
                    character: 'widowmaker',
                    status: 'defense',
                },
                {
                    character: 'winston',
                    status: 'tank',
                },
                {
                    character: 'zarya',
                    status: 'tank',
                },
                {
                    character: 'zenyatta',
                    status: 'support',
                }
            ],
        }
    };

    handleClick = (event) => {
        let id = event.target.id;
        if (id === '') {
            id = event.target.parentElement.id;
            console.log('child element: ' + id)
            this.setState({
                selectedHero: id,
            });
            // event.target.parentElement.style.background = 'red'
        } else {
            this.setState({
                selectedHero: id,
            });
            console.log("parent element: " + id)
            // event.target.style.background = 'red'
        }
    }

    handleCategorySelection = (event) => {
        const chosenCategory = event.target.innerText.toLowerCase();
        let newCharacters = [];
        switch (chosenCategory) {
            case 'offense':
            newCharacters = this.state.Heroes.filter(Heroes => Heroes.status === "offensive");
                break;
            case 'defense':
                newCharacters = this.state.Heroes.filter(Heroes => Heroes.status === "defense");
                break;
            case 'tank':
                newCharacters = this.state.Heroes.filter(Heroes => Heroes.status === "tank");
                break;
            case 'support':
                newCharacters = this.state.Heroes.filter(Heroes => Heroes.status === "support");
                break;
            default:
            newCharacters = this.state.Heroes;
                break;
        }
        this.setState({
            currentCategory: chosenCategory,
            displayHeroes: newCharacters,
        });
        
    }

    handleHeroSelection = (i) => {
        if (this.state.selectedHero.toString().toLowerCase() === this.state.displayHeroes[i].character) {
            return 'selected';
        } else {
            return '';
        }
    }

    handleSearch = () => {
        const selection = this.state.selectedHero;
        console.log(selection);
    }

    render() {

        return (
            <div id='search'>
                <CategorySelect
                    currentCategory={this.state.currentCategory}
                    handleCategory={this.handleCategorySelection}
                    categories={this.state.categories}
                />
                <Button id='searchButton' onClick={this.handleSearch} >
                    Search
                </Button>
                <Row id='characters'>
                    <Row className='search-header'>    
                        <h2 className='white'>Pick a hero from any category</h2>
                    </Row>
                    {
                        // Create a card for each character
                        this.state.displayHeroes.map((item, i) => {
                            return <BattleCard
                                handleSelection={this.handleHeroSelection(i)}
                                key={this.state.Heroes[i].character}
                                columnSize='2'
                                character={this.state.displayHeroes[i].character}
                                clickHandler={this.handleClick}
                            />
                        })
                    }
                </Row>
                <Button className='bottom-button' id='searchButton' onClick={this.handleSearch} >
                    Search
                </Button>
            </div>
        )
    }
}
export default Search;