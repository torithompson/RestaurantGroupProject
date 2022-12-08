//Global variables
let filteredData = false;
let pageNum = 0;
let pageSize = 5;
// Populate variables with DOM elements
let filters = document.getElementById("filters");
let options = document.getElementById("options");
let dataTable = document.getElementById("mainTable");
let curPageInfo = document.getElementById("pageInfo");
let applyBtn = document.getElementById("applyBtn");
let clearBtn = document.getElementById("clearBtn");
let prevButton = document.getElementById("prevButton");
let nextButton = document.getElementById("nextButton");
let rowsDisplay = document.getElementById("rowsDisplay");
// Call functions to populate dropdowns and display unfiltered data and create the empty table on page load
fillDropDowns();
emptyTable();
unfilteredData();
// Page event listeners
filters.addEventListener("change", fillDropDowns);
options.addEventListener("change", enableCBtn);
applyBtn.addEventListener("click", resetPageNumAndSize);
clearBtn.addEventListener("click", clearFilter);
prevButton.addEventListener("click", previous);
nextButton.addEventListener("click", next);
rowsDisplay.addEventListener("change", rowsToDisplay);
// This populates the dropdowns with the data that is fetched from the database
function fillDropDowns()
{
    let choice = filters[filters.selectedIndex];
    let choiceID = choice.value;
    // This checks to see if the user has selected a filter and if they have, it calls the appropriate fetch
    if (choiceID != "-- No Filter --")
    {
        fetch(`./${choiceID}`)
        .then(response => response.json())
        .then(data => {
            options.innerHTML = `<option>--No Filter--</option>`;
            for(key in data)
            {
                for (value in data[key])
                {
                    options.innerHTML += `<option>${data[key][value]}</option>`;
                }
            }
        });
    }
} 
// This function is called on page load to create an empty table
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
// Function to display unfiltered data
function unfilteredData()
{
    // This calls a generic fetch to get the data from the server
    fetchDataAndDisplay(`./all?page=${pageNum}&pageSize=${pageSize}`, `/count`);
}
// This function is called when the options dropdown is changed
function enableCBtn()
{
    clearBtn.disabled = false;
}
// This function is called when the user clicks the apply button
function resetPageNumAndSize(){
    pageNum = 0;
    pageSize = document.getElementById("rowsDisplay").value;
    applyFilter();
}
// This function is called after the page number and size are reset
// So that errors are not thrown when the user clicks the apply button in the middle of scrolling through the data
function applyFilter(){
    // Set the filteredData variable to true to indicate that the data is filtered
    filteredData = true;
    // Get the selected filter and option from the dropdowns
    let choice = filters[filters.selectedIndex];
    let choiceID = choice.value;
    let option = options[options.selectedIndex];
    let optionID = option.value;
    // If the user selects the default option, display an alert and clear the filter
    if(options.selectedIndex == 0)
    {
        alert("You must select a filter");
        clearFilter();
    }
    else // Otherwise, call the function to display the filtered data
    {
        // This calls a function to get the data from the server
        fetchDataAndDisplay(`./${choiceID}/${optionID}?page=${pageNum}&pageSize=${pageSize}`, `/filter-count?pQuery=${optionID}`);
    }
}
// This function calls a fetch at a passed route to get the data from the server and display it to the table
function fetchDataAndDisplay(firstFetchValue, secondFetchValue)
{
    fetch(firstFetchValue)
    .then(response => response.json())
    .then(data => {
        // This checks to see if the user is on the first page and disables the previous button if they are
        if (pageNum == 0)
        {
            prevButton.disabled = true;
        }
        else
        {
            prevButton.disabled = false;
        }
        // This checks to see how many rows are in the table and if there are less than the page size, it recreates the table
        if (dataTable.rows.length < pageSize + 1)
        {
            emptyTable();
        }
        fetch(secondFetchValue)
        .then(response => response.json())
        .then(count => {
            // This gets the current position in the data
            let curPos = (pageNum + 1) * pageSize - pageSize + 1;
            // This checks displays the current data range being displayed and the total number of records
            if(pageSize * (pageNum+1) < count[0].count)
            {
                curPageInfo.innerHTML = `Displaying ${curPos} - ${pageSize * (pageNum+1)} of ${count[0].count}`;
            }
            else // If it is the last page, it displays the total number of records
            {
                curPageInfo.innerHTML = `Displaying ${curPos} - ${count[0].count} of ${count[0].count}`;
            }
            // This variable gets the total number of pages
            let totalPages = Math.ceil(count[0].count / pageSize);
            // This checks to see if the user is on the last page and disables the next button if they are
            if(pageNum == totalPages - 1)
            {
                nextButton.disabled = true;  
            }
            else
            {
                nextButton.disabled = false;
            }
            // This loops through the data and displays it to the table
            for(let i = 1; i < data.length + 1; i++)
            {
                for (let x = 0; x < 4; x++)
                {
                    dataTable.rows[i].cells[x].innerHTML = data[i-1][Object.keys(data[i-1])[x]];
                }
            }
            // This checks to see if there are less records than the page size and removes the extra rows
            if (data.length < pageSize)
            {
                let choice = options[options.selectedIndex];
                let choiceID = choice.value;
                for(let i = 0; i < pageSize - data.length; i++)
                {
                    // Checks to see if the value in the row is not the same as the selected option and if it is not, it removes the row
                    if (dataTable.rows[data.length+1].cells[filters.selectedIndex].innerHTML != choiceID)
                    {
                        // Remove the last row
                        dataTable.rows[data.length+1].remove();
                    }
                }
            }
        });
    });
}
// This function is called when the user clicks the clear button to clear the filter and display the unfiltered data
function clearFilter(){
    clearBtn.disabled = true;
    filteredData = false;
    filters.selectedIndex = 0;
    options.selectedIndex = 0;
    unfilteredData();
}
// This function is called when the user clicks the previous button to go to the previous page
function previous()
{
    // This removes the focus from the button
    prevButton.blur();
    pageNum--;
    checkFilter();
}
// This function is called when the user clicks the next button to go to the next page
function next()
{
    nextButton.blur();
    pageNum++;
    checkFilter();
}
// This function is called when the user changes the number of rows to display
function rowsToDisplay()
{
    pageNum = 0;
    pageSize = rowsDisplay.value;
    // Recreates the table based on the new page size
    emptyTable();
    checkFilter();
}
// This function checks to see if the data is filtered and calls the appropriate function
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