import { createSlice } from "@reduxjs/toolkit";

// action types
// we dont need anymore
let lastId = 0;
const slice = createSlice({
    name:"products",
    initialState:{
        list:[],
        loading:false,
        lastFetch:null
    },
    reducers:{
        productAdded: (products, action) => {
            products.list.push({
                id:++lastId,
                description: action.payload.description,
                resolved: false
            });
        },
        productListed: (products, action) => {
            products.list = action.payload;
        },
        productSorted: (products, action) => {

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
        // productResolved: (products, action) => {
        //     const index = products.list.findIndex(product => action.payload.id !== product.id);
        //     products.list[index].resolved = true;
        // },
        productRemoved: (products, action) => {
            products.list = products.list.filter(product => action.payload.id !== product.id);
            // const index = products.list.findIndex(product => action.payload.id !== product.id);
            // products.list.slice(index,1);
        },
    }
});

export const {productAdded, productListed, productRemoved, productSorted} = slice.actions;
export default slice.reducer;