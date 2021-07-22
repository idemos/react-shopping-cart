const products = require('./route/product');
const carts = require('./route/shoppingCart');
const auth = require('./route/auth');
const express = require("express");
var cors = require('cors');

const app = express();

//origin: 'http://localhost:5000'
//app.use(cors({}))
app.use(cors())

//app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// per tutte le request che iniziano per /api/products richiama il router/route products
app.use('/api/products', products);
app.use('/api/carts', carts);
app.use('/api/auth', auth);

const port =  process.env.PORT || 5000
app.listen(port,() => console.log('sono in ascolto sulla porta: ' + port));
