import {
  SET_ADDRESSES,
  SET_SELECTED_SHIPPING_ADDRESS,
  SET_SELECTED_BILLING_ADDRESS,
  SET_ADDRESS_FETCH_STATE
} from '../actions/addressActions';

const initialState = {
  addresses: [],
  selectedShippingAddress: null,
  selectedBillingAddress: null,
  fetchState: 'NOT_FETCHED' 
};

const addressReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ADDRESSES:
      return {
        ...state,
        addresses: action.payload
      };
    
    case SET_SELECTED_SHIPPING_ADDRESS:
      return {
        ...state,
        selectedShippingAddress: action.payload
      };
    
    case SET_SELECTED_BILLING_ADDRESS:
      return {
        ...state,
        selectedBillingAddress: action.payload
      };
    
    case SET_ADDRESS_FETCH_STATE:
      return {
        ...state,
        fetchState: action.payload
      };
    
    default:
      return state;
  }
};

export default addressReducer;