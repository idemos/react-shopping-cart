import * as yup from 'yup';
import * as Auth from '../store/auth';
import {setErrorTrue, setErrorFalse} from '../store/error';



const login = async (dispatch, {email,password}) => {

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
          dispatch(Auth.failed());
          setErrorTrue(dispatch, 'Login o Password Errati');
      }else{
          dispatch(Auth.login(user[0]));
          setErrorFalse(dispatch);
      }


  } catch (e) {
      
      dispatch(Auth.failed());
      setErrorTrue(dispatch, 'Si sono verificati degli errori nella LOGIN');
      console.error(e.message);

  }
}

const logout = () => async dispatch => {
  
  try {
      const res = await fetch("http://localhost:5000/api/auth/logout");
      const auth = await res.json();

      return dispatch(Auth.logout());

  } catch (e) {
      
      console.error(e.message);
      setErrorTrue(dispatch, 'Si sono verificati degli errori al LOGOUT');
  }
}

export {login, logout};