import { useEffect,useState } from "react";
import Products from "./components/Products.js";
import CartItems from "./components/CartItems.js";

import "./App.css";
import './modalLogin.css'

import {loadProducts} from './store/product';
import * as Cart from './crud/cart';
import * as Auth from './crud/auth';

import { useDispatch, useSelector } from "react-redux";

import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom';



const App = (props) =>  {

  const dispatch = useDispatch();
  const [msg, setMsg] = useState("");
  const [showAuth, setShowAuth] = useState(false);
  const [auth, setAuth] = useState(localStorage.getItem('user_token') || null);
  const products = useSelector((state) => state.entities.products.list);
  const cartItems = useSelector((state) => state.entities.carts.list);
  const error = useSelector((state) => state.error);
  //const [cartItems, setCartItems] = useState([]);

  const [login, setLogin] = useState({});
  
  const handlerLogin = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value })
  }

  const setShowAuthCustom = (val, obj) => {
    console.info("val",val);
    console.log(obj.target.name);
  }


  function loadData() {
    loadProducts(dispatch);
    Cart.load(dispatch);
    loadAuth();
    console.log("auth",auth);
  }

  const loadAuth = () => {
    // vedo se l'utente è loggato attraverso lo storage
    setShowAuth(auth !== null);
    //setAuth(!authenticated);
  }


  useEffect(() => {
    loadData()
  }, []);


  const checkout = (user) => {
    //console.log(user);
    alert("checkout inviato con successo");
  };
  
  const handlerLoginSubmit = () => {
    console.log(login);
    Auth.login(dispatch, login);
    //Auth.login(dispatch(login));
  };

  const showModal = (authenticated) => {
    //console.log("showModal" + product);
    setShowAuth(authenticated);

}

const hideModal = () => {
    //console.log("hideModal");
    setShowAuth(null);
}


//console.log("productslist=>", products)

  return (

    <div className="app">
        <header></header>
        <main>
          <div className="main">
            <Products data={products} addCart={Cart.add} />
          </div>
          <div className="sidebar">
            {msg}
            <CartItems
              cartItems={cartItems}
              removeCart={Cart.remove}
              emptyCart={Cart.empty}
              checkout={checkout}
            />
          </div>
        </main>
        <button className="button primary" name="btn_login" onClick={() => setShowAuth(true) }>Show login</button>
        <footer>footer</footer>
        {
          !auth && (
              <Modal isOpen={showAuth} onRequestClose={() => hideModal()} className="modalLogin" ariaHideApp={false}>
                  <Zoom><>

                      <button className="close-modal" type="button" onClick={() => hideModal()}>x</button>
                      { error.is && (<div className="danger">{error.msg}</div>)}
                      <div className="login">
                        <div className="login-username">
                          <input type="email" name="email" required placeholder="your best email" onChange={handlerLogin} />
                        </div>  
                        <div className="login-password">
                          <input type="password" name="password" required placeholder="password" onChange={handlerLogin} />
                        </div>
                        <div className="login-options">
                          <button type="button" onClick={() => hideModal()}>Chiudo</button>
                          <button type="button" onClick={handlerLoginSubmit}>Login</button>
                        </div>
                      </div>
                  </></Zoom>
              </Modal>
          )
        }
    </div>
  );

}

export default App;