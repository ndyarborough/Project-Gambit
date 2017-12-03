import React from 'react';
import { Button, ButtonGroup } from 'reactstrap';
import './CategorySelect.css';

class CategorySelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    handleNewCategory = (i) => {
        console.log(this.props.currentCategory + ':' + this.props.categories[i].toLowerCase())
        if (this.props.currentCategory == this.props.categories[i].toLowerCase()) {
            return 'selectedCategory';
        } else {
            return '';
        }
    }

    render() {
        return (
            <ButtonGroup className='categorySelector'>
                {
                    this.props.categories.map((item, i) => {
                        return <Button
                            className={`categories ${this.handleNewCategory(i)}`}
                            id={`${this.props.categories[i].toLowerCase()}-category`}
                            onClick={this.props.handleCategory} >{this.props.categories[i]}</Button>
                    })
                }
            </ButtonGroup>
        );
    }
}

export default CategorySelect;