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

// app.get("/api/v1/products", (req, res)=>{
//     res.json(products);
// });


app.get("/api/v1/products", (req,res)=>{
  console.log(req.query);
  res.json({products})
}
)

app.get("/api/v1/products/:productId", (req,res)=>{
  const {productId} = req.params;
  const productIdInt = parseInt(productId);
  const product = products.find((product) => product.id === productIdInt)
  if (product){
    res.json({product})
  } else {
    res.status(404).send(`Product with id ${id} is not found`)
  }
});


//QUERY STRINGS: PAGING!