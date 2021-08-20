import { createSlice } from "@reduxjs/toolkit";
import * as yup from 'yup';

// action types
// we dont need anymore
let lastId = 0;
const slice = createSlice({
    name:"carts",
    initialState:{
        list:[],
        loading:false,
        lastFetch:null,
        lastAdded:null,
        isError:false,
        msg:''
    },
    reducers:{
        added: (carts, action) => {
            console.log("payload",action.payload);

            if (carts.list.length > 0) {
                // const index = carts.list.findIndex(function(cart) {
                //     //console.log(cart.id+" == "+action.payload.cart.product_id+" && "+cart.user_id+" == "+action.payload.cart.user_id);
                //     console.log("tutto ", cart.id === action.payload.cart.product_id && cart.user_id === action.payload.cart.user_id);
                //     // console.log("prima ", cart.id === action.payload.cart.product_id);
                //     // console.log("seconda ", cart.user_id === action.payload.cart.user_id);
                //     if (parseInt(cart.product_id) === parseInt(action.payload.cart.product_id) && parseInt(cart.user_id) === parseInt(action.payload.cart.user_id)){
                //         return true;
                //     }
                //     return false;

                // });

                const index = carts.list.findIndex((cart) => (parseInt(cart.product_id) === parseInt(action.payload.cart.product_id) && parseInt(cart.user_id) === parseInt(action.payload.cart.user_id)));
                console.log(index);

          
                if (index >= 0) {
                    carts.msg = "The Article is already added";
                    carts.list[index].qta = (carts.list[index].qta ? ++carts.list[index].qta : 1);
                    carts.list[index].price = (carts.list[index].price ? (carts.list[index].price + action.payload.cart.price) : action.payload.cart.price);
                    //setCartItems(cartItems_clone);
                } else {
                    carts.msg = "The Article added";
                    // setCartItems([...cartItems_clone, { ...product, qta: 1 }]);
                    carts.list.push({
                        ...action.payload.cart,
                    });
                }
            } else {
                carts.msg = "The Article added";
                // setCartItems([{ ...product, qta: 1 }]);
                carts.list.push({
                    ...action.payload.cart
                });
            }

            carts.lastAdded = { ...action.payload.cart };
            return carts;

        },
        fetched: (carts, action) => {
            console.log(action.payload);
            carts.list = action.payload;
            carts.loading = false;
        },
        sorted: (carts, action) => {

            carts.list.sort(function (a, b) {
                if (action.payload.sort === "asc") {
                  return a.price > b.price ? 1 : -1;
                } else if (action.payload.sort === "desc") {
                  return a.price < b.price ? 1 : -1;
                } else {
                  return a.id > b.id ? 1 : -1;
                }
            });
        },
        removed: (carts, action) => {
            carts.list = carts.list.filter(cart => action.payload.id !== cart.id);
            // const index = carts.list.findIndex(product => action.payload.id !== product.id);
            // carts.list.slice(index,1);
        },
        errored: (carts, action) => {
          carts.isError = true;
          carts.msg = action.payload.msg;
          // const index = carts.list.findIndex(product => action.payload.id !== product.id);
          // carts.list.slice(index,1);
        },
        empty: (carts, action) => {
            //carts.list = [];
            carts.list = carts.list.filter(cart => action.payload.user_id !== cart.user_id);
        },
    }
});

export const {added, fetched, removed, sorted, empty, errored} = slice.actions;
// export const selectCart = state => state.entities.carts;
export default slice.reducer;
