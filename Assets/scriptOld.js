var userformmainEl = document.querySelector('#user-form-main')
var cityIdEl = document.querySelector(".formInput")
var cardDateEl = document.querySelector(".card-date");
var cardIconEl = document.querySelector(".card-icon");
var cardTempEl = document.querySelector(".card-temp");
var cardWindEl = document.querySelector(".card-wind");
var cardHumidityEl = document.querySelector(".card-humidity");
// var data = data;
// api.openweathermap.org/data/2.5/forecast?q=Toronto&appid=cc86632db1a12bed0499b6fb11a002de
console.log("main hi");


var cityname = cityIdEl.value()
console.log("city name = ",cityname)

// userformmainEl.addEventListener('submit',formSubmitHandler)
// searchedHistoryEl.addEventListener('click',buttonClickHandler)


// var formSubmitHandler = function(event){
//   event.prevent.Default()
//   var city = cityIdEl.value().trim()
//   console.log("city name = ",city)
  
//   if(city){
//     getApi(city)
//     cityIdEl.value=''
//   }
//   else{
//     alert('Please enter city name')
//   }
// }


// var buttonClickHandler = function (event){
//   console.log("btn =",event.target)
//   var SearchHistorycity=event.target.value()

//   if(SearchHistorycity){
//     getApi(SearchHistorycity)
//   }
// }


// var getApi = function (city) {
//   console.log("get api hi");
//   const weatherUrl =
//   `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=cc86632db1a12bed0499b6fb11a002de`
//     // https://api.openweathermap.org/data/2.5/forecast?q=Toronto&appid=cc86632db1a12bed0499b6fb11a002de";
//   // fetch(weatherUrl,{
//   //     method:"GET",
//   //     headers:{
//   //         'Content-Type':'application/json',
//   //         'Access-Control-Allow-Origin': '*',
//   //     }
//   // })

//   fetch(weatherUrl)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       console.log("date = ", data.list[0].dt_txt);
//       console.log("icon = ", data.list[0].weather[0].icon);
//       console.log("description = ", data.list[0].weather[0].description);
//       console.log("temp = ", data.list[0].main.temp);
//       console.log("wind = ", data.list[0].wind.speed);
//       console.log("humidity = ", data.list[0].main.temp);

//       cardDateEl.textContent = data.list[0].dt_txt;
//       cardIconEl.textContent = data.list[0].weather[0].icon;
//       cardTempEl.textContent = data.list[0].main.temp;
//       cardWindEl.textContent = data.list[0].wind.speed;
//       cardHumidityEl.textContent = data.list[0].main.temp;
//     });
//   // card()
// }

// function card() {
//   // cardTempEl.textContent = data.list[0].dt_txt
// }

