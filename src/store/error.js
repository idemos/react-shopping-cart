import { createSlice } from "@reduxjs/toolkit";


const slice = createSlice({
    name:"error",
    initialState:{
        is:false,
        msg:''
    },
    reducers:{
        setError: (error, action) => {
            error.msg = action.payload.msg;
            error.is = action.payload.is;

            console.log("settato errore ne reducer");
        },
    }
});

const { setError } = slice.actions;

export default slice.reducer;

export const setErrorTrue = (msg) => async dispatch => {
//export const setErrorTrue = async (dispatch, msg) => {
    console.log("settato errore true");
    dispatch(setError({is:true, msg}));   
}

export const setErrorFalse = () => async (dispatch) => {
    console.log("settato errore false");
    dispatch(setError({is:false, msg:''}));   
}