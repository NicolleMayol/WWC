const express = require("express");
const fs = require("fs")
const path = require('path')


const PORT= 3001;
const app = express();
const filePath = path.resolve(`${__dirname}/products.txt`)



app.use(express.json()); 

//MIDDLEWARE

const errorLogger= (err, req, res, next)=>{
  console.log(err);
  next(err)
}

const errorHandler = (err, req, res, next)=>{
  res.status(400).json({
    message:err.message,
  })
}
//


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

app.post('/api/v1/products', (req, res) =>{
  const newProduct = req.body;
  fs.readFile(filePath, 'utf8', (err, data) =>{
    if (err) {
      throw new Error('Error reading products file.');
    }
    const products = JSON.parse(data);
    products.push(newProduct);
    fs.writeFile('products.txt', JSON.stringify(products),(err)=> {
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

app.patch('/api/v1/products/:id', (req, res)=>{
  const id = parseInt(req.params.id);
  const newProduct = req.body;
  fs.readFile(filePath, 'utf8', (err, data) =>{
    if (err) {
      throw new Error('Error reading products file.');
    }
    const products = JSON.parse(data);
    console.log(products)
    const index = products.findIndex(product => product.id === id);
    console.log(index)
    if (index !== -1) {
      products[index]= newProduct;
    } else {
      res.status(404).json({ message: `Product with id ${id} not found.` });
      return
    }
    fs.writeFile(filePath, JSON.stringify(products),(err)=> {
      if (err) {
       throw new Error('Error modifying product.');
      }
      // Return the created product
      res.status(200).json({newProduct});
    });
  });
})


/*
Al hacer DELETE al endpoint /api/v1/products/{id} debe eliminar el producto y devolver un
mensaje diciendo: “producto {nombreDeProducto} fue eliminado” ejemplo: “producto sombrero fue
eliminado”.
*/

app.delete('/api/v1/products/:id', (req,res)=>{
  const id = parseInt(req.params.id);
  fs.readFile(filePath, 'utf-8', (err, data)=>{
    if (err){
      throw new Error ("Error reading file")
    }
    const products = JSON.parse(data)
    const index = products.find(product => product.id === id);
    console.log(index)
    if (index) {
      products.splice(index, 1);
      fs.writeFile(filePath, JSON.stringify(products),(err)=> {
        if (err) {
         throw new Error('Error modifying product.');
        }
        res.status(200).json({message:`Product ${index.name} has been deleted`, products})
      });
    } else {
      throw new Error (`Product with id ${id} was not found`)
    }
  })
})

/*
Los productos deben de tener: un identificador único, nombre, descripción larga, precio, unidades
disponibles y categoría.
*/

app.use(errorLogger);
app.use(errorHandler);