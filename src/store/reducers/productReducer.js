// Action types
const SET_CATEGORIES = 'SET_PRODUCT_CATEGORIES';
const SET_PRODUCT_LIST = 'SET_PRODUCT_LIST';
const SET_TOTAL = 'SET_PRODUCT_TOTAL';
const SET_FETCH_STATE = 'SET_FETCH_STATE';
const SET_LIMIT = 'SET_LIMIT';
const SET_OFFSET = 'SET_OFFSET';
const SET_FILTER = 'SET_FILTER';
const SET_SELECTED_PRODUCT = 'SET_SELECTED_PRODUCT'; 

// Initial state
const initialState = {
  categories: [],        
  productList: [],     
  total: 0,              
  limit: 25,             
  offset: 0,             
  filter: '',           
  fetchState: 'NOT_FETCHED',
  selectedProduct: null  
};

// Reducer fonksiyonu
const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload
      };
    
    case SET_PRODUCT_LIST:
      return {
        ...state,
        productList: action.payload
      };
    
    case SET_TOTAL:
      return {
        ...state,
        total: action.payload
      };
    
    case SET_FETCH_STATE:
      return {
        ...state,
        fetchState: action.payload
      };
    
    case SET_LIMIT:
      return {
        ...state,
        limit: action.payload
      };
    
    case SET_OFFSET:
      return {
        ...state,
        offset: action.payload
      };
    
    case SET_FILTER:
      return {
        ...state,
        filter: action.payload
      };
    
    
    case SET_SELECTED_PRODUCT:
      return {
        ...state,
        selectedProduct: action.payload
      };
    
    default:
      return state;
  }
};

export default productReducer;

// Action types'ı export et
export { 
  SET_CATEGORIES, 
  SET_PRODUCT_LIST, 
  SET_TOTAL, 
  SET_FETCH_STATE, 
  SET_LIMIT, 
  SET_OFFSET, 
  SET_FILTER,
  SET_SELECTED_PRODUCT  
};