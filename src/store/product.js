import { createSlice } from "@reduxjs/toolkit";

// action types
// we dont need anymore
let lastId = 0;
const slice = createSlice({
    name:"products",
    initialState:{
        list:[],
        loading:true,
        status:false,
        lastFetch:null
    },
    reducers:{
        added: (products, action) => {
            products.list.push({
                id:++lastId,
                description: action.payload.description,
                resolved: false
            });
        },
        fetched: (products, action) => {
            products.list = action.payload;
            products.loading = false;
            // return action.payload;

            // const newEntities = {};
            // action.payload.forEach((product) => {
            //   newEntities[product.id] = product
            // });
            // products.list = newEntities;

        },
        sorted: (products, action) => {

            products.list.sort(function (a, b) {
                if (action.payload.sort === "asc") {
                  return a.price > b.price ? 1 : -1;
                } else if (action.payload.sort === "desc") {
                  return a.price < b.price ? 1 : -1;
                } else {
                  return a.id > b.id ? 1 : -1;
                }
            });
        },
        actived: (products, action) => {
            const index = products.list.findIndex(product => action.payload.id !== product.id);
            products.list[index].actived = true;
        },
        removed: (products, action) => {
            products.list = products.list.filter(product => action.payload.id !== product.id);
            // const index = products.list.findIndex(product => action.payload.id !== product.id);
            // products.list.slice(index,1);
        },
    }
});

export const {added, fetched, removed, sorted} = slice.actions;
//export const selectAllProducts = state => state.entities.products;
export default slice.reducer;

export const loadProducts = async (dispatch) => {
    //const res = await fetch("http://localhost:5000/api/products", { mode: 'no-cors' });
    const res = await fetch("http://localhost:5000/api/products");
    const pro = await res.json();

    //console.log('get from api=>',pro);
    dispatch(fetched(pro));
    //setProducts(pro);
};

//export const getProducts = (state) => state.entities.products;

