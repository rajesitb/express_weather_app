
// fetch('http://puzzle.mead.io/puzzle').then( (response) => {
//     response.json().then((data) => {
//         console.log(data);
//     });
// });

const weatherUrl = 'http://api.weatherstack.com/current?access_key=466e37fcf3f76d213f9dbb754f104dcb&query=25.576045,91.882528&units=f'
const para = document.querySelector('#weather');
const image = document.querySelector('#image');

const weatherFunc =  addressLocation => {
    // the host will be used
    fetch('/weather?address='+addressLocation).then( response =>{
    response.json().then( data =>{
        if (data.error){
            return data.error;
        }else{
            console.log(data);
            para.innerText = '';
            const text = 'Weather in '+ data.location.name +',' + data.location.country+ 'is : '+data.current.weather_descriptions[0];
            image.src = data.current.weather_icons[0];
            para.innerText = text;
        }       
        
    });
});
};

const weatherForm = document.querySelector('form');
const input = document.querySelector('input');

weatherForm.addEventListener('submit', (e) => {
    para.innerText = 'Loading...';
    e.preventDefault();
    const addressLocation = input.value;
    
    console.log(weatherFunc(addressLocation));

});