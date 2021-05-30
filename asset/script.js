var APIKey = `4cacb3ab041418253b8abd5130a34093`;
var city;
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

fetch(queryURL);
console.log(queryURL);