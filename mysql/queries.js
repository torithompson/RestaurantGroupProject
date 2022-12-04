const mysql = require("./config.js");

function displayInitialData(criteria) {
    let query = `SELECT name, country, city, cuisine FROM restaurants ORDER BY name LIMIT ?,?`
    let safeQuery = mysql.functions.format(query, [criteria.increment, criteria.pageSize]);
    return querySql(safeQuery);
}

function displayCountries() {
    return querySql("SELECT DISTINCT country FROM restaurants ORDER BY country");
}
function displayCities() {
    return querySql("SELECT DISTINCT city FROM restaurants ORDER BY city");
}

function displayCuisines() {
    return querySql("SELECT DISTINCT cuisine FROM restaurants ORDER BY cuisine");
}
function displayCountry(criteria) {
    let query = "SELECT name, country, city, cuisine FROM restaurants WHERE country = ? ORDER BY name LIMIT ?,?";
    let safeQuery = mysql.functions.format(query, [criteria.filter, criteria.increment, criteria.pageSize]);
    return querySql(safeQuery);
}
function displayCity(criteria) {
    let query = "SELECT name, country, city, cuisine FROM restaurants WHERE city = ? ORDER BY name LIMIT ?,?";
    let safeQuery = mysql.functions.format(query, [criteria.filter, criteria.increment, criteria.pageSize]);
    return querySql(safeQuery);
}
function displayCuisine(criteria) {
    let query = "SELECT name, country, city, cuisine FROM restaurants WHERE cuisine = ? ORDER BY name LIMIT ?,?";
    let safeQuery = mysql.functions.format(query, [criteria.filter, criteria.increment, criteria.pageSize]);
    return querySql(safeQuery);
}
function countTable() {
    return querySql("SELECT COUNT(*) AS count FROM restaurants");
}
function filteredCountTable(criteria) {
    let query = "SELECT COUNT(*) AS count FROM restaurants where country = ? OR city = ? OR cuisine = ?";
    let safeQuery = mysql.functions.format(query, [criteria.passedQuery, criteria.passedQuery, criteria.passedQuery]);
    return querySql(safeQuery);
}
module.exports = {
    displayInitialData: displayInitialData,
    displayCountries: displayCountries,
    displayCities: displayCities,
    displayCuisines: displayCuisines,
    displayCountry: displayCountry,
    countTable: countTable,
    filteredCountTable: filteredCountTable,
    displayCity: displayCity,
    displayCuisine: displayCuisine
};


/*****************************************************************
 *        You can ignore everything below here!
 *****************************************************************/

// don't worry too much about this function! 
// it has been written to return the data from your database query
// *** it DOES NOT need modifying! ***
function querySql(sql) {
    let con = mysql.getCon();

    con.connect(function(error) {
        if (error) {
          return console.error(error);
        } 
      });

    return new Promise((resolve, reject) => {
        con.query(sql, (error, sqlResult) => {
            if(error) {
                return reject(error);
            }           

            return resolve(sqlResult);
        });

        con.end();
    });
}