let express = require('express');
let app = express();
let queries = require('./mysql/queries.js');

app.use(express.static('public'));

app.set('view engine', 'ejs');
app.listen(3000);
//Route to index page
app.get("/", async (request, response) => {
    response.render('index');
});
//Route to get all data for unfiltered table
app.get("/all", (request, response) => {
    let pageSize = parseInt(request.query.pageSize);
    let increment = parseInt(request.query.page)*pageSize;
    queries.displayInitialData({increment:increment, pageSize:pageSize}).then(result => {
        response.json(result);
    });
});
//Route to retrieve list of countries
app.get("/countries", (request, response) => {
    queries.displayCountries().then(result => {
        response.json(result);
    });
});
//Route to retrieve list of cities
app.get("/cities", (request, response) => {
    queries.displayCities().then(result => {
        response.json(result);
    });
});
//Route to retrieve list of cuisines
app.get("/cuisines", (request, response) => {
    queries.displayCuisines().then(result => {
        response.json(result);
    });
});
//Route to count number of rows in table
app.get("/count", (request, response) => {
    queries.countTable().then(result => {
        response.json(result);
    });
});
//Route to count number of rows in table filtered by dropdown selection
app.get("/filter-count", (request, response) => {
    let passedQuery = request.query.pQuery;
    queries.filteredCountTable({passedQuery:passedQuery})
        .then(result => {
            response.json(result);
    });
});
//Route to get all data for filtered table by country
app.get("/country/:passed", (request, response) => {
    let pageSize = parseInt(request.query.pageSize);
    let increment = parseInt(request.query.page)*pageSize;
    queries.displayCountry({filter:request.params.passed, increment:increment, pageSize:pageSize}).then(result => {
        response.json(result);
    });
});
//Route to get all data for filtered table by city
app.get("/city/:passed", (request, response) => {
    let pageSize = parseInt(request.query.pageSize);
    let increment = parseInt(request.query.page)*pageSize;
    queries.displayCity({filter:request.params.passed, increment:increment, pageSize:pageSize}).then(result => {
        response.json(result);
    });
});
//Route to get all data for filtered table by cuisine
app.get("/cuisine/:passed", (request, response) => {
    let pageSize = parseInt(request.query.pageSize);
    let increment = parseInt(request.query.page)*pageSize;
    queries.displayCuisine({filter:request.params.passed, increment:increment, pageSize:pageSize}).then(result => {
        response.json(result);
    });
});