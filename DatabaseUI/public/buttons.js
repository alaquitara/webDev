// create an edit button to be placed in each row in the table 
function editBtn() {
    var edit = document.createElement('input');
    edit.setAttribute("type", "submit");
    edit.setAttribute("name", "edit");
    edit.setAttribute("value", "Edit");
    edit.setAttribute("class", "btn btn-default");
    return edit;
}

//create a delete button to be placed in each row in the table 
function deleteBtn() {
    var del = document.createElement('input');
    del.setAttribute("type", "submit");
    del.setAttribute("name", "delete");
    del.setAttribute("value", "Delete");
    del.setAttribute("class", "btn btn-danger");
    del.setAttribute("onclick", "deleteWorkout(event, 'excerciseTable')");
    return del;
}

//Loop through each row and add edit and delete buttons
var tbody = document.getElementById("table-body");
var rows = tbody.getElementsByTagName('tr');
for (var i = 0; i < rows.length; i++) {
    var edit = editBtn();
    var del = deleteBtn();
    var forms = rows[i].querySelectorAll('form');
    forms[0].appendChild(edit);
    forms[1].appendChild(del);
}

//Builds a query string when adding a new element to the table
function getQuery(rep, wt, date, lb) {
    var queryString = '';
    if (rep != '') {
        queryString += "&reps=" + rep;
    }
    if (wt != '') {
        queryString += "&weight=" + wt;
    }
    if (date != '') {
       queryString += "&date=" + date;
    }
    if (lb != '') {
       queryString += "&lbs=" + lb;
    }
    return queryString;
}

//function to get today's date
function today() {
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth();
    month++; 
    var year = date.getFullYear();
    // formats date to YYYY-MM-DD
    if (month < 10) {
        month = '0' + month;
    }
    if (day < 10) {
        day = '0' + day;
    }
    date = year + '-' + month + '-' + day;
    return date;
}

document.getElementById('date').value = today(); // Put today's date in date form field

document.addEventListener("DOMContentLoaded", addWorkout);

function addWorkout() {
    document.getElementById("submit").addEventListener("click", function(event){
        var req = new XMLHttpRequest();
        var name = document.getElementById("name").value;
        var reps = document.getElementById("reps").value;
        var weight = document.getElementById("weight").value;
        var date = document.getElementById("date").value;
        var lbs = '';
        //check to see if lbs, kg or null
        var radio = document.getElementsByName("lbs");
        for (var i = 0; i < radio.length; i++) {
            if (radio[i].checked) {
                lbs = radio[i].value;
            }
        }
        var query = getQuery(reps, weight, date, lbs); 
		//data validation
        if (name !== '' && (reps >= 0 || reps == '') && (weight >= 0 || weight == '')) {
            req.open("GET", "/insert?n=" + name + query, true);
            // Once response is recieved a new row is added
            req.addEventListener("load", function() {
                var response = JSON.parse(req.responseText);
                var tbody = document.getElementById("table-body");
                var row = document.createElement('tr');
                var td = document.createElement('td');
                td.textContent = response[0].name;
                row.appendChild(td);
                td = document.createElement('td');
                td.textContent = response[0].reps;
                row.appendChild(td);
                td = document.createElement('td');
                td.textContent = response[0].weight;
                row.appendChild(td);
                td = document.createElement('td');
                td.textContent = response[0].date;
                row.appendChild(td);
                td = document.createElement('td');
                td.textContent = response[0].lbs;
                row.appendChild(td);
                var edit = editBtn();
                var del = deleteBtn();
                td = document.createElement('td');
                td.setAttribute("class", "edit-delete");
                var form = document.createElement('form');
                form.setAttribute("action", "/edit");
                form.setAttribute("method", "GET");
                var input = document.createElement('input');
                input.setAttribute("type", "hidden");
                input.setAttribute("name", "editId");
                input.setAttribute("value", response[0].id);
                form.appendChild(input);
                form.appendChild(edit);
                td.appendChild(form);
                row.appendChild(td);
                td = document.createElement('td');
                td.setAttribute("class", "edit-delete");
                form = document.createElement('form');
                input = document.createElement('input');
                input.setAttribute("type", "hidden");
                input.setAttribute("name", "id");
                input.setAttribute("value", response[0].id);
                form.appendChild(input);
                form.appendChild(del);
                td.appendChild(form);
                row.appendChild(td);
                tbody.appendChild(row);
            });
            req.send(null);
            document.getElementById("name").value = '';
            document.getElementById("reps").value = '';
            document.getElementById("weight").value = '';
            document.getElementById("date").value = today();
            for (var i = 0; i < radio.length; i++) {
                if(radio[i].checked) {
                    radio[i].checked = false;
                }
            }
            event.preventDefault();
        }
    })
}

// Delete row from table. Referenced the provided JS fiddle https://jsfiddle.net/GRgMb/.
function deleteWorkout(event, excerciseTable) {
    var req = new XMLHttpRequest();
    var form = event.target.parentNode;
    var inputs = form.getElementsByTagName('input');
    var id = inputs[0].value;
    req.open("GET", "/delete?deleteId=" + id, true);
    req.addEventListener("load", function() {
        var table = document.getElementById("excerciseTable");
        var rowCount = table.rows.length;
        for (var i = 0; i < rowCount; i++) {
            var row = table.rows[i];
            if (row == event.target.parentNode.parentNode.parentNode) {
                table.deleteRow(i);
                rowCount--;
                i--;
            }
        }
    });
    req.send(null);
    event.preventDefault();
}
