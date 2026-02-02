import { 
  SET_CATEGORIES, 
  SET_PRODUCT_LIST, 
  SET_TOTAL, 
  SET_FETCH_STATE, 
  SET_LIMIT, 
  SET_OFFSET, 
  SET_FILTER 
} from '../reducers/productReducer';

import { fetchProducts } from '../../api/clientAPI';  

// ACTION CREATORS

export const setCategories = (categories) => ({
  type: SET_CATEGORIES,
  payload: categories
});

export const setProductList = (products) => ({
  type: SET_PRODUCT_LIST,
  payload: products
});

export const setTotal = (total) => ({
  type: SET_TOTAL,
  payload: total
});

export const setFetchState = (state) => ({
  type: SET_FETCH_STATE,
  payload: state
});

export const setLimit = (limit) => ({
  type: SET_LIMIT,
  payload: limit
});

export const setOffset = (offset) => ({
  type: SET_OFFSET,
  payload: offset
});

export const setFilter = (filter) => ({
  type: SET_FILTER,
  payload: filter
});

// THUNK ACTION
export const fetchProductsAction = (params = {}) => async (dispatch) => {
  try {
    dispatch(setFetchState('FETCHING'));
    
    //  Parametreleri gönder
    const data = await fetchProducts(params);
    
    dispatch(setProductList(data.products));
    dispatch(setTotal(data.total));
    dispatch(setFetchState('FETCHED'));
    
  } catch (error) {
    console.error('Ürünler yüklenirken hata:', error);
    dispatch(setFetchState('FAILED'));
  }
};