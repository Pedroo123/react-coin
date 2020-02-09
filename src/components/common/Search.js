import React from 'react';
import './Search.css';

class Search extends React.Component {

    handleSubmit(event) {
        event.preventDefault();
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <input />
                <button>Submit</button>
            </form>
        )
    }
}

export default Search;