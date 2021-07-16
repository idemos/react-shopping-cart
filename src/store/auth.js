import { createSlice } from "@reduxjs/toolkit";

// action types
// we dont need anymore

const slice = createSlice({
    name:"auth",
    initialState:{
        user:null,
        isFetching: false,
        isSuccess: false,
        isError: false,
        errorMessage: '',
    },
    reducers:{
        loginFailed: (auth, action) => {
            auth.user = false;
            auth.isSuccess = false;
            auth.isError = true;
        },
        loginSuccess: (auth, action) => {
            auth.user = action.payload;
            auth.isSuccess = true;
            auth.isError = false;
        },
        logoutSuccess: (auth, action) =>  {
            auth.user = false;
            auth.isSuccess = true;
            auth.isError = false;
        },
    }
});

const { loginSuccess, logoutSuccess, loginFailed } = slice.actions;
//export const selectAllauth = state => state.entities.auth;
export default slice.reducer;

//export const attemptLogin = ({ email, password }) => async dispatch => {
export const attemptLogin = async (dispatch, {email,password}) => {

    //console.log("email", email);
    //console.log("password", password);

    try {

        const res = await fetch("http://localhost:5000/api/auth", { 
            headers: {
              "Content-Type": "application/json;charset=utf-8"
            },
            method: "POST",
            body: JSON.stringify({email,password})
        });

        const user = await res.json();
        console.log("user", user);
        if(user.length === 0){
            dispatch(loginFailed());    
        }else{
            dispatch(loginSuccess(user[0]));
        }


    } catch (e) {
        
        dispatch(loginFailed());
        return console.error(e.message);

    }
}

export const attemptLogout = () => async dispatch => {
    try {
        const res = await fetch("http://localhost:5000/api/auth/logout");
        const auth = await res.json();

        return dispatch(logoutSuccess())

    } catch (e) {
        
        return console.error(e.message);
    }
}