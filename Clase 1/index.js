const fetchApi = require('./src/utils/api.js')
fetchApi('https://rickandmortyapi.com/api/character/')
    .then(data => console.log(data))