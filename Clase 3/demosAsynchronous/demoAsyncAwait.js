const myPromise = (value) => {
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            if(value % 2 === 0){
                resolve("Exito!")
            } else {
                reject("Error!")
            }
        }, 0);
    });
}

async function asyncCall(){
    try{
        const result = await myPromise(2);
        console.log(result);
    } catch (error){
        console.log(error.message)
    }
}

asyncCall();
console.log("Hola fuero del async")