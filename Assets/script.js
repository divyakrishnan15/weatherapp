
var userFormEl = document.querySelector('#user-form');
var nameInputEl = document.querySelector('#username');
var cityBtnEl = document.querySelector('.city-btn')
var cardCityEl = document.querySelector(".citycard-city");
var cardCountryEl = document.querySelector(".citycard-country");
var cardDateEl = document.querySelector(".citycard-date");
var cardIconEl = document.querySelector(".citycard-icon");
var cardDescEl = document.querySelector(".citycard-desc");
var cardTempEl = document.querySelector(".citycard-temp");
var cardWindEl = document.querySelector(".citycard-wind");
var cardHumidityEl = document.querySelector(".citycard-humidity");
var searchedHistoryEl = document.querySelector('.list-group')

var languageButtonsEl = document.querySelector('#language-buttons');
var repoContainerEl = document.querySelector('#repos-container');
var repoSearchTerm = document.querySelector('#repo-search-term');
var data = data

var weatherLSdata = JSON.parse(localStorage.getItem('weatherLS')) || {}
console.log("Local Storage = ",weatherLSdata)



var formSubmitHandler = function (event) {
  event.preventDefault();
  var city = nameInputEl.value.trim();
  console.log("city = ",city)
  if (city) {
    getApiData(city);
    getGoogleApiData(city)
    nameInputEl.value = '';
  } else {
    alert('Please enter a City name');
  }
};

userFormEl.addEventListener('submit', formSubmitHandler);

var getGoogleApiData = function (city) {
  var apiUrl = 'https://www.google.com/maps/embed/v1/place?key=AIzaSyCy8PFgy7uGcwPxftTH3mYHuGuUDjb_gnM&q='+city

  document.querySelector('.google-maps').src=apiUrl

  initMap()
}

