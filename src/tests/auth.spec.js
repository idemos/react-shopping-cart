// gruppo di test per la sezione Auth

import { login } from "../crud/auth";
import store from "../store";

window.alert = jest.fn();
console.log = console.error = jest.fn();


describe("authSlice login", () => {
    it("isSuccess", async () => {
        //console.log(store.getState());
        //const auth = {email:'aaaa'};
        //const result = login(store.dispatch, {email:'aaaa'});
        //const result = login( store.dispatch({email:'aaaa'}))
        
        //expect(result).toEqual(false);
        //const result = login(store.dispatch({email:'aaaa'}))
        //const store = configureStore();
        
        const auth = {email:"cirogiametta@msn.com", password:'adminadmin'};
        await store.dispatch(login(auth));
        //console.log(store.getState().auth);
        expect(store.getState().auth.isSuccess).toEqual(true);

    })
})

// npm i jest @types/jest @babel/core @babel/preset-env babel-jest -D