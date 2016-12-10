function Automobile( year, make, model, type ){
    this.year = year; //integer (ex. 2001, 1995)
    this.make = make; //string (ex. Honda, Ford)
    this.model = model; //string (ex. Accord, Focus)
    this.type = type; //string (ex. Pickup, SUV)
}

var automobiles = [ 
    new Automobile(1995, "Honda", "Accord", "Sedan"),
    new Automobile(1990, "Ford", "F-150", "Pickup"),
    new Automobile(2000, "GMC", "Tahoe", "SUV"),
    new Automobile(2010, "Toyota", "Tacoma", "Pickup"),
    new Automobile(2005, "Lotus", "Elise", "Roadster"),
    new Automobile(2008, "Subaru", "Outback", "Wagon")
    ];

Automobile.prototype.logMe = function ( typeTrue ){
    var output = this.year + " " + this.make + " " +this.model + " ";
    
	if (typeTrue) 
	{ 
        output += this.type;
    }
    console.log(output);
}	

	
/*This function sorts arrays using an arbitrary comparator.
 You pass it a comparator and an array of objects appropriate 
 for that comparator and it will return a new array which is 
 sorted with the largest object in index 0 and the smallest in the last index*/
//Referenced http://www.stoimen.com/blog/2010/07/09/friday-algorithms-javascript-bubble-sort/
 function sortArr(compare,  array )
{
    var swapped;
    do 
	{
        swapped = false;
        for (var i=array.length -1; i >= 0; i--) 
		{
			for(var x =0; x< i; x++)
			{
				//bubble sort
				if (compare(array[x], array[x+1])) 
				{
					var temp = array[x];
					array[x] = array[x+1];
					array[x+1] = temp;
					swapped = true;
				}
			}
		}
    } while (swapped);
}

/*A comparator takes two arguments and uses some algorithm to compare them. 
If the first argument is larger or greater than the 2nd it returns true, 
otherwise it returns false. Here is an example that works on integers*/
function exComparator( int1, int2){
    if (int1 > int2)
	{
        return true;
    }
	else 
	{
        return false;
    }
}

/*For all comparators if cars are 'tied' according to the comparison rules 
then the order of those 'tied' cars is not specified and either can come first*/

/*This compares two automobiles based on their year. Newer cars are "greater" than older cars.*/
function yearComparator( auto1, auto2){
    
    if(auto1.year <= auto2.year )
	{
		return true;
    } 
	else 
	{
        return false;
    }
}

/*This compares two automobiles based on their make. It should be case insensitive and makes
which are alphabetically earlier in the alphabet are "greater" than ones that come later.*/
function makeComparator( auto1, auto2){
    /* your code here*/
	var make1 = auto1.make.toLowerCase();
	var make2 = auto2.make.toLowerCase();
	
	if(make1 >= make2)
	{
		return true;
	}
	else
	{
		return false;
	}
}

/*This compares two automobiles based on their type. The ordering from "greatest" to "least" 
is as follows: roadster, pickup, suv, wagon, (types not otherwise listed). 
It should be case insensitive. If two cars are of equal type then the newest one by model year should be considered "greater".*/

function typeComparator( auto1, auto2){
    
	var types = [ "wagon" , "suv", "pickup", "roadster"];
	type1 = auto1.type.toLowerCase();
	type2 = auto2.type.toLowerCase();
	
	//referenced https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
	if(types.indexOf(type1) < types.indexOf(type2))
	{
		return true;
	}
	//if equal type the newer of the two is greater
	else if (types.indexOf(type1) == types.indexOf(type2))
	{
		return yearComparator(auto1, auto2);
	}
	
	else
		return false;
	
}

/*Your program should output the following to the console.log, 
including the opening and closing 5 stars. All values in parenthesis 
should be replaced with appropriate values. Each line is a seperate call to console.log.

Each line representing a car should be produced via a logMe function. 
This function should be added to the Automobile class and accept a single boolean
 argument. If the argument is 'true' then it prints "year make model type" with
 the year, make, model and type being the values appropriate for the automobile. 
 If the argument is 'false' then the type is ommited and just the "year make model" is logged. */

//*****
console.log("*****");

//The cars sorted by year are:
console.log("The cars sorted by year are:");
sortArr(yearComparator, automobiles);
for (var i = 0; i < automobiles.length; i++) 
{
  automobiles[i].logMe(false);
}
console.log();

//The cars sorted by make are:
console.log("The cars sorted by make are:");
sortArr(makeComparator, automobiles);
for(var i=0; i< automobiles.length; i++)
{
	automobiles[i].logMe(false);
}
console.log();

//The cars sorted by type are:
console.log("The cars sorted by type are:");
sortArr(typeComparator, automobiles);
for(var i =0; i<automobiles.length; i++)
{
	automobiles[i].logMe(true);
}

console.log("*****");

