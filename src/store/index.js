import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducer';

console.log('reducer =>', reducer);
// passiamo l'oggetto della configuration 

const store = configureStore({reducer});
export default store;