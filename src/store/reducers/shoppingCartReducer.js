// Action types
const SET_CART = 'SET_CART';
const SET_PAYMENT = 'SET_PAYMENT';
const SET_ADDRESS = 'SET_SHIPPING_ADDRESS';
const ADD_TO_CART = 'ADD_TO_CART';          
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'; 
const CLEAR_CART = 'CLEAR_CART';
const TOGGLE_PRODUCT = 'TOGGLE_PRODUCT';
const UPDATE_PRODUCT_COUNT = 'UPDATE_PRODUCT_COUNT';

// LocalStorage helper functions
const loadCartFromStorage = () => {
  try {
    const serializedCart = localStorage.getItem('shoppingCart');
    if (serializedCart === null) {
      return [];
    }
    return JSON.parse(serializedCart);
  } catch (err) {
    console.error('Error loading cart from localStorage:', err);
    return [];
  }
};

const saveCartToStorage = (cart) => {
  try {
    const serializedCart = JSON.stringify(cart);
    localStorage.setItem('shoppingCart', serializedCart);
  } catch (err) {
    console.error('Error saving cart to localStorage:', err);
  }
};

//Initial state - Load from localStorage
const initialState = {
  cart: loadCartFromStorage(),  // Load from localStorage
  payment: {},  
  address: {}   
};

// Reducer fonksiyonu
const shoppingCartReducer = (state = initialState, action) => {
  let newCart;
  
  switch (action.type) {
    case SET_CART:
      newCart = action.payload;
      saveCartToStorage(newCart);  
      return {
        ...state,
        cart: newCart
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
    
    case ADD_TO_CART:
      const existingItem = state.cart.find(
        item => item.product.id === action.payload.product.id
      );
      
      if (existingItem) {
        // Ürün zaten sepette, count'u artır
        newCart = state.cart.map(item =>
          item.product.id === action.payload.product.id
            ? { ...item, count: item.count + action.payload.count }
            : item
        );
      } else {
        // Yeni ürün, sepete ekle (checked: true ekle)
        newCart = [...state.cart, { ...action.payload, checked: true }];
      }
      
      saveCartToStorage(newCart);  
      return {
        ...state,
        cart: newCart
      };
    
    case REMOVE_FROM_CART:
      newCart = state.cart.filter(
        item => item.product.id !== action.payload
      );
      saveCartToStorage(newCart);  
      return {
        ...state,
        cart: newCart
      };
    
    case CLEAR_CART:
      saveCartToStorage([]);  
      return {
        ...state,
        cart: []
      };
    
    case TOGGLE_PRODUCT:
      newCart = state.cart.map(item =>
        item.product.id === action.payload
          ? { ...item, checked: !item.checked }
          : item
      );
      saveCartToStorage(newCart);  
      return {
        ...state,
        cart: newCart
      };
    
    case UPDATE_PRODUCT_COUNT:
      const { productId, count } = action.payload;
      
      if (count < 1) {
        return state;
      }
      
      newCart = state.cart.map(item =>
        item.product.id === productId
          ? { ...item, count }
          : item
      );
      saveCartToStorage(newCart);  
      return {
        ...state,
        cart: newCart
      };
    
    default:
      return state;
  }
};

export default shoppingCartReducer;

export { 
  SET_CART, 
  SET_PAYMENT, 
  SET_ADDRESS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  TOGGLE_PRODUCT,
  UPDATE_PRODUCT_COUNT
};