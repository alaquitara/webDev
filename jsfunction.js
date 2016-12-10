
var me = "Alex";
console.log(intro(me));

function intro(name){
	return "Hello, my name is " + name;
};

var greating = function(){
	return intro(me) + ". Nice to meet you";
};

console.log(greating());
