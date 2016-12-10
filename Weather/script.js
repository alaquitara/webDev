var apikey = "9d992d860b11a299346fa71c31885b5c";
  
document.getElementById("zip").addEventListener('click', function (event){
	var req= new XMLHttpRequest();
	var weather = document.getElementById("zipcode").value;
	req.open("GET","http://api.openweathermap.org/data/2.5/weather?zip="+weather +",us&units=imperial&appid="+apikey, true);
	req.addEventListener("load", function(){
		if(req.status >=200 && req.status < 400){
			var response = JSON.parse(req.responseText);
			document.getElementById("city").textContent = response.name;
			document.getElementById("temp").textContent = response.main.temp;
			document.getElementById("humid").textContent = response.main.humidity;
		}
		else
			console.log("Error in network request: " + request.statusText);
		})
					
	req.send(null);
	event.preventDefault();
})

document.getElementById("loc").addEventListener('click', function (event){
	var req= new XMLHttpRequest();
	var weather = document.getElementById("location").value;
	req.open("GET","http://api.openweathermap.org/data/2.5/weather?q="+weather +"&units=imperial&appid="+apikey, true);
	req.addEventListener("load", function(){
		if(req.status >=200 && req.status < 400){
			var response = JSON.parse(req.responseText);
			document.getElementById("city").textContent = response.name;
			document.getElementById("temp").textContent = response.main.temp;
			document.getElementById("humid").textContent = response.main.humidity;		
		}
		else
			console.log("Error " + request.statusText);
	})
					
	req.send(null);
	event.preventDefault();
})

document.getElementById("textSub").addEventListener('click',function(){
	var req= new XMLHttpRequest();
	var payload = {postText: null};
	payload.postText= document.getElementById("postText").value;
	req.open("POST", "http://httpbin.org/post", true);
	req.setRequestHeader("Content-type", "application/json");
	req.addEventListener("load", function(){
		if(req.status >=200 && req.status < 400){
			var response = JSON.parse(req.responseText);
			console.log(response);
			document.getElementById("things").textContent = response.data;
		}
		else
			console.log("NETWORK REQUEST ERROR: " + request.statusText);
	})
	req.send(JSON.stringify(payload));
	event.preventDefault();
})