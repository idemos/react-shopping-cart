import { useEffect,useState } from "react";
import Products from "./components/Products.js";
import CartItems from "./components/CartItems.js";
import "./App.css";
//import * as product from './store/product';
import {loadProducts} from './store/product';
import {loadCarts} from './store/cart';
import * as shoppingCart from './store/cart';
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


  const addCart = async (product) => {
    
    const cart = {...product, user_id:1, qta:1, product_id:product.id}

    try {

      const res = await fetch("http://localhost:5000/api/carts", { 
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        method: "POST",
        body: JSON.stringify(cart)
      });

      const output = await res.json();

      if(!output.error){
        dispatch(shoppingCart.added({cart}));
        //loadCarts();
      }

    } catch (err) {
      console.error(err);
    }
  }

  const removeCart = async (id) => {

    try{
      const res = await fetch("http://localhost:5000/api/carts/"+id, { method: "DELETE" });
      const output = await res.json();
      //setMsg(output);
      if(!output.error){
        dispatch(shoppingCart.removed({id}));
      }
    }catch (err) {
      console.error(err);
    }
    



    //cartItems_clone = cartItems_clone.filter((cart)=> cart.id !== id);
    //setCartItems(cartItems_clone.filter((cart) => cart.id !== id));
    //console.log("remove cart", id);
  };

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
              checkout={checkout}
            />
          </div>
        </main>
        <footer>footer</footer>
      </div>
  );
}

export default App;