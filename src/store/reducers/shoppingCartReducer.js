// Action types
const SET_CART = 'SET_CART';
const SET_PAYMENT = 'SET_PAYMENT';
const SET_ADDRESS = 'SET_SHIPPING_ADDRESS';
const ADD_TO_CART = 'ADD_TO_CART';          
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'; 
const CLEAR_CART = 'CLEAR_CART';            

// Initial state
const initialState = {
  cart: [],      
  payment: {},  
  address: {}   
};

// Reducer fonksiyonu
const shoppingCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CART:
      return {
        ...state,
        cart: action.payload
      };
    
    case SET_PAYMENT:
      return {
        ...state,
        payment: action.payload
      };
    
    case SET_ADDRESS:
      return {
        ...state,
        address: action.payload
      };
    
    // BONUS: Sepete ürün ekle (daha pratik)
    case ADD_TO_CART:
      const existingItem = state.cart.find(
        item => item.product.id === action.payload.product.id
      );
      
      if (existingItem) {
        // Ürün zaten sepette, count'u artır
        return {
          ...state,
          cart: state.cart.map(item =>
            item.product.id === action.payload.product.id
              ? { ...item, count: item.count + action.payload.count }
              : item
          )
        };
      } else {
        // Yeni ürün, sepete ekle
        return {
          ...state,
          cart: [...state.cart, action.payload]
        };
      }
    
    // BONUS: Sepetten ürün çıkar
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(
          item => item.product.id !== action.payload
        )
      };
    
    // BONUS: Sepeti temizle
    case CLEAR_CART:
      return {
        ...state,
        cart: []
      };
    
    default:
      return state;
  }
};

export default shoppingCartReducer;

// Action types'ı export et
export { 
  SET_CART, 
  SET_PAYMENT, 
  SET_ADDRESS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART
};