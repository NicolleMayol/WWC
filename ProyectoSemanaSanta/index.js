const express = require("express");
const fs = require("fs")
const path = require('path')


const PORT= 3001;
const app = express();
const filePath = path.resolve(`${__dirname}/products.txt`)



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


app.get('/', (req, res)=>{
    res.send("Esta es mi primera app en Express");
});

app.listen(PORT, ()=> {
    console.log(`Escuchando en http://localhost:${PORT}`)
})

/*
Al hacer GET al endpoint /api/v1/products/ debe devolver toda la lista de productos
existentes.
*/
app.get('/api/v1/products/', async(req, res)=>{
  let data = await fs.promises.readFile(filePath, 'utf-8')
  console.log(data);
  if (data){
    data = JSON.parse(data)
    res.json({data});
  } else {
    res.status(500).send('Error getting products.')    
  }
});


/*
Al hacer POST al endpoint /api/v1/products/ debe crear el producto y devolver el producto 
creado con su identificador único asignado.
*/
app.post('/api/v1/products', function(req, res) {
  const newProduct = req.body;
  fs.readFile(filePath, 'utf8', function(err, data) {
    if (err) {
      throw new Error('Error reading products file.');
    }
    const products = JSON.parse(data);
    products.push(newProduct);
    fs.writeFile('products.txt', JSON.stringify(products), function(err) {
      if (err) {
       throw new Error('Error creating product.');
      }
      // Return the created product
      res.status(201).json(newProduct);
    });
  });
});

/*
Al hacer PATCH al endpoint /api/v1/products/{id} debe modificar el producto y devolver el
producto con todos los datos creados.
*/



/*
Al hacer DELETE al endpoint /api/v1/products/{id} debe eliminar el producto y devolver un
mensaje diciendo: “producto {nombreDeProducto} fue eliminado” ejemplo: “producto sombrero fue
eliminado”.
*/

/*
Los productos deben de tener: un identificador único, nombre, descripción larga, precio, unidades
disponibles y categoría.
*/

app.use(errorLogger);
app.use(errorHandler);