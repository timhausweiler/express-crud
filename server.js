import logger from "morgan";

import express from "express";
import products from "./products/products.js";
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(logger("dev"));


// Home route
app.get("/products", (req, res) => {
  res.json(products);
});

// Show products route
app.get("/products/:id", (req, res) => {
  console.log(req.params);
  const id = req.params.id;
  const product = products.find(product =>  product._id === id )
	res.json(product);
});

// Create product route
app.post("/products", (req, res) => {
	// console.log(req.body);
	const newProduct = req.body;
	newProduct.price = `$${req.body.price}`;
	console.log(newProduct);
	products.push(newProduct);
	res.json(products);
});

// Edit product route
app.put("/products/:id", (req, res) => {
	const id = req.params.id;
	const productIndex = products.findIndex(product => product._id === id);

	const updatedProduct = {
		...products[productIndex],
		_id: req.body._id,
		name: req.body.name,
		imgUrl: req.body.imgUrl,
		price: req.body.price,
	};

	products.splice(productIndex, 1, updatedProduct);
	res.json(updatedProduct);
});

// Delete product route
app.delete("/products/:id", (req, res) => {
  const id = req.params.id;
	const productIndex = products.findIndex(product => product._id === id);
  
  const deletedProduct = products.find(p => p._id === id);
  console.log(products[deletedProduct])

  products.splice(productIndex, 1);
  res.json(products);
})

app.listen(PORT, ()=>{console.log(`Listening on PORT ${PORT}`)})