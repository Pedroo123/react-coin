import React from 'react';
import Loading from './Loading';
import { withRouter } from 'react-router-dom';
import { API_URL } from '../../config';
import { responseHandle } from '../../helpers';
import './Search.css';

class Search extends React.Component {

    constructor() {
        super();

        this.state = {
            searchResults: [],
            searchQuery: '',
            loading: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleRedirect = this.handleRedirect.bind(this);
    }

    handleChange(event) {
        const searchQuery = event.target.value;

        this.setState({ searchQuery });

        // If the searchQuery is not present, then the request will not be sent to server
        if (!searchQuery) {
            return '';
        }

        this.setState({ loading: true })

        fetch(`${API_URL}/autocomplete?searchQuery=${searchQuery}`)
            .then(responseHandle)
            .then((result) => {
                this.setState({ loading: false, searchResults: result })
            })
    }


    handleRedirect(currencyId) {

        //Clear input values
        this.setState = ({
            searchQuery: '',
            searchResults: [],
        });

        this.props.history.push(`/currency/${currencyId}`);
    }

    renderSearchResults() {
        const { searchResults, searchQuery, loading } = this.state;

        if (!searchQuery) {
            return '';
        }

        if (searchResults > 0) {
            return(
                <div className="Search-result-container">
                    {searchResults.map(result => (
                        <div key={result.id} className="Search-result" onClick={() => this.handleRedirect(result.id)}>
                            {result.name} ({result.symbol})
                        </div>
                    ))}
                </div>
            )
        }

        if (!loading) {
            return(
                <div className="Search-result-container">
                    <div className="Search-no-result">
                        No results found
                    </div>
                </div>
            )
        }
    }

    render() {
        const { loading, searchQuery } = this.state;
        return(
            <div className="Search">

                <span className="Search-icon"/>

                <input 
                    onChange={this.handleChange}
                    className="Search-input"
                    type="text"
                    placeholder="Currency Name"
                    value={searchQuery}
                />

                {loading &&
                <div className="Search-loading">
                    <Loading width="12px" height="12px"/>
                </div>}

                {this.renderSearchResults()}
            </div>
        )
    }
}

export default withRouter(Search);