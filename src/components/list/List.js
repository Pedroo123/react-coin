import React from 'react';
import { responseHandle } from '../../helpers';
import { API_URL } from '../../config';
import Loading from '../common/Loading';
import Table from '../list/Table';
import Pagination from './Pagination';

class List extends React.Component {

    constructor() {
        super();

        this.state = {
            loading: false,
            currencies: [],
            error: null,
            totalPages: 0,
            page: 1
        };
    }

    componentDidMount() {
        this.fetchCurrencies();
    }

    fetchCurrencies() {
        this.setState({ loading: true });

        const { page } = this.state;

        fetch(`${API_URL}/cryptocurrencies?page=${page}&perPage=20`)
        .then(responseHandle)
        .then((data) => {
            console.log('Success', data);

            const { currencies, totalPages } = data;

            this.setState({ currencies, totalPages, loading: false })
        })
        .catch((error) => {
            console.log('Error', error);

            this.setState({ error: error.errorMessage, loading: false })
        });
    }

    handlePercetChange(percent) {
        if (percent > 0) {
            return <span className="percent-raised">{percent}% &uarr;</span>
        } else if (percent < 0) {
            return <span className="percent-raised">{percent}% &darr;</span>
        } else {
            return <span className="percent-raised">{percent}</span>
        }
    }

    handlePaginationClick = (direction) => {
        let nextPage = this.state.page;

        //Increment nextPage if direction variable is NEXT, otherwise, decrement it
        nextPage = direction === 'next' ? nextPage + 1 : nextPage - 1;

        this.setState({page: nextPage}, () => {
            //call the function inside setState callback
            //Because the first page has to be updated
            this.fetchCurrencies();
        });
    }

    render() {
        const { loading, error, currencies, page, totalPages } = this.state;

        if (loading) {
            return <div className="loading-container"><Loading /></div>
        }

        if (error) {
            return <div className="error">{this.state.error}</div>
        }

        return (

            <div>
                <Table
                currencies={currencies}
                handlePercetChange={this.handlePercetChange}
                />

                <Pagination 
                page={page}
                totalPages={totalPages}
                handlePaginationClick={this.handlePaginationClick}
                />
            </div>
        );
    }
}


export default List;