// Store the value of the user input in the search box
var city = $(`#searchCity`).val();
// Store the value of the API key
const apiKey = `&appid=4cacb3ab041418253b8abd5130a34093`;
// Sets variable to current date
const date = new Date();
console.log(date);

// Forces user input in search box to auto-capitalize first letter and lower case all following
jQuery(document).ready(function($) {
    $('#searchCity').keyup(function(event) {
        const textBox = event.target;
        const start = textBox.selectionStart;
        const end = textBox.selectionEnd;
        textBox.value = textBox.value.charAt(0).toUpperCase() + textBox.value.slice(1).toLowerCase();
        textBox.setSelectionRange(start, end);
    })
});

// Lets user click search button with ENTER key
// When you press ENTER key within the City search bar
$(`#searchCity`).keypress(function(event) {
    // Only if user pressed the enter key
    if (event.keyCode === 13) { 
        // Prevent user text from resetting
		event.preventDefault();
        // Click search button
		$(`#searchBtn`).click(); 
	} 
});

// On search button click
$(`#searchBtn`).on(`click`, function() {
    // Show the Weather Info section
    $('main').removeClass('hide');
    // Show the City History section
    $('div').removeClass('hide');
    // Get the value of the search box from user input
    city = $(`#searchCity`).val();
    // Clear search box
    $(`#searchCity`).val(``);  
  
    // Full url to call API
    const queryUrl = `https://api.openweathermap.org/data/2.5/weather?q=` + city + apiKey;
  
    // Make API Request
    $.ajax({
        url: queryUrl,
        method: `GET`
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
    
        makeList();
        getCurrentConditions(response);
        // getCurrentForecast(response);
        
    
      })
});
  
// Create City History
function makeList() {
    // Create list elements with a bootstrap class and text of user entered city
    const listCity = $(`<li>`).addClass(`list-group-item`).attr(`data-value`, city).text(city);
    // Put the listCity content into any list-group class's
    $(`.list-group`).append(listCity);
}

function getCurrentConditions (response) {

    // Get the temperature and convert to fahrenheit 
    let tempF = (response.main.temp - 273.15) * 1.80 + 32;
    tempF = Math.floor(tempF);

    $('#currentWeather').empty();

    // Get and set city weather in a card 
    const card = $(`<div>`).addClass(`card`);
    const cardBody = $(`<div>`).addClass(`card-body`);
    let city = $(`<h4>`).addClass(`card-title`).text(response.name);
    // Set the current date in card
    const cityDate = $(`<h4>`).addClass(`card-title`).text(date.toLocaleDateString('en-US'));
    // Set current temperature in fahrenheit
    const temperature = $(`<p>`).addClass(`card-text current-temp`).text(`Temperature: ` + tempF + ` °F`);
    // Set current humidity
    const humidity = $(`<p>`).addClass(`card-text current-humidity`).text(`Humidity: ` + response.main.humidity + `%`);
    // Set current wind speed
    const wind = $(`<p>`).addClass(`card-text current-wind`).text(`Wind Speed: ` + response.wind.speed + ` MPH`);
    // Set icon to match current weather
    const image = $(`<img>`).attr(`src`, `https://openweathermap.org/img/w/` + response.weather[0].icon + `.png`)

    // Add to page
    city.append(cityDate, image)
    cardBody.append(city, temperature, humidity, wind);
    card.append(cardBody);
    $(`#currentWeather`).append(card)
}