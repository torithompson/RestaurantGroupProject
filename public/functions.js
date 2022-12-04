let filteredData = false;
let pageNum = 0;
let pageSize = 5;
function applyFilter(){
    
    filteredData = true;
    let filters = document.getElementById("filters");
    let choice = filters[filters.selectedIndex];
    let choiceID = choice.value;
    let options = document.getElementById("options");
    let option = options[options.selectedIndex];
    if(options.selectedIndex == 0)
    {
        alert("You must select a filter");
    }
    else{
    let optionID = option.value;
    let dataTable = document.getElementById("mainTable");
    dataTable.innerHTML = "";
    if(choiceID == "country")
    {
        fetch(`./country/${optionID}?page=${pageNum}&pageSize=${pageSize}`)
        .then(response => response.json())
        .then(data => {
            if (pageNum == 0)
            {
                document.getElementById("prevButton").disabled = true;
            }
            else
            {
                document.getElementById("prevButton").disabled = false;
            }
            fetch(`/filter-count?pQuery=${optionID}`)
            .then(response => response.json())
            .then(count => {
                let curPageInfo = document.getElementById("pageInfo");

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
                    document.getElementById("nextButton").disabled = true;  
                }
                else
                {
                    document.getElementById("nextButton").disabled = false;
                }
                dataTable.innerHTML =`<tr><th>Name</th>
                <th>Country</th>
                <th>City</th>
                <th>Cuisine</th></tr>`;
                for(let i = 0; i < data.length; i++)
                {
                    dataTable.innerHTML += 
                    `<tr>
                        <td>${data[i].name}</td>
                        <td>${data[i].country}</td>
                        <td>${data[i].city}</td>
                        <td>${data[i].cuisine}</td>  
                    </tr>`;
                }
            });
        });
    }
    else if(choiceID == "cities")
    {
        fetch(`./city/${optionID}?page=${pageNum}&pageSize=${pageSize}`)
        .then(response => response.json())
        .then(data => {
            console.log("here");
            if (pageNum == 0)
            {
                document.getElementById("prevButton").disabled = true;
            }
            else
            {
                document.getElementById("prevButton").disabled = false;
            }
            fetch(`/filter-count?pQuery=${optionID}`)
            .then(response => response.json())
            .then(count => {
                let curPageInfo = document.getElementById("pageInfo");

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
                    document.getElementById("nextButton").disabled = true;  
                }
                else
                {
                    document.getElementById("nextButton").disabled = false;
                }
                dataTable.innerHTML +=`<tr><th>Name</th>
                <th>Country</th>
                <th>City</th>
                <th>Cuisine</th></tr>`;
                for(let i = 0; i < data.length; i++)
                {
                    dataTable.innerHTML += 
                    `<tr>
                        <td>${data[i].name}</td>
                        <td>${data[i].country}</td>
                        <td>${data[i].city}</td>
                        <td>${data[i].cuisine}</td>  
                    </tr>`;
                }
            });
        });
    }
    else if(choiceID == "cuisine")
    {
        fetch(`./cuisine/${optionID}?page=${pageNum}&pageSize=${pageSize}`)
        .then(response => response.json())
        .then(data => {
            if (pageNum == 0)
            {
                document.getElementById("prevButton").disabled = true;
            }
            else
            {
                document.getElementById("prevButton").disabled = false;
            }
            fetch(`/filter-count?pQuery=${optionID}`)
            .then(response => response.json())
            .then(count => {
                let curPageInfo = document.getElementById("pageInfo");

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
                    document.getElementById("nextButton").disabled = true;  
                }
                else
                {
                    document.getElementById("nextButton").disabled = false;
                }
                dataTable.innerHTML +=`<tr><th>Name</th>
                <th>Country</th>
                <th>City</th>
                <th>Cuisine</th></tr>`;
                for(let i = 0; i < data.length; i++)
                {
                    dataTable.innerHTML += 
                    `<tr>
                        <td>${data[i].name}</td>
                        <td>${data[i].country}</td>
                        <td>${data[i].city}</td>
                        <td>${data[i].cuisine}</td>  
                    </tr>`;
                }
            });
        });
    }
    }
}
function resetFilter(){
    pageNum = 0;
    pageSize = document.getElementById("rowsDisplay").value;
    applyFilter();
}
function clearFilter(){
    if (document.getElementById("filters").selectedIndex != 0 || document.getElementById("options").selectedIndex != 0)
    {
        filteredData = false;
        let dataTable = document.getElementById("mainTable");
        dataTable.innerHTML = "";
        document.getElementById("filters").selectedIndex = 0;
        document.getElementById("options").selectedIndex = 0;
        unfilteredData();
    }
}
function unfilteredData()
{
    fetch(`./all?page=${pageNum}&pageSize=${pageSize}`)
    .then(response => response.json())
    .then(data => {
        if (pageNum == 0)
        {
            document.getElementById("prevButton").disabled = true;
        }
        else
        {
            document.getElementById("prevButton").disabled = false;
        }
        fetch(`/count`)
        .then(response => response.json())
        .then(count => {
            let totalPages = Math.ceil(count[0].count / pageSize);
            let curPageInfo = document.getElementById("pageInfo");
            curPageInfo.innerHTML = `Displaying ${(pageNum + 1) * pageSize - pageSize + 1} - ${pageSize * (pageNum+1)} of ${count[0].count}`;
            if(pageNum == totalPages - 1)
            {
                document.getElementById("nextButton").disabled = true;
            }
            else
            {
                document.getElementById("nextButton").disabled = false;
            }

            let dataTable = document.getElementById("mainTable");
            dataTable.innerHTML =`<tr><th>Name</th>
            <th>Country</th>
            <th>City</th>
            <th>Cuisine</th></tr>`;
            for(let i = 0; i < data.length; i++)
            {
                dataTable.innerHTML += `<tr>
                <td>${data[i].name}</td>
                <td>${data[i].country}</td>
                <td>${data[i].city}</td>
                <td>${data[i].cuisine}</td>  
                </tr>`;
            }
        });
    });
}
function rowsToDisplay()
{
    pageNum = 0;
    pageSize = document.getElementById("rowsDisplay").value;
    if(filteredData)
    {
        applyFilter();
    }
    else
    {
        unfilteredData();
    }
}
function previous()
{
    pageNum--;
    if(filteredData)
    {
        applyFilter();
    }
    else
    {
        unfilteredData();
    }
}
function next()
{
    console.log(filteredData);
    pageNum++;
    if(filteredData)
    {    
        applyFilter();
    }
    else
    {    
        unfilteredData();
    }
}

function fillDropDowns()
{
    let filters = document.getElementById("filters");
        let choice = filters[filters.selectedIndex];
        let choiceID = choice.value;
        let options = document.getElementById("options");
        if(choiceID == "country")
        {
            fetch("./countries")
            .then(response => response.json())
            .then(data => {
                options.innerHTML = `<option>--No Filter--</option>`;
                for(let i = 0; i < data.length; i++)
                {
                    options.innerHTML += `<option>${data[i].country}</option>`;
                }
            });
        }
        else if(choiceID == "cities")
        {
            fetch("./cities")
            .then(response => response.json())
            .then(data => {
                options.innerHTML = `<option>--No Filter--</option>`;
                for(let i = 0; i < data.length; i++)
                {
                    options.innerHTML += `<option>${data[i].city}</option>`;
                }
            });
        }
        else if(choiceID == "cuisine")
        {
            fetch("./cuisines")
            .then(response => response.json())
            .then(data => {
                options.innerHTML = `<option>--No Filter--</option>`;
                for(let i = 0; i < data.length; i++)
                {
                    options.innerHTML += `<option>${data[i].cuisine}</option>`;
                }
            });
        }
}
