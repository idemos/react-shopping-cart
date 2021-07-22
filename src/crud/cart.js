import * as yup from 'yup';
import * as Cart from '../store/cart';
import {setErrorTrue, setErrorFalse} from '../store/error';



const load = async (dispatch) => {
    const res = await fetch("http://localhost:5000/api/carts");
    const cart = await res.json();

    console.log('get from api=>', cart);
    dispatch(Cart.fetched(cart));
    //setProducts(pro);
    setErrorFalse(dispatch);
};


const productSchema = yup.object({
  user_id: yup.number().integer().positive().required(),
  product_id: yup.number().integer().positive().required(),
  price: yup.number().positive().required(),
});

const add = async (dispatch, product) => {
    
    //const cart = {...product, user_id:1, qta:1, product_id:product.id}
    //const cart_state = useSelector((state) => state.entities.cart);
    const cart = {user_id:1, product_id:product.id, price: product.price}

    try {

      let error = false;
      const isValid = await productSchema.validate(cart).catch((e) => {
        error = {
         message: e.message,
         field: e.path
        };
      });
      
      
      if(error !== false){
        //dispatch(cart.errored({msg: 'Si sono verificati degli errori'}));
        setErrorTrue(dispatch, 'Si sono verificati degli errori');
        return;
      }

      
      console.log('crud cart isValid', isValid);
      console.log('crud cart error', error);

      //cart.user_id='a';

      const res = await fetch("http://localhost:5000/api/carts", { 
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        method: "POST",
        body: JSON.stringify(cart)
      });

      const output = await res.json();

      console.error("prima dell output:", output.error);

      //if(typeof output.error === 'undefined'){
      if(!output.error){
        console.error("json error1 msg:", output.error);
        dispatch(Cart.added({cart}));
        setErrorFalse(dispatch);
        //loadCarts();
      }else{
        console.error("json error2 msg:", output.error);
        setErrorTrue(dispatch, output.error);
      }

    } catch (err) {
      console.error("json error2 msg:", err);
      setErrorTrue(dispatch, err);
    }
}

const remove = async (dispatch, id) => {

    try{
      const res = await fetch("http://localhost:5000/api/carts/"+id, { method: "DELETE" });
      const output = await res.json();
      //setMsg(output);
      if(!output.error){
        dispatch(Cart.removed({id}));
        setErrorFalse(dispatch);
      }
    }catch (err) {
      console.error(err);
      setErrorTrue(dispatch, err);
    }
};


const empty = async (dispatch, user_id) => {

    try{
      const res = await fetch("http://localhost:5000/api/carts/all/"+user_id, { method: "DELETE" });
      const output = await res.json();
      //setMsg(output);
      if(!output.error){
        dispatch(Cart.empty({user_id}));
        setErrorFalse(dispatch);
      }
    }catch (err) {
      console.error(err);
      setErrorTrue(dispatch, err);
    }
};

export {load, add, remove, empty};