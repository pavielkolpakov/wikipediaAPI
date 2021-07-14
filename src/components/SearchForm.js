import React, { Component } from 'react';
import './SearchForm.css';

class SearchForm extends Component {
    state = { query: '' };

    handleChange = e => {
        this.setState({
            query: e.currentTarget.value
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.onSubmit(this.state.query);

        this.setState({query: ''})
    }

    render() { 
        return (
            <form className="BoxContainer" onSubmit={this.handleSubmit}>
                <input className="search" type="text" value={this.state.query} onChange={this.handleChange} />
                <button className="btn" type="submit">Search</button>
            </form>
        );
    }
}
 
export default SearchForm;