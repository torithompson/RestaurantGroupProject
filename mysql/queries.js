const mysql = require("./config.js");
//Initial query to display all data in table ordering by name
//and limiting to passed page size
function displayInitialData(criteria) {
    let query = `SELECT name, country, city, cuisine FROM restaurants ORDER BY name LIMIT ?,?`
    let safeQuery = mysql.functions.format(query, [criteria.increment, criteria.pageSize]);
    return querySql(safeQuery);
}
//Query to display all countries in table
function displayCountries() {
    return querySql("SELECT DISTINCT country FROM restaurants ORDER BY country");
}
//Query to display all cities in table
function displayCities() {
    return querySql("SELECT DISTINCT city FROM restaurants ORDER BY city");
}
//Query to display all cuisines in table
function displayCuisines() {
    return querySql("SELECT DISTINCT cuisine FROM restaurants ORDER BY cuisine");
}
//Query to display all data in table filtered by country
//and limiting to passed page size
function displayCountry(criteria) {
    let query = "SELECT name, country, city, cuisine FROM restaurants WHERE country = ? ORDER BY name LIMIT ?,?";
    let safeQuery = mysql.functions.format(query, [criteria.filter, criteria.increment, criteria.pageSize]);
    return querySql(safeQuery);
}
////Query to display all data in table filtered by city
//and limiting to passed page size
function displayCity(criteria) {
    let query = "SELECT name, country, city, cuisine FROM restaurants WHERE city = ? ORDER BY name LIMIT ?,?";
    let safeQuery = mysql.functions.format(query, [criteria.filter, criteria.increment, criteria.pageSize]);
    return querySql(safeQuery);
}
//Query to display all data in table filtered by cuisine
//and limiting to passed page size
function displayCuisine(criteria) {
    let query = "SELECT name, country, city, cuisine FROM restaurants WHERE cuisine = ? ORDER BY name LIMIT ?,?";
    let safeQuery = mysql.functions.format(query, [criteria.filter, criteria.increment, criteria.pageSize]);
    return querySql(safeQuery);
}
//Query to count all data in table
function countTable() {
    return querySql("SELECT COUNT(*) AS count FROM restaurants");
}
//Query to count all data in table filtered by dropdown selection
function filteredCountTable(criteria) {
    let query = "SELECT COUNT(*) AS count FROM restaurants where country = ? OR city = ? OR cuisine = ?";
    let safeQuery = mysql.functions.format(query, [criteria.passedQuery, criteria.passedQuery, criteria.passedQuery]);
    return querySql(safeQuery);
}
//Export all functions
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