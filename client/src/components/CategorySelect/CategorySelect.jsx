import React from 'react';
import { Button, ButtonGroup } from 'reactstrap';
import './CategorySelect.css';

class CategorySelect extends React.Component {

    handleNewCategory = (i) => {
        if (this.props.currentCategory === this.props.categories[i].toLowerCase()) {
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
                            onClick={this.props.handleCategory}
                            key={this.props.categories[i]}>
                            {this.props.categories[i]}</Button>
                    })
                }
            </ButtonGroup>
        );
    }
}

export default CategorySelect;