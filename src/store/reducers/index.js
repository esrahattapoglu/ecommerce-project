import { combineReducers } from 'redux';
import authReducer from './authReducer';
import clientReducer from './clientReducer';
import productReducer from './productReducer';
import shoppingCartReducer from './shoppingCartReducer';  
import addressReducer from './addressReducer'; 
import cardReducer from './cardReducer'; 
import orderReducer from './orderReducer';

// Tüm reducer'ları birleştirme
const rootReducer = combineReducers({
  auth: authReducer,         
  client: clientReducer,     
  product: productReducer,  
  shopping: shoppingCartReducer,
  address: addressReducer,
  card: cardReducer,
  order: orderReducer    
});

export default rootReducer;