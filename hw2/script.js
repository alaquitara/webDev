//referenced https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Traversing_an_HTML_table_with_JavaScript_and_DOM_Interfaces
function buildTable() {
     //Reference for body
   var body = document.getElementsByTagName("body")[0];   // creates a <table> element and a <tbody> element
     //Creates html table and tbody elements
    var table     = document.createElement("table"); 
    var tableBody = document.createElement("tbody");   // creating all cells
     //creates the cells
    for (var i = 1; i < 5; i++) {    // creates a table row
        //create table rows   
        var row = document.createElement("tr");    
        for (var j = 1; j < 5; j++) {      // Create a <td> element and a text node, make the text
                  // node the contents of the <td>, and put the <td> at
                  // the end of the table row
            //if create the header row.
            if (i == 1) {
                var cell = document.createElement("th");     
                var cellText = document.createTextNode("Header " + j);     
                cell.appendChild(cellText);     
                row.appendChild(cell);
            //else create the regular rows
            } else {     
                var cell = document.createElement("td");     
                var cellText = document.createTextNode(i - 1 + " , " + j);     
                cell.appendChild(cellText);     
                row.appendChild(cell);
            }   
        }    
         // add the row to the end of the table body  
        tableBody.appendChild(row); 
    }   // put the <tbody> in the <table>
     
    table.appendChild(tableBody);  // appends <table> into <body>
     
    body.appendChild(table);  // sets the border to 2
     //sets the borderWidth to 1 pixel
    table.setAttribute("border", "1px");
}

//Function changes the selected cell border to stand out
function selCell(x){
	x.setAttribute("id", "selected");
	x.style.border ="2px solid black";
}

//Function changes the selected cell background to yellow
function mark(){
	var x = document.getElementById("selected");
	x.style.background = "yellow";
}

//Creates the buttons for navigating the table.  Buttons are up down left right and mark.
function buildButtons() {
    buttons = ["up", "down", "left", "right", "Mark Cell"];
	
	buttons.forEach(function (direction){ // for every button in buttons array
		//create each button
		var move = document.createElement ("button");
		move.id = direction;
		move.textContent = direction;
		//adds button to page
		document.body.appendChild(move);
		//adds an even listener for the botton to click
		//Fuction takes the direction passed and calls a movement function accordingly.
		document.getElementById(direction).addEventListener("click", function(){
			
			if(direction === "Mark Cell"){
				mark();
			}
			else{
				if(direction == "up"){
					move_up();
				}
				else if(direction == "down"){
					move_down();
				}
				else if(direction == "left"){
					move_left();
				}
				else if(direction == "right"){
					move_right();
				}
				
			}
		});
	});
}

//Function will navigate upward on the table so long as the top row is not already selected
function move_up() {
    cur = document.getElementById("selected"); 
    //check to see if the top row is already selected.
    if (cur.parentNode.rowIndex <= 1) {

        return;
    }
	
	//place holder variable for swap
    var temp = cur.cellIndex;
	//Change the current cell back to normal style
	cur.removeAttribute("id"); 
	cur.style.borderWidth = "1px";
    cur = cur.parentNode;
    cur = cur.previousElementSibling;
    cur = cur.firstElementChild;
    
    for (var i = 0; i < temp; i++) {
        cur = cur.nextElementSibling;
    }
	//update the new current style and id
    cur.style.borderWidth = "4px"; 
    cur.id = "selected"; 
}

//Function will navigate down on the table so long as the bottom row is not already selected.  Follows same format as move_up()
function move_down() {

    cur = document.getElementById("selected");  
      //check to see if bottom row is already selected
    if (cur.parentNode.rowIndex >= 3) {

        return;
    }
    var temp = current.cellIndex; 
    cur.style.borderWidth = "1px";
    cur.removeAttribute("id");
    cur = cur.parentNode;
    cur = cur.nextElementSibling;
    cur = cur.firstElementChild;
    for (var i = 0; i < temp; i++) {
        cur = cur.nextElementSibling;
    }
    cur.style.borderWidth = "4px";
    cur.id = "selected";
}

//Function will navigate left on the table so long as the leftmost column is not already selected.  Follows same format as move_up()
function move_left() {
    cur = document.getElementById("selected");
  ////check to see if left column is already selected
    if (cur.cellIndex == 0) {
        return;

    } else {
        cur.style.borderWidth = "1px";
        cur.removeAttribute("id");
        cur = cur.previousElementSibling;
        cur.style.borderWidth = "4px";
        cur.id = "selected";
    }
}

//Function will navigate right on the table so long as the rightmost column is not already selected.  Follows same format as move_up()
function move_right() {
    cur = document.getElementById("selected");
    //check to see if the far right column is already selected.
    if (cur.cellIndex == 3) {
        return;

    }
    cur.style.borderWidth = "1px";
    cur.removeAttribute("id");
    cur = current.nextElementSibling;
    cur.style.borderWidth = "4px";
    cur.id = "selected";
}



buildTable();
buildButtons();

var current = document.getElementsByTagName("td")[0];
current.id = "selected";
current.style.borderWidth = "4px";
