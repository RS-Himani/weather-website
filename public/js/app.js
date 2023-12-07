
console.log('Client side javascript file loaded!')

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#locationMessage')
const messagetwo = document.querySelector('#weatherMessage')
const messagethree = document.querySelector('#degreeMessage')
const messagefour = document.querySelector('#feelslikeMessage')

messageOne.textContent = 'Loading...'
messagetwo.textContent = ''
messagethree.textContent = ''
messagefour.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location =search.value;

    console.log('Location testing: ', location)

    fetch('/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                console.log(data.error)
                messageOne.textContent = data.error
            } else {
                console.log(data)
                //console.log(JSON.stringify(Object.keys(data)));
                //console.log(data.Data.Process)
                messageOne.textContent = 'Location is '  + data.Data.location;
                messagetwo.textContent = 'Weather Looks Like '  + data.Data.weather +' and Wind Speed is  ' + data.Data.windspeed + ' kilometers/hour ';
                messagethree.textContent = 'Temperature is  '  + data.Data.degreeout + ' degree fahrenheit ';
                messagefour.textContent = 'Feels Like '  + data.Data.feelslike + ' degree fahrenheit where the Cloud coverage is ' + data.Data.cloudcover +' %';
            }
        })
    
    })
})

