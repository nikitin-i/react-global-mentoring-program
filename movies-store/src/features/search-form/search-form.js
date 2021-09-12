import React from 'react';
import './search-form.css';
import Button from '../../components/button'

class SearchForm extends React.PureComponent {
    constructor() {
        super();

        this.state = {
            search: ''
        };
    }

    changeSearchLine(e) {
        this.setState(state => ({
            search: e.target.value
        }));
    }

    submitForm(e) {
        e.preventDefault();

        alert('Current request has been successfully sent!');
    }

    render() {
        return (
            <div className='search-form'>
                <input
                    type='text'
                    id='search'
                    placeholder='What do you want to watch?'
                    onChange={this.changeSearchLine.bind(this)}
                    value={this.state.search}
                    className='search-form__input' />
                <Button value='Search' clickHandler={this.submitForm.bind(this)} />
            </div>
        );
    }
}

export default SearchForm;