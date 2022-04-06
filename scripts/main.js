const CLEAPI = '2147c1731c1f8a219e5627b1aa42116c';
let resultatAPI;
const temps = document.querySelector('.temps');
const temperature = document.querySelector('.temperature');
const localisation = document.querySelector('.localisation');
const heure = document.querySelectorAll('.heure-nom-prevision');
const tempPourH = document.querySelectorAll('.heure-prevision-valeur');

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position =>{
        // console.log(position);

        let long = position.coords.longitude;
        let lat = position.coords.latitude;
        AppelAPI(long,lat);

    }, () => {
        alert(`Veuillez accepter la géolocalisation pour que l'application puisse fonctionner !`)
    })
}

function AppelAPI(long,lat){
fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${CLEAPI}`)
.then((reponse) =>{
    return reponse.json();
})
.then((data) =>{
  
    resultatAPI = data;

    temps.innerText = resultatAPI.current.weather[0].description;
    temperature.innerText = `${Math.trunc(resultatAPI.current.temp)}°`
    localisation.innerText = resultatAPI.timezone;

    // heures par tranche de 3 avec température

    let heureActuelle = new Date().getHours();
    for(let i = 0; i < heure.length; i++){

        let heureIncr = heureActuelle + i * 3;
        heure[i].innerText = `${heureIncr} h`;


    }

})
}