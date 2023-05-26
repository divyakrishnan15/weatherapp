
var userFormEl = document.querySelector('#user-form');
var nameInputEl = document.querySelector('#username');
var cityBtnEl = document.querySelector('.city-btn')
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
    getUserRepos(city);
    nameInputEl.value = '';
  } else {
    alert('Please enter a GitHub username');
  }
};

userFormEl.addEventListener('submit', formSubmitHandler);

var getUserRepos = function (city) {
    var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q='+city+'&appid=cc86632db1a12bed0499b6fb11a002de'
   
    fetch(apiUrl)
      .then(function (response) {
        if (response.ok) {
          console.log(response);
          response.json().then(function (data) {
            console.log(data);
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
            // cardDateEl.textContent = data.list[0].dt_txt;
            // cardIconEl.textContent = data.list[0].weather[0].icon;
            // cardTempEl.textContent = data.list[0].main.temp;
            // cardWindEl.textContent = data.list[0].wind.speed;
            // cardHumidityEl.textContent = data.list[0].main.temp;

            
            // console.log('date 1= ',data.list[0].dt_txt)
            // console.log('date 2= ',data.list[8].dt_txt)
            // console.log('date 3= ',data.list[16].dt_txt)
            // console.log('date 4= ',data.list[24].dt_txt)
            // console.log('date 5= ',data.list[32].dt_txt)

            ;
            // cardIconEl.textContent = data.list[0].weather[0].icon;
            // cardTempEl.textContent = data.list[0].main.temp;
            // cardWindEl.textContent = data.list[0].wind.speed;
            // cardHumidityEl.textContent = data.list[0].main.temp;


            // return data
          });
        } else {
          alert('Error: ' + response.statusText);
        }
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
    cardTempEl.textContent=data.list[0].main.temp

    
    //Wind:
    cardWindEl.textContent=data.list[0].wind.speed
 
    //Humidity:
    cardHumidityEl.textContent=data.list[0].main.humidity
  }

  function set5DayForecast(city,data){
    console.log("----set5day forecast----")
    console.log("data = ",data)
    for (var i=0;i<=32;i+=8){

       

        //sub Div
        var subDivEl = document.createElement('div')
        subDivEl.classList='card m-2 p-2 dayForcast w-200'
        subDivEl.style.width = '200px'
        // subDivEl.setAttribute('style','width: 34rem;')

        //date:
        var h5El = document.createElement('h5')
        h5El.textContent = data.list[i].dt_txt.slice(0,10)
        subDivEl.appendChild(h5El)

        //image:
        var iconcode = data.list[i].weather[0].icon;
        var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
        var imgEl = document.createElement('img')
        imgEl.src=iconurl
        imgEl.alt='image'
        subDivEl.appendChild(imgEl)

        //description :
        var divDescLabelEl = document.createElement('label')
        divDescLabelEl.textContent='Description: '
        var divDescEl = document.createElement('strong')
        divDescEl.textContent = data.list[i].weather[0].description
        subDivEl.appendChild(divDescLabelEl)
        subDivEl.appendChild(divDescEl)

        //Temp:
        var divTempLabelEl = document.createElement('label')
        divTempLabelEl.textContent='Temperature : '
        var spanTempEl = document.createElement('strong')
        spanTempEl.textContent = data.list[i].main.temp
        subDivEl.appendChild(divTempLabelEl)
        subDivEl.appendChild(spanTempEl)

        //Wind:
        var divWindLabelEl = document.createElement('label')
        divWindLabelEl.textContent='Wind: '
        var spanWindEl = document.createElement('strong')
        spanWindEl.textContent = data.list[i].wind.speed
        subDivEl.appendChild(divWindLabelEl)
        subDivEl.appendChild(spanWindEl)

        //Humidity:
        var divHumidLabelEl = document.createElement('label')
        divHumidLabelEl.textContent='Humidity: '
        var spanHumidityEl = document.createElement('strong')
        spanHumidityEl.textContent = data.list[i].main.humidity
        subDivEl.appendChild(divHumidLabelEl)
        subDivEl.appendChild(spanHumidityEl)

        document.querySelector('.dayForcastMain').appendChild(subDivEl)

    }
  }

  searchedHistory()

  function searchedHistory(){
    // console.log("Local Storage 222 = ",weatherLSdata)

    Object.keys(weatherLSdata).map((ele)=>{
        console.log("local storage length = ",ele)

        var aTagEl = document.createElement('a')
        aTagEl.setAttribute('href',ele)
        aTagEl.textContent = ele
        aTagEl.classList='list-group-item list-group-item-dark border-3 m-1'
        searchedHistoryEl.appendChild(aTagEl)
    })
    

  }



