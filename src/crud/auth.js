
import * as Auth from '../store/auth';
import {setErrorTrue, setErrorFalse} from '../store/error';
import jwtDecode from "jwt-decode";



const login = async (dispatch, {email,password}) => {

  console.log("email", email);
  console.log("password", password);

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
      if(user.token && user.token.length > 0){

          const obj = jwtDecode(user.token);
          console.log("obj",obj);
          dispatch(Auth.login(obj));
          setErrorFalse(dispatch);

          localStorage.setItem('user_token', obj);
          
          return true;

      }else if(user.error && user.error.length > 0){

          dispatch(Auth.failed());
          setErrorTrue(dispatch, 'Login o Password Errati');
          localStorage.removeItem('user_token');

          alert('Login o Password Errati');

          
          return false;

      }else{

          dispatch(Auth.failed());
          setErrorTrue(dispatch, 'Errore inaspettato');
          localStorage.removeItem('user_token');
          
          alert('Errore inaspettato');
          return false;

      }


  } catch (error) {

    // console.log("error.response: ", error);

    // if(error.response && error.response.status === 404){
    //     alert('Utente non presente');
    //     dispatch(Auth.failed());
    //     setErrorTrue(dispatch, 'Utente non presente');
    // }else{
    //     dispatch(Auth.failed());
    //     setErrorTrue(dispatch, 'Si sono verificati degli errori nella LOGIN');
    //     alert('Si sono verificati degli errori nella LOGIN');
    //     console.error(error.message);
    // }
    

    dispatch(Auth.failed());
    setErrorTrue(dispatch, 'Si sono verificati degli errori nella LOGIN');
    alert('Si sono verificati degli errori nella LOGIN');
    console.error(error.message);

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