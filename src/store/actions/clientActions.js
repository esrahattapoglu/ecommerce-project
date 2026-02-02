import { fetchRoles, fetchCategories } from '../../api/clientAPI';
import { 
  SET_USER, 
  SET_ADDRESS_LIST, 
  SET_CREDIT_CARDS, 
  SET_ROLES, 
  SET_THEME, 
  SET_LANGUAGE, 
  SET_CATEGORIES, 
  SET_LOADING, 
  SET_ERROR 
} from '../reducers/clientReducer';


// SYNC ACTION CREATORS (Basit action'lar)


export const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

export const setAddressList = (addressList) => ({
  type: SET_ADDRESS_LIST,
  payload: addressList
});

export const setCreditCards = (creditCards) => ({
  type: SET_CREDIT_CARDS,
  payload: creditCards
});

export const setRoles = (roles) => ({
  type: SET_ROLES,
  payload: roles
});

export const setTheme = (theme) => ({
  type: SET_THEME,
  payload: theme
});

export const setLanguage = (language) => ({
  type: SET_LANGUAGE,
  payload: language
});

export const setCategories = (categories) => ({
  type: SET_CATEGORIES,
  payload: categories
});


// ASYNC ACTION CREATORS (Thunk action'lar)


// Fetch Roles Action (Rolleri Çek)
export const fetchRolesAction = () => async (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  dispatch({ type: SET_ERROR, payload: null });
  
  try {
    const roles = await fetchRoles();
    
    // Başarılı rolleri kaydet
    dispatch({ type: SET_ROLES, payload: roles });
    
    return roles;
    
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.message || 'Roller yüklenemedi' });
    dispatch({ type: SET_LOADING, payload: false });
    throw error;
  }
};

// fetch categories action kategorileri çek
export const fetchCategoriesAction = () => async (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  dispatch({ type: SET_ERROR, payload: null });
  
  try {
    const categories = await fetchCategories();
    
    dispatch({ type: SET_CATEGORIES, payload: categories });
    
    return categories;
    
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.message || 'Kategoriler yüklenemedi' });
    dispatch({ type: SET_LOADING, payload: false });
    throw error;
  }
};