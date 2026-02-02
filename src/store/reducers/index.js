import { combineReducers } from 'redux';
import authReducer from './authReducer';
import clientReducer from './clientReducer';
import productReducer from './productReducer';
import shoppingCartReducer from './shoppingCartReducer';  

// Tüm reducer'ları birleştir
const rootReducer = combineReducers({
  auth: authReducer,         
  client: clientReducer,     
  product: productReducer,  
  shopping: shoppingCartReducer  
});

export default rootReducer;