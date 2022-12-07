//Global variables
let filteredData = false;
let pageNum = 0;
let pageSize = 5;
let filters = document.getElementById("filters");
let options = document.getElementById("options");
let dataTable = document.getElementById("mainTable");
let curPageInfo = document.getElementById("pageInfo");
let applyBtn = document.getElementById("applyBtn");
let clearBtn = document.getElementById("clearBtn");
let prevButton = document.getElementById("prevButton");
let nextButton = document.getElementById("nextButton");
let rowsDisplay = document.getElementById("rowsDisplay");
//Load unfiltered data and dropdowns 
unfilteredData();
fillDropDowns();
// Page event listeners
filters.addEventListener("change", fillDropDowns);
applyBtn.addEventListener("click", resetFilter);
clearBtn.addEventListener("click", clearFilter);
prevButton.addEventListener("click", previous);
nextButton.addEventListener("click", next);
rowsDisplay.addEventListener("change", rowsToDisplay);
//Apply filter to data
function applyFilter(){
    
    filteredData = true;
    let choice = filters[filters.selectedIndex];
    let choiceID = choice.value;
    let option = options[options.selectedIndex];
    let optionID = option.value;
    if(options.selectedIndex == 0)
    {
        alert("You must select a filter"); // Need to change this to display Jatrori Restaurants Ltd. says instead of alert of localhost:3000 says
        clearFilter();
    }
    else
    {
        let fetchValue = `/filter-count?pQuery=${optionID}`
        if(choiceID == "country")
        {
            fetch(`./country/${optionID}?page=${pageNum}&pageSize=${pageSize}`)
            .then(response => response.json())
            .then(data => {
                displayData(data, fetchValue);
            });
        }
        else if(choiceID == "cities")
        {
            fetch(`./city/${optionID}?page=${pageNum}&pageSize=${pageSize}`)
            .then(response => response.json())
            .then(data => {
                displayData(data, fetchValue);
            });
        }
        else if(choiceID == "cuisine")
        {
            fetch(`./cuisine/${optionID}?page=${pageNum}&pageSize=${pageSize}`)
            .then(response => response.json())
            .then(data => {
                displayData(data, fetchValue);
            });
        }
    }
}
emptyTable();
function emptyTable()
{
   let numRows = pageSize;
   dataTable.innerHTML = `<tr>
                                <th>Name</th>
                                <th>Country</th>
                                <th>City</th>
                                <th>Cuisine</th>
                            </tr>`;
    for(let i = 0; i < numRows; i++)
    {
        dataTable.innerHTML += `<tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>`;
    }
}

function displayData(data, fetchValue)
{
    disablePrevBtn();
    fetch(fetchValue)
    .then(response => response.json())
    .then(count => {
        if(pageSize * (pageNum+1) < count[0].count)
        {
            curPageInfo.innerHTML = `Displaying ${(pageNum + 1) * pageSize - pageSize + 1} - ${pageSize * (pageNum+1)} of ${count[0].count}`;
        }
        else
        {
            curPageInfo.innerHTML = `Displaying ${(pageNum + 1) * pageSize - pageSize + 1} - ${count[0].count} of ${count[0].count}`;
        }
        let totalPages = Math.ceil(count[0].count / pageSize);
        if(pageNum == totalPages - 1)
        {
            nextButton.disabled = true;  
        }
        else
        {
            nextButton.disabled = false;
        }
        for(let i = 1; i < data.length + 1; i++)
        {
            for (let x = 0; x < 4; x++)
            {
                dataTable.rows[i].cells[x].innerHTML = data[i-1][Object.keys(data[i-1])[x]];
                /*dataTable.innerHTML += 
                `<tr>
                    <td>${data[i].name}</td>
                    <td>${data[i].country}</td>
                    <td>${data[i].city}</td>
                    <td>${data[i].cuisine}</td>  
                </tr>`;*/
            }
        }
        if (data.length < pageSize)
        {
            for(let i = data.length + 1; i < pageSize + 1; i++)
            {
                console.log(dataTable.rows.length);
                let num = dataTable.rows.length-1;
                    dataTable.rows[num].remove();
            }
        }
    });
}
function disablePrevBtn()
{
    if (pageNum == 0)
    {
        prevButton.disabled = true;
    }
    else
    {
        prevButton.disabled = false;
    }
}
function resetFilter(){
    pageNum = 0;
    pageSize = document.getElementById("rowsDisplay").value;
    applyFilter();
}
// Function to clear filter and reset to default
function clearFilter(){
    filteredData = false;
    filters.selectedIndex = 0;
    options.selectedIndex = 0;
    unfilteredData();
}
// Function to display unfiltered data
function unfilteredData()
{
    let fetchValue = `/count`;
    fetch(`./all?page=${pageNum}&pageSize=${pageSize}`)
    .then(response => response.json())
    .then(data => {
        displayData(data, fetchValue);
    });
}
// Function to reset the page number to 0, 
//set pageSize to the dropdown value and re-call the data 
function rowsToDisplay()
{
    pageNum = 0;
    pageSize = rowsDisplay.value;
    emptyTable();
    checkFilter();
}
// Function to go to the previous page
function previous()
{
    prevButton.blur();
    pageNum--;
    checkFilter();
}
function next()
{
    nextButton.blur();
    pageNum++;
    checkFilter();
}

function checkFilter()
{
    if(filteredData)
    {    
        applyFilter();
    }
    else
    {    
        unfilteredData();
    }
}
//Function to display country, city and cuisine options
function fillDropDowns()
{
    let choice = filters[filters.selectedIndex];
    let choiceID = choice.value;
    if(choiceID == "country")
    {
        fetchOptions(`/countries`);
    }
    else if(choiceID == "cities")
    {
        fetchOptions(`/cities`);
    }
    else if(choiceID == "cuisine")
    {
        fetchOptions(`/cuisines`);
    }
}
function fetchOptions(passedValue)
{
    fetch(passedValue)
    .then(response => response.json())
    .then(data => {
        options.innerHTML = `<option>--No Filter--</option>`;
        // do a for each loop
        for(key in data)
        {
            for (value in data[key])
            {
                options.innerHTML += `<option>${data[key][value]}</option>`;
            }
        }
    });
}
       