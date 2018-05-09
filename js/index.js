$.ajax({
  // request coordiantes
  type: "GET",
  url: "https://ipinfo.io/json/",
  success: getCoordinates
});

function getCoordinates(data) {
  //puts requested JSON information into usable variables
  console.log(data);
  var coords = data.loc;
  var city = data.city;
  var region = data.region;
  var country = data.country;

  var darkSkyURL = // URL for requesting weather information
 "https://api.darksky.net/forecast/2cd70799511e551ea65028fd7ec5fadb/" +
    coords;
  getWeather(darkSkyURL);
  showLocation(city, region, country);
}

function showLocation(city, region, country) {
  // displays location information
  if(city=="") {
    $("#city-box").text("Geolocation Error");
  } else {
      $("#city-box").text(city);
  }
  if(region==""){
      $("#region-country-box").text("Missing locations names!");
  } else {
  $("#region-country-box").text(region + ", " + country); 
  }
}

function getWeather(darkSkyURL) {
  // requests local weather info
  $.ajax({
    type: "GET",
    url: darkSkyURL,
    dataType: "jsonp",
    success: weatherMath
  });

  function weatherMath(data1) {
    // creates usable icon and weather variables
    var temp = Math.round(data1.currently.temperature);
    var icon = data1.currently.icon;
    console.log(icon, temp);
    $("#summary-box").text(data1.currently.summary);
    showWeather(icon, temp);
  }

  function showWeather(icon, temp) {
    //changes colors of the icons
    var skycons = new Skycons();
    skycons.add("skycon-box", icon);
    skycons.play(); // displays and runs icon animation

    var tempCelse = Math.round((temp - 32) * 5 / 9);
    $("#temp-box").text(temp + "°"); //converts to emperial

    $(function() {
      // toggle between celcius and emperial
      $("#tempToggle").change(function() {
        if ($(this).prop("checked")) {
          $("#temp-box").html(tempCelse + "° ");
        } else {
          $("#temp-box").html(temp + "° ");
        }
      });
    });
  }
}