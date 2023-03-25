const myPromise = (value) => {
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            if(value % 2 === 0){
                resolve("Exito!")
            } else {
                reject("Error!")
            }
        }, 50);
        console.log("hey")
    });
}

const promise2 = myPromise(2)
    .then((val)=> console.log(val))
    .catch((error) => console.log(error))

