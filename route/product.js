const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const shortid = require("shortid");
const express = require('express');
const route = express.Router();




mongoose.connect("mongodb://localhost:27017/shopping-cart-db",{
    useNewUrlParser:true,
    useCreateIndex: true,
    useUnifiedTopology:true,
});

const Product = mongoose.model(
    "products",
    new mongoose.Schema({
        _id: {type: String, default: shortid.generate },
        title: String,
        description: String,
        image: String,
        price: Number,
        availableSizes: [String],
    })
)

// => lo '/' vuol dire /api/courses
route.get('/', async (req,res) => {
    const products = await Product.find({});
    res.send(products);
    //res.send('ok');
});

route.post('/', async (req,res) => {
    const products = new Product(req.body);
    const savedProduct = await products.save();
    res.send(savedProduct);
    //res.send('ok');
});

route.get('/:id', async (req,res) => {
    const product = await Product.findById(req.params.id);
    res.send(product);
    //res.send('ok');
});

route.delete('/:id', async (req,res) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.send(product);
    //res.send('ok');
});

module.exports = route;
