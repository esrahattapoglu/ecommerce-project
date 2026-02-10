import { 
  SET_CART, 
  SET_PAYMENT, 
  SET_ADDRESS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  TOGGLE_PRODUCT,              
  UPDATE_PRODUCT_COUNT         
} from '../reducers/shoppingCartReducer';


// ACTION CREATORS

export const setCart = (cart) => ({
  type: SET_CART,
  payload: cart
});

export const setPayment = (payment) => ({
  type: SET_PAYMENT,
  payload: payment
});

export const setAddress = (address) => ({
  type: SET_ADDRESS,
  payload: address
});

export const addToCart = (product, count = 1) => ({
  type: ADD_TO_CART,
  payload: { product, count }
});

export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId
});

export const clearCart = () => ({
  type: CLEAR_CART
});

//  Ürün seçimini değiştir
export const toggleProduct = (productId) => ({
  type: TOGGLE_PRODUCT,
  payload: productId
});

//  Ürün adedini güncelle
export const updateProductCount = (productId, count) => ({
  type: UPDATE_PRODUCT_COUNT,
  payload: { productId, count }
});