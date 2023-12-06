// heroku authorization token :-  18601b9b-8cec-4210-ba12-7d65aa2096b8


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
                messageOne.textContent = data.Data.location;
                messagetwo.textContent = data.Data.weather;
                messagethree.textContent = data.Data.degreeout;
                messagefour.textContent = data.Data.feelslike;
            }
        })
    
    })
})

