const express = require("express");
const app = express();
const Product = require("../models/product");

app.get("/", (req, res) => res.send("Express on Vercel"));

app.get("/products", async (req, res, next) => {
    // Call clog before sending the response
    res.locals.result = await Product.getAllProducts();
    console.log(res.locals.result)
    next(); // Call next to continue to the next handler
  }, (req, res) => {if(res.locals.result){res.send(res.locals.result)}else{res.send({})}});

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;