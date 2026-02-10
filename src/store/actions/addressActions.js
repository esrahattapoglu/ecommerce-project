import { fetchAddresses, addAddress, updateAddress, deleteAddress } from '../../api/addressAPI';

// Action Types
export const SET_ADDRESSES = 'SET_ADDRESSES';
export const SET_SELECTED_SHIPPING_ADDRESS = 'SET_SELECTED_SHIPPING_ADDRESS';
export const SET_SELECTED_BILLING_ADDRESS = 'SET_SELECTED_BILLING_ADDRESS';
export const SET_ADDRESS_FETCH_STATE = 'SET_ADDRESS_FETCH_STATE';

// Fetch Addresses
export const fetchAddressesAction = () => async (dispatch) => {
  dispatch({ type: SET_ADDRESS_FETCH_STATE, payload: 'FETCHING' });
  
  try {
    const data = await fetchAddresses();
    dispatch({ type: SET_ADDRESSES, payload: data });
    dispatch({ type: SET_ADDRESS_FETCH_STATE, payload: 'FETCHED' });
  } catch (error) {
    console.error('Fetch addresses error:', error);
    dispatch({ type: SET_ADDRESS_FETCH_STATE, payload: 'FAILED' });
    throw error;
  }
};

// Add Address
export const addAddressAction = (addressData) => async (dispatch) => {
  try {
    const newAddress = await addAddress(addressData);
    // Adresleri yeniden çek
    dispatch(fetchAddressesAction());
    return newAddress;
  } catch (error) {
    console.error('Add address error:', error);
    throw error;
  }
};

// Update Address
export const updateAddressAction = (addressData) => async (dispatch) => {
  try {
    const updatedAddress = await updateAddress(addressData);
    // Adresleri yeniden çek
    dispatch(fetchAddressesAction());
    return updatedAddress;
  } catch (error) {
    console.error('Update address error:', error);
    throw error;
  }
};

// Delete Address
export const deleteAddressAction = (addressId) => async (dispatch) => {
  try {
    await deleteAddress(addressId);
    // Adresleri yeniden çek
    dispatch(fetchAddressesAction());
  } catch (error) {
    console.error('Delete address error:', error);
    throw error;
  }
};

// Select Shipping Address
export const setShippingAddress = (address) => ({
  type: SET_SELECTED_SHIPPING_ADDRESS,
  payload: address
});

// Select Billing Address
export const setBillingAddress = (address) => ({
  type: SET_SELECTED_BILLING_ADDRESS,
  payload: address
});