var getApiData = function (city) {
    var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q='+city+'&appid=cc86632db1a12bed0499b6fb11a002de'
   
    fetch(apiUrl)
      .then(function (response) {
        if (response.ok) {
          console.log(response);
          response.json().then(function (data) {
            console.log("data ===== ",data);
            console.log("api city = ", data.city.name);
            console.log("api country = ", data.city.country);
            console.log("api lat = ", data.city.coord.lat);
            console.log("api long = ", data.city.coord.lon);
            console.log("date = ", data.list[0].dt_txt);
            console.log("icon = ", data.list[0].weather[0].icon);
            console.log("description = ", data.list[0].weather[0].description);
            console.log("temp = ", data.list[0].main.temp);
            console.log("wind = ", data.list[0].wind.speed);
            console.log("humidity = ", data.list[0].main.temp);


            weatherLSdata[data.city.name]={
                city:data.city.name,
                country: data.city.country,
                latitude:data.city.coord.lat,
                longitute:data.city.coord.lon,
                date:data.list[0].dt_txt,
                icon:data.list[0].weather[0].icon,
                description:data.list[0].weather[0].description,
                temperature:data.list[0].main.temp,
                wind:data.list[0].wind.speed,
                humidity:data.list[0].main.humidity,
    
            } 
            
            localStorage.setItem('weatherLS',JSON.stringify(weatherLSdata))

            todayForecast(data)
            set5DayForecast(city,data)

            initMap()
          })
        }
        //  else {
        //   alert('Error: ' + response.statusText);
        // }
      })
      .catch(function (error) {
        alert('Unable to connect');
      });
  };

  function todayForecast(data){

    //date:
    cardDateEl.textContent=data.list[0].dt_txt.slice(0,10)

    
    //image:
    var iconcode = data.list[0].weather[0].icon;
    var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
    cardIconEl.src=iconurl

    //description:
    cardDescEl.textContent=data.list[0].weather[0].description

    //Temp:
    cardTempEl.textContent=Math.floor((data.list[0].main.temp)-273.15)+ '°C'

    //city:
    cardCityEl.textContent=data.city.name
    
    //country:
    cardCountryEl.textContent=data.city.country
    
    //Wind:
    cardWindEl.textContent=Math.floor(data.list[0].wind.speed / 0.44704) +' mph'
 
    //Humidity:
    cardHumidityEl.textContent=data.list[0].main.humidity+'%'
  }

  function set5DayForecast(city,data){
    console.log("----set5day forecast----")
    console.log("data = ",data)

    document.querySelector('.dayForcastMain').innerHTML=""

    for (var i=0;i<=32;i+=8){

       

        //sub Div
        var subDivEl = document.createElement('div')
        subDivEl.classList='card m-2 p-2 dayForcast w-200'
        subDivEl.style.width = '200px'
        // subDivEl.setAttribute('style','width: 34rem;')

        
        //description :
        // var divDescLabelEl = document.createElement('label')
        // divDescLabelEl.textContent='Description: '
        var divDescEl = document.createElement('strong')
        divDescEl.className='desc'
        divDescEl.textContent = data.list[i].weather[0].description
        // subDivEl.appendChild(divDescLabelEl)
        subDivEl.appendChild(divDescEl)

        //Temp:
        // var divTempLabelEl = document.createElement('label')
        // divTempLabelEl.textContent='Temperature : ' 
        var spanTempEl = document.createElement('strong')
        spanTempEl.className='temp'
        spanTempEl.textContent =Math.floor((data.list[i].main.temp)-273.15)+ '°C'
        // subDivEl.appendChild(divTempLabelEl)
        subDivEl.appendChild(spanTempEl)


        //image:
        var iconcode = data.list[i].weather[0].icon;
        var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
        var imgEl = document.createElement('img')
        imgEl.className='img-icon'
        imgEl.src=iconurl
        imgEl.alt='image'
        subDivEl.appendChild(imgEl)


        //Wind:
        var divWindLabelEl = document.createElement('span')
        divWindLabelEl.textContent='Wind: '
        var spanWindEl = document.createElement('span')
        spanWindEl.textContent = Math.floor(data.list[i].wind.speed / 0.44704) +' mph'
        subDivEl.appendChild(divWindLabelEl)
        subDivEl.appendChild(spanWindEl)

        //Humidity:
        var divHumidLabelEl = document.createElement('label')
        divHumidLabelEl.textContent='Humidity: '
        var spanHumidityEl = document.createElement('strong')
        spanHumidityEl.textContent = data.list[i].main.humidity+'%'
        subDivEl.appendChild(divHumidLabelEl)
        subDivEl.appendChild(spanHumidityEl)

        
        //date:
        var h5El = document.createElement('h5')
        h5El.textContent = data.list[i].dt_txt.slice(0,10)
        subDivEl.appendChild(h5El)

        document.querySelector('.dayForcastMain').appendChild(subDivEl)

    }
  }

  searchedHistory()

  function searchedHistory(){
    // console.log("Local Storage 222 = ",weatherLSdata)

    Object.keys(weatherLSdata).map((ele)=>{
        console.log("local storage length = ",ele)

        // var aTagEl = document.createElement('a')
        // aTagEl.setAttribute('href',ele)
        
        var aTagEl = document.createElement('div')
        // aTagEl.setAttribute('href',ele)
        aTagEl.textContent = ele
        aTagEl.classList='list-group-item list-group-item-dark border-3 m-1'
        searchedHistoryEl.appendChild(aTagEl)
    })   

  }


  searchedHistoryEl.addEventListener('click',searchedHistoryData)

  function searchedHistoryData(event){
    console.log("event ===== ",event.target.innerText)

    var searchHistCity=event.target.innerText

    if (searchHistCity) {
      getApiData(searchHistCity);
      getGoogleApiData(searchHistCity)
      nameInputEl.value = '';
    } else {
      alert('Please enter a City name');
    }

  }


  function initMap() {
    const myLatLng = { lat: 43.7001, lng: -79.4163 };
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 4,
      center: myLatLng,
    });
  
    new google.maps.Marker({
      position: myLatLng,
      map,
      title: "Hello World!",
    });
  }
  
  window.initMap = initMap;



