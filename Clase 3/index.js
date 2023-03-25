const express = require("express");
const PORT= 3000;
const app = express();


const products = [
    {
      id:1,
      name: "Reloj",
      price: 100,
      quantity: 2,
    },
    {
      id:2,
      name: "Correa",
      price: 100,
      quantity: 3,
    },
    {
      id:3,
      name: "Sombrero",
      price: 1000,
      quantity: 3,
    },
  ];


app.get('/', (req, res)=>{
    res.send("Esta es mi primera app en Express");
});

app.listen(PORT, ()=> {
    console.log(`Escuchando en http://localhost:${PORT}`)
})

app.get("/api/v1/products", (req, res)=>{
    res.json(products);

});

app.get("/api/v1/products/:productId", (req,res)=>{
    const prodId = req.params;
    const id = parseInt(req.params.productId);
    const foundProduct = products.find(product => product.id === id)
    if (foundProduct){
      res.json({foundProduct})
    } else {
      res.status(404).send(`Product with id ${id} is not found`)
    }
});

