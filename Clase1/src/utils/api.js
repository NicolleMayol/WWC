const fetchApi = async (url) => {
    try {
        const res = await fetch(url);
        const data = await res.json()
        //data.results.forEach ((d) => console.log(d.id, d.name, d.gender))
        //return data.results.map(({id, name, gender}) => ({id, name, gender}))
     } catch (error) {
        console.log(error)
    }
}

module.exports = fetchApi