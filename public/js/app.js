console.log('Client side js is loaded aravind');

var weatherdetails=document.getElementById('weatherdetails');
var icon=document.getElementById('icon');
var temperature=document.getElementById('temperature');
var windspeed=document.getElementById('windspeed');
var winddirection=document.getElementById('winddirection');
var pressure=document.getElementById('pressure');
var precipitation=document.getElementById('precipitation');
var humidity=document.getElementById('humidity');
var uvindex=document.getElementById('uvindex');
var feelslike=document.getElementById('feelslike');
var visibility=document.getElementById('visibility');
var cloudcover=document.getElementById('cloudcover');
var errormsg=document.getElementById('error');
var input1=document.getElementById('input1');
var input2=document.getElementById('input2');

var submitbtn=document.getElementById('submitbtn');
submitbtn.addEventListener('click',(e)=>{
    e.preventDefault();
    errormsg.innerHTML="Loading...";
    var url="/weather?city="+input1.value+"&state="+input2.value;
    fetch(url).then((response)=>{
        response.json().then(data=>{
            if (data.status){
                errormsg.innerHTML=data.status;
                icon.src='';
                icon.alt='';
                temperature.innerHTML='Temperature: - -';
                windspeed.innerHTML='Wind Speed: - -';
                winddirection.innerHTML='Wind Direction: - -';
                pressure.innerHTML='Pressure: - -';
                precipitation.innerHTML='Precipitation: - -';
                humidity.innerHTML='Humidity: - -';
                uvindex.innerHTML='UV Index: - -';
                feelslike.innerHTML='Feels Like: - -';
                visibility.innerHTML='Visibility: - -';
                cloudcover.innerHTML='Cloud Cover: - -';
            }
            else{
                errormsg.innerHTML='';
                icon.src=data.weather_icons[0];
                icon.alt='climate logo';
                temperature.innerHTML='Temperature: '+data.temperature+' °C';
                windspeed.innerHTML='Wind Speed: '+data.wind_speed+' Km/h';
                winddirection.innerHTML='Wind Direction: '+data.wind_degree+'° '+data.wind_dir;
                pressure.innerHTML='Pressure: '+data.pressure+' hPa';
                precipitation.innerHTML='Precipitation: '+data.precip+' mm';
                humidity.innerHTML='Humidity: '+data.humidity+' %';
                uvindex.innerHTML='UV Index: '+data.uv_index;
                feelslike.innerHTML='Feels Like: '+data.feelslike+'° C';
                visibility.innerHTML='Visibility: '+data.visibility+ ' Km';
                cloudcover.innerHTML='Cloud Cover: '+data.cloudcover+' %';
            }
        })
    })
})

// fetch('http://localhost:3000/weather?city=chirala&state=andhra pradesh').then((response)=>{
//     response.json().then(data=>{
//         if (data.status){
//             console.log(data.status);
//         }
//         else{
//             console.log(data.temperature);
//         }
//     })
// })