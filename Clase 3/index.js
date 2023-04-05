const express = require("express");
const PORT= 3000;
const app = express();
app.use(express.json()); //necesario para recibir jsons


const errorLogger= (err, req, res, next)=>{
  console.log(err);
  next(err)
}

const errorHandler = (err, req, res, next)=>{
  res.status(400).json({
    message:err.message,
  })
}

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


app.get("/api/v1/products", (req,res, next)=>{
  console.log(req.query);
  next();
}, (req, res) =>{
  res.json({products})}
);

app.get("/api/v1/products/:productId", (req,res)=>{
  const {productId} = req.params;
  const productIdInt = parseInt(productId);
  const product = products.find((product) => product.id === productIdInt)
  if (!product){
    throw new Error("Producto no encontrado")
  }
    res.json({product})
});


app.post("/api/v1/products", (req, res) =>{
  const product = req.body; //JSON
  products.push(product)
  res.json(products)
})


//QUERY STRINGS: PAGING!
//TAREA: IMPLEMENTAR PUT Y DELETE.

// PUT route for updating product name by id
app.put('/api/v1/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const newName = req.body.name;

  const index = products.findIndex(product => product.id === id);
  if (index !== -1) {
    products[index].name = newName;
    res.status(200).json({products});
  } else {
    res.status(404).json({ message: `Product with id ${id} not found.` });
  }
});


app.delete('/api/v1/products/:id', (req, res)=> {
  const id = parseInt(req.params.id);
  const index = products.find(product => product.id === id);
  if (index) {
    products.splice(index, 1);
    res.status(200).json({message:`Product with id ${id} has been deleted`, products})
  } else {
    throw new Error (`Product with id ${id} was not found`)
  }
});


app.use(errorLogger);
app.use(errorHandler);

/*
 * 
 * 
 * 
 *      EVENT LOOP
 *      MICROTASK: Promises
 *      MACROTASK: setTimeout(), setInterval()
 * 
 * 
 */

