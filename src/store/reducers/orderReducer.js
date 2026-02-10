import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILURE,
  FETCH_ORDER_HISTORY_REQUEST,
  FETCH_ORDER_HISTORY_SUCCESS,
  FETCH_ORDER_HISTORY_FAILURE
} from '../actions/orderActions';

const initialState = {
  currentOrder: null,
  orderHistory: [],
  loading: false,
  fetchingHistory: false, 
  error: null
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    
    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        currentOrder: action.payload,
        orderHistory: [...state.orderHistory, action.payload],
        error: null
      };
    
    case CREATE_ORDER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    
    // Fetch Order History
    case FETCH_ORDER_HISTORY_REQUEST:
      return {
        ...state,
        fetchingHistory: true,
        error: null
      };
    
    case FETCH_ORDER_HISTORY_SUCCESS:
      return {
        ...state,
        fetchingHistory: false,
        orderHistory: action.payload,
        error: null
      };
    
    case FETCH_ORDER_HISTORY_FAILURE:
      return {
        ...state,
        fetchingHistory: false,
        error: action.payload
      };
    
    default:
      return state;
  }
};

export default orderReducer;