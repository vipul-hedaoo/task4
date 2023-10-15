const apiKey = "4d803be647ce336379a23ee7c7e2ab6e";

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
let check=1;
let logstatus=1;

const url = (city) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
//const cityLogo=document.getElementById("#search");
async function getWeatherByLocation(city) {
    const resp = await fetch(url(city), {
        origin: "cros"
    });
    const respData = await resp.json();
    addWeatherToPage(respData, city);
}

function addWeatherToPage(data) {
    const temp = Ktoc(data.main.temp);
    const pressure=data.main.pressure;
    const weather = document.createElement('div');
    weather.classList.add('weather');
    //addcitylogo(city);
    getCityLogoSource();
    weather.innerHTML = `
        <h3>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
            ${temp}°C
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"/>
        </h3>
        <small>${data.weather[0].main}</small><br>
        
    `;
    // Set the source of the city logo based on the city name


    // Change background image and sound based on weather condition
    // deleteb();

    changeBackgroundImage(data.weather[0].main);
    changeBackgroundSound(data.weather[0].main);
    // Cleanup
    main.innerHTML = "";
    main.appendChild(weather);
}

function Ktoc(K) {
    return Math.floor(K - 273.15);
}
function hpatopa(hpa)
{
    return Math.floor(hpa*0.0145);
}

function getCityLogoSource() {
    let cityLogoSrc = '';
    let cityLogo=document.getElementById("search").value;
    // Set the source of the city logo based on the city name using a switch case
    switch (cityLogo) {
        case 'mumbai'||'Mumbai'||'MUMBAI':
            cityLogoSrc = 'mumbailogo.avif';
            break;
        case 'London':
            cityLogoSrc = 'london-logo.png';
            break;
        case 'Paris':
            cityLogoSrc = 'paris-logo.png';
            break;
        // Add more cases for other cities as needed
        default:
            cityLogoSrc = 'logo.png';
            break;
    }
    document.getElementById("city").src=cityLogoSrc;

}


function changeBackgroundImage(weatherCondition) {
    const body = document.querySelector('body');
    let imageUrl = '';
    let date=new Date();
    let session="AM";
    let hh = date.getHours();
    //

    // Set background image URL based on weather condition
    switch (weatherCondition) {
        case 'Clear':
            if(hh>=5 && hh<19){
                imageUrl = 'amclear.webp';
            }
            else{
                imageUrl = 'pmclaer.jfif';
            }
            break;
        case 'Clouds':
            if(hh>=5 && hh<19){
                imageUrl = 'cloud.jpg';
            }
            else{
                imageUrl = 'pmclouds.jpg';
            }
            break;
        case 'Rain':
            if(hh>=5 && hh<19){
                imageUrl = 'rainyam.gif';
            }
            else{
                imageUrl = 'rainpm.gif';
            }
            break;
        case 'Snow':
            if(hh>=5 && hh<19){
                imageUrl = 'snowam.gif';
            }
            else{
                imageUrl = 'snowpm.gif';
            }
            break;
        case 'Haze':
            if(hh>=5 && hh<19){
                imageUrl = 'haze.gif';
            }
            else{
                imageUrl = 'hazepm.jpg';
            }
            break;
        case 'Drizzle':
            imageUrl = 'dazzle.avif';
            break;
        case 'Heavy Rain'||'HeavyRain':
            imageUrl = 'heavy rain.webp';
            break;
        case 'Thunderstrom'||'Thunder':
            imageUrl = 'thunder.webp';
            break;
        case 'Mist':
            imageUrl = 'mist.png';
            break;
        default:
            imageUrl = 'defult.png';
            break;
    }

    body.style.backgroundImage = `url(${imageUrl})`;
}

function changeBackgroundSound(weatherCondition) {
    const audio = new Audio();
    let soundUrl = '';

    // Set background sound URL based on weather condition
    switch (weatherCondition) {
        case 'Clear':
            soundUrl = 'clear.mp3';
            break;
        case 'Clouds':
            soundUrl = 'cloudy.mp3';
            break;
        case 'Rain':
            soundUrl = 'rainy.mp3';
            break;
        case 'Snow':
            soundUrl = 'snowy.mp3';
            break;
        case 'Haze':
            soundUrl = '.mp3';
            break;
        default:
            soundUrl = 'default.mp3';
            break;
    }

    audio.src = soundUrl;
    audio.play();
}
function addbutton(check)
{
    // let divv = document.getElementById("blur");
    // divv.remove();
    if(check>1)
    {
        let divv = document.getElementById("blur");
        divv.remove();
        check=check-1;
    }
    else{

        check=check+1;
        let myDiv = document.getElementById("blur");
        // creating button element
        let button = document.createElement('BUTTON');
        // creating text to be
        //displayed on button
        let text = document.createTextNode("More Info");

        // appending text to button
        button.appendChild(text);
        // appending button to div
        myDiv.appendChild(button);;
    }
}
function deleteb()
{

}
myBlurFunction = function(state) {
    /* state can be 1 or 0 */
    var containerElement = document.getElementById('main_container');
    var overlayEle = document.getElementById('overlay');

    if (state) {
        overlayEle.style.display = 'block';
        containerElement.setAttribute('class', 'blur');
    } else {
        overlayEle.style.display = 'none';
        containerElement.setAttribute('class', null);
    }
};
// function showMore(humidity,windspeed,sunset,sunrise,pressure)

// {


//             // appending text to button
//             button.appendChild(text);
//             // appending button to div
//             myDiv.appendChild(button);
// }
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const city = search.value;
    if (city) {
        getWeatherByLocation(city,check);
    }
});
