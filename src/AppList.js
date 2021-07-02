import { useEffect,useState } from "react";
import Products from "./components/Products.js";
import CartItems from "./components/CartItems.js";
import "./App.css";
//import * as product from './store/product';
import {loadProducts} from './store/product';
import {loadCarts, addCart, removeCart, emptyCart} from './store/cart';
import { useDispatch, useSelector } from "react-redux";



const App = (props) =>  {

  const dispatch = useDispatch();
  const [msg, setMsg] = useState("");
  const products = useSelector((state) => state.entities.products.list);
  const cartItems = useSelector((state) => state.entities.carts.list);
  //const [cartItems, setCartItems] = useState([]);


  function loadData() {
    loadProducts(dispatch);
    loadCarts(dispatch);
  }


  useEffect(() => {
    loadData()
  }, []);


  const checkout = (user) => {
    //console.log(user);
    alert("checkout inviato con successo");
  };


//console.log("productslist=>", products)

return (
        
  <div className="app">
        <header></header>
        <main>
          <div className="main">
            <Products data={products} addCart={addCart} />
          </div>
          <div className="sidebar">
            {msg}
            <CartItems
              cartItems={cartItems}
              removeCart={removeCart}
              emptyCart={emptyCart}
              checkout={checkout}
            />
          </div>
        </main>
        <footer>footer</footer>
      </div>
  );
}

export default App;