import React from 'react';
import './Table.css';
import propTypes from 'prop-types';

const Table = (props) => {
    const { currencies, handlePercetChange } = props;

    return (
        <div className="Table-container">
            <table className="Table">
                <thead className="Table-head">
                    <tr>
                        <th>Cryptocurrency</th>
                        <th>Price</th>
                        <th>Market cap</th>
                        <th>24h change</th>
                    </tr>
                </thead>
                <tbody className="Table-body">
                    {currencies.map((currency) => (
                        <tr key={currency.id}>
                            <td>
                                <span className="Table-rank">{currency.rank}</span>
                                {currency.name}
                            </td>
                            <td>
                                <span className="Table-dollar">$</span>
                                {currency.price}
                            </td>
                            <td>
                                <span className="Table-dollar">$</span>
                                {currency.marketCap}
                            </td>
                            <td>
                                {handlePercetChange(currency.percentChange24h)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

Table.propTypes = {
    currencies: propTypes.array.isRequired,
    handlePercetChange: propTypes.func.isRequired
};

export default Table;