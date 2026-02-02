// Action types
const SET_USER = 'SET_CLIENT_USER';
const SET_ADDRESS_LIST = 'SET_ADDRESS_LIST';
const SET_CREDIT_CARDS = 'SET_CREDIT_CARDS';
const SET_ROLES = 'SET_ROLES';
const SET_THEME = 'SET_THEME';
const SET_LANGUAGE = 'SET_LANGUAGE';
const SET_CATEGORIES = 'SET_CATEGORIES';
const SET_LOADING = 'SET_CLIENT_LOADING';
const SET_ERROR = 'SET_CLIENT_ERROR';

// Initial state
const initialState = {
  user: {},              
  addressList: [],       
  creditCards: [],       
  roles: [],             
  theme: '',             
  language: '',          
  categories: [],        
  loading: false,
  error: null
};

// Reducer fonksiyonu
const clientReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        error: null
      };
    
    case SET_ADDRESS_LIST:
      return {
        ...state,
        addressList: action.payload,
        error: null
      };
    
    case SET_CREDIT_CARDS:
      return {
        ...state,
        creditCards: action.payload,
        error: null
      };
    
    case SET_ROLES:
      return {
        ...state,
        roles: action.payload,
        loading: false,
        error: null
      };
    
    case SET_THEME:
      return {
        ...state,
        theme: action.payload
      };
    
    case SET_LANGUAGE:
      return {
        ...state,
        language: action.payload
      };
    
    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
        loading: false,
        error: null
      };
    
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    
    default:
      return state;
  }
};

export default clientReducer;

// Action types'ı export et
export { 
  SET_USER, 
  SET_ADDRESS_LIST, 
  SET_CREDIT_CARDS, 
  SET_ROLES, 
  SET_THEME, 
  SET_LANGUAGE, 
  SET_CATEGORIES, 
  SET_LOADING, 
  SET_ERROR 
};