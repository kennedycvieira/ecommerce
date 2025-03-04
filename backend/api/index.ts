const express = require("express");
const app = express();


const getProducts = require("../models/product.js")


app.get("/", (req, res) => res.send("Express on Vercel"));
app.get("/products", (req,res) => res.send(getProducts));
app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;