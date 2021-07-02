import { createSlice } from "@reduxjs/toolkit";

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
            carts.list = carts.list.filter(product => action.payload.id !== product.id);
            // const index = carts.list.findIndex(product => action.payload.id !== product.id);
            // carts.list.slice(index,1);
        },
    }
});

export const {added, fetched, removed, sorted} = slice.actions;
//export const selectAllcarts = state => state.entities.carts;
export default slice.reducer;

export const loadCarts = async (dispatch) => {
    //const res = await fetch("http://localhost:5000/api/products", { mode: 'no-cors' });
    const res = await fetch("http://localhost:5000/api/carts");
    const cart = await res.json();

    console.log('get from api=>', cart);
    dispatch(fetched(cart));
    //setProducts(pro);
};