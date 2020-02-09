import React from 'react';

/**
 * Response handler for error messages that are caught on API
 * @param {object} response
 */

 export const responseHandle = (response) => {
    return response.json().then(json => {
        return response.ok ? json : Promise.reject(json);
    });
 }

/**
 * Render change percent helper
 * @param {string} percent 
 */
export const handlePercetChange = (percent) => {
    if (percent > 0) {
        return <span className="percent-raised">{percent}% &uarr;</span>
    } else if (percent < 0) {
        return <span className="percent-fallen">{percent}% &darr;</span>
    } else {
        return <span>{percent}</span>
    }
}