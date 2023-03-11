const fetchApi = require('./src/utils/api.js')
fetchApi('https://rickandmortyapi.com/api/character', 'id,name,gender')
    .then(data => console.log(data))