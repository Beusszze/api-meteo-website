// Récupération des éléments DOM utiles pour la suite
let inputCity = document.getElementById ('searchField');
let searchBtn = document.getElementById('searching');
let parag = document.getElementById('coords');
let lat = document.getElementById('lat');
let long = document.getElementById('long');
let meteo = document.getElementById('meteo');

// Initialisation de variables vides définies ensuite
let posLat;
let posLong;

let date;
let temp;
let description;
let windSpeed;
let iconWeather;


// évènement écouter de la touche entrée
inputCity.addEventListener('keydown', (e)=>{
    if (e.key === 'Enter' ){  
        searchCity();
    }
});
// évènement écoute du bouton recherche
searchBtn.addEventListener('click', searchCity);

// fonction de recherche 
// +inputCity.value+
function searchCity () {
    meteo.innerHTML="";
    fetch('https://api.openweathermap.org/data/2.5/forecast?q='+inputCity.value+'&appid=1d9cc9f6995b388c65c5b1a9b3aeacbb&lang=fr&units=metric')
    .then(resp => resp.json())
    .then(result=>{
            showCoords(result);
            getWeathersInf(result); 
            displayWeather(result);
    }) 
    // fonction catch en cas de nom réponse du fetch
    .catch (err => alert("Nom de ville incorrect!"))
}
// fonction gérant l'affichage des coordonnées sur la page
function showCoords (resp) {
    console.log(resp)
    posLat = resp.city.coord.lat;
    posLong = resp.city.coord.lon; 
    // affiche la première lettre de la ville avec une majuscule même si dans l'input elle est en miniscule
    parag.innerText = "Coordonnées de " + inputCity.value.charAt(0).toUpperCase()+inputCity.value.slice(1);
    lat.innerText = "Latitude : " + posLat;
    long.innerText = "Longitude : " + posLong;
    return showCoords;
}
// fonction qui récupère la date et température 
function getWeathersInf (data) {
    data.list.forEach(element => {
        date = element.dt_txt ;
        temp = element.main.temp ; 
        description = element.weather[0].description;
        windSpeed = element.wind.speed;
        iconWeather = element.weather[0].icon;
        return displayWeather(element);
    });
}

function displayWeather () {
        let div = document.createElement('div');
        let icon = document.createElement('img');
        let urlIcon = 'https://openweathermap.org/img/wn/' + iconWeather + '.png';
        let h3 = document.createElement('h3');
        let pTemp = document.createElement('p');
        let pDescr = document.createElement('p');
        let pWindsp = document.createElement('p');


        meteo.append(div);
        div.setAttribute('class', 'divBlock');
        div.append(h3);       
        icon.setAttribute('src', urlIcon);
        div.append(icon);
        pTemp.setAttribute('class', 'temperature');
        div.append(pTemp);
        pDescr.setAttribute('class', 'description');
        div.append(pDescr);
        pWindsp.setAttribute('class', 'windspeed');
        div.append(pWindsp);
        
        // Modification du format de la date
        let newDate = date.split(" ");
        let day = newDate[0];
        let hour = newDate[1];
        let justHour = hour.split(":");
        justHour = justHour[0];
        let newDay = day.split("-");
        let dDay = newDay[2];
        let month = newDay[1];
        let year = newDay[0];

        h3.innerText= dDay + "/" + month + "/" + year + " à " + justHour + "h : ";
        pTemp.innerText= "La température sera de " + temp + "°C";
        pDescr.innerText= "Le temps sera " + description;
        pWindsp.innerText= "Le vent soufflera à " + windSpeed + "km/h";

}