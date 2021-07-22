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
        failed: (auth, action) => {
            auth.user = false;
            auth.isSuccess = false;
            auth.isError = true;
        },
        success: (auth, action) => {
            auth.user = action.payload;
            auth.isSuccess = true;
            auth.isError = false;
        },
        logout: (auth, action) =>  {
            auth.user = false;
            auth.isSuccess = true;
            auth.isError = false;
        },
    }
});

export const { login, logout, failed } = slice.actions;
//export const selectAllauth = state => state.entities.auth;
export default slice.reducer;