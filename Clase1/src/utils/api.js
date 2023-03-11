const fetchApi = async (url, fields='') => {
    try {
        const res = await fetch(url);
        const data = await res.json()
        if (fields) {
            const fieldList = fields.split(',')
            return data.results.map(character =>{
                const filteredcharacter ={}
                fieldList.forEach(field => {
                    if (field in character) {
                        filteredcharacter[field] = character[field]
                    }
                });
                return filteredcharacter
        });
        } else {
            return data
        }
        //return data
        //data.results.forEach ((d) => console.log(d.id, d.name, d.gender))
        //return data.results.map(({id, name, gender}) => ({id, name, gender}))
     } catch (error) {
        console.log(error)
    }
}

module.exports = fetchApi