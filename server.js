const products = require('./route/product');
const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// per tutte le request che iniziano per /api/products richiama il router/route products
app.use('/api/products', products);

const port =  process.env.PORT || 5000
app.listen(port,() => console.log('sono in ascolto sulla porta' + port));
