/**
 * Response handler for error messages that are caught on API
 * @param {object}
 */

 export const responseHandle = (response) => {
    return response.json().then(json => {
        return response.ok ? json : Promise.reject(json);
    });
 }