import { createOrder, fetchOrders } from '../../api/orderAPI';

// Action Types
export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILURE = 'CREATE_ORDER_FAILURE';

// Fetch Order History Action Types
export const FETCH_ORDER_HISTORY_REQUEST = 'FETCH_ORDER_HISTORY_REQUEST';
export const FETCH_ORDER_HISTORY_SUCCESS = 'FETCH_ORDER_HISTORY_SUCCESS';
export const FETCH_ORDER_HISTORY_FAILURE = 'FETCH_ORDER_HISTORY_FAILURE';

// Create Order Action
export const createOrderAction = (orderData) => async (dispatch) => {
  dispatch({ type: CREATE_ORDER_REQUEST });
  
  try {
    const response = await createOrder(orderData);
    dispatch({ 
      type: CREATE_ORDER_SUCCESS, 
      payload: response 
    });
    return response;
  } catch (error) {
    console.error('Create order error:', error);
    dispatch({ 
      type: CREATE_ORDER_FAILURE, 
      payload: error.response?.data?.message || 'Order creation failed' 
    });
    throw error;
  }
};

// Fetch Order History Action
export const fetchOrderHistoryAction = () => async (dispatch) => {
  dispatch({ type: FETCH_ORDER_HISTORY_REQUEST });
  
  try {
    const response = await fetchOrders();
    dispatch({ 
      type: FETCH_ORDER_HISTORY_SUCCESS, 
      payload: response 
    });
    return response;
  } catch (error) {
    console.error('Fetch order history error:', error);
    dispatch({ 
      type: FETCH_ORDER_HISTORY_FAILURE, 
      payload: error.response?.data?.message || 'Failed to fetch order history' 
    });
    throw error;
  }
};