console.log('client side js file running');




const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messOne= document.querySelector('#message-1')
const messTwo= document.querySelector('#message-2')


weatherForm.addEventListener('submit',(e) => {
    e.preventDefault()
    messOne.textContent = 'loading ...';
    messTwo.textContent = '';
    const location = search.value
    fetch(`/weather?address=${location}`).then((res) => {
    res.json().then((data) => {
        if(data.err) {
            console.log(data.err);
            messOne.textContent = data.err;
        } else {
            messOne.textContent = data.forecastData;
            messTwo.textContent = data.location;
        }
    }, err => console.log(err))
})
})