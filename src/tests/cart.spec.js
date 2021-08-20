// gruppo di test per la sezione Auth

import * as Cart from '../crud/cart';
import store from "../store";

window.alert = jest.fn();
console.log = console.error = jest.fn();


describe("Cart", () => {
    it("carts.list true", async () => {
        //console.log(store.getState());
        //const auth = {email:'aaaa'};
        //const result = login(store.dispatch, {email:'aaaa'});
        //const result = login( store.dispatch({email:'aaaa'}))
        
        //expect(result).toEqual(false);
        //const result = login(store.dispatch({email:'aaaa'}))
        //const store = configureStore();
        
        await store.dispatch(Cart.load);
        //console.log(store.getState().entities.carts.list);
        //expect(store.getState().entities.carts.list.isSuccess).toEqual(true);
        expect(Array.isArray(store.getState().entities.carts.list)).toBe(true);

    })
})

// npm i jest @types/jest @babel/core @babel/preset-env babel-jest -D