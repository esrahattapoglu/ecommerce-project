// Action types
const SET_USER = 'SET_USER';
const SET_TOKEN = 'SET_TOKEN';
const SET_LOADING = 'SET_LOADING';
const SET_ERROR = 'SET_ERROR';
const LOGOUT = 'LOGOUT';

// Initial state (Başlangıç durumu)
const initialState = {
  user: null,           
  token: null,          
  loading: false,       
  error: null          
};

// Reducer fonksiyonu
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        error: null
      };
    
    case SET_TOKEN:
      
      return {
        ...state,
        token: action.payload,
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
    
    case LOGOUT:
      // Çıkış yap( Her şeyi temizle)
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
      return {
        ...initialState,
        token: null
      };
    
    default:
      return state;
  }
};

export default authReducer;


export { SET_USER, SET_TOKEN, SET_LOADING, SET_ERROR, LOGOUT };