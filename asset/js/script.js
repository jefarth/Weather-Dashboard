// Store the value of the user input in the search box
var city = $(`#searchCity`).val();

// Store the value of the API key !!!!!! Need to remove to hidden folder
var apiKey = `&appid=4cacb3ab041418253b8abd5130a34093`;

// Sets variable to current date
let date = new Date();
console.log(date);

// Lets user click search button with ENTER key
// When you press ENTER key within the City search bar
$("#searchCity").keypress(function(event) {
    // Only if user pressed the enter key
    if (event.keyCode === 13) { 
        // Prevent user text from resetting
		event.preventDefault();
        // Click search button
		$("#searchBtn").click(); 
	} 
});

// On search button click
$("#searchBtn").on("click", function() {
    // Show the Weather Info section
    $('main').removeClass('hide');
    // Get the value of the search box from user input
    city = $("#searchCity").val();
    // Clear search box
    $("#searchCity").val("");  
  
    // Full url to call API
    const queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + apiKey;
  
    // Make API Request
    $.ajax({
        url: queryUrl,
        method: "GET"
    })
    .then(function (response){
        // All data API returned
        console.log(response)
        // Name of the City
        console.log(response.name)
        // Icon for weather type
        console.log(response.weather[0].icon)

        // Get the temperature and convert to fahrenheit 
        let tempF = (response.main.temp - 273.15) * 1.80 + 32;
        // Temperature displayed rounded down
        console.log(Math.floor(tempF))
        // Humidity displayed
        console.log(response.main.humidity)
        // Wind Speed displayed
        console.log(response.wind.speed)
    
        getCurrentConditions(response);
        getCurrentForecast(response);
        makeList();
    
      })
});
  