const fs = require('fs')
const path = require('path')
console.log(path) // En que direccion esta el asrchio 
const readFile = async () => {
    try {
        const filePath = path.resolve(`${__dirname}/archivo.txt`)
        const data = await fs.promises.readFile(filePath, 'utf-8')
        console.log(data)
    } catch (error) {
        console.log(error)
    }
}

const writeFile = async (text) => {
    try {
        const filePath = path.resolve(`${__dirname}/archivo2.txt`)
        await fs.promises.writeFile(filePath, text)
    } catch (error) {
        console.log(error)
    }

}

const appendFile = async (text) => {
    try {
        const filePath = path.resolve(`${__dirname}/archivo2.txt`)
        await fs.promises.appendFile(filePath, text)
    } catch (error) {
        console.log(error)
    }
}


async function writeFile2(text) {
        try {
        const filePath = path.resolve(`${__dirname}/archivo2.txt`)
        await fs.promises.writeFile(filePath, text)
    } catch (error) {
        console.log(error)
    }
}
