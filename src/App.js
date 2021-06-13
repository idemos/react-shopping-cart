import {useEffect, useState} from 'react';
import Filter from './components/Filter.js';
import Products from './components/Products.js';
import CartItems from './components/CartItems.js';
import data from './data.json';

import './App.css';


export default function App() {

  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [size, setSize] = useState('');
  const [msg, setMsg] = useState('');
  const [sort, setSort] = useState('asc');


  useEffect(() => {
    setProducts(data);   
  },[]);

  function productsSort(e){
    setSort(e.target.value);

    const products_sorted = products.sort(function(a,b){
      if(e.target.value === 'asc'){ 
        return (a.price > b.price ? 1 : -1);
      }else if(e.target.value === 'desc'){
        return (a.price < b.price ? 1 : -1);
      }else{
        return (a.id > b.id ? 1 : -1);
      }
    });

    setProducts(products_sorted);
  }

  const productsSize = (e) => {
    setSize(e.target.value);
    
    const products_filter = data.filter((product) => product.availableSizes.indexOf(e.target.value) >= 0)
    setProducts(products_filter);
  }

  const removeCart = (id) => {
    let cartItems_clone = cartItems.slice();
    //cartItems_clone = cartItems_clone.filter((cart)=> cart.id !== id);
    setCartItems(cartItems_clone.filter((cart)=> cart.id !== id));
    //console.log("remove cart", id);
  }

  const checkout = (user) => {
    console.log(user);
    alert('checkout inviato con successo');
  }

  const addCart = (product) => {

    if(cartItems.length>0){
      const cartItems_clone = cartItems.slice();
      const id = cartItems_clone.findIndex((cart) => cart.id === product.id);

      if(id >= 0){
        setMsg('The Article is already added');
        
        cartItems_clone[id].count = (cartItems_clone[id].count ? ++cartItems_clone[id].count : 1);
        setCartItems(cartItems_clone);

      }else{
        setMsg('The Article added');
        setCartItems([...cartItems_clone, {...product, count:1}]);
      }
    }else{
      setMsg('The Article added');
      setCartItems([{...product, count:1}]);
    }
  }

  return (
    <div className="app">
      <header>
      </header>
      <main>
        <div className="main">
          { console.log("size", size) }
          { console.log("products", products) }
          <Filter products={products} sort={sort} size={size} productsSort={productsSort} productsSize={productsSize} />
          <Products data={products} addCart={addCart} />
        </div>
        <div className="sidebar">
          {msg}
          <CartItems cartItems={cartItems} removeCart={removeCart} checkout={checkout} />
        </div>
      </main>
      <footer>footer</footer>
    </div>
  );
}
