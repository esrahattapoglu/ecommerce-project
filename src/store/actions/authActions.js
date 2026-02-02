import { signupUser, loginUser, verifyToken } from '../../api/authAPI';
import { SET_USER, SET_TOKEN, SET_LOADING, SET_ERROR, LOGOUT } from '../reducers/authReducer';

// Signup action (kayıt ol)
export const signupAction = (formData) => async (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  dispatch({ type: SET_ERROR, payload: null });
  
  try {
    const response = await signupUser(formData);
    
    // Başarılı
    dispatch({ type: SET_LOADING, payload: false });
    
    return response;
    
  } catch (error) {
    // Hata
    dispatch({ type: SET_ERROR, payload: error.message || 'Kayıt başarısız' });
    dispatch({ type: SET_LOADING, payload: false });
    
    throw error;
  }
};

// Login action 
export const loginAction = (credentials) => async (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  dispatch({ type: SET_ERROR, payload: null });
  
  try {
    const response = await loginUser(credentials);
    
    const userData = {
      name: response.name,
      email: response.email,
      role_id: response.role_id
    };
    
    // Tokenı kaydet 
    dispatch({ type: SET_TOKEN, payload: response.token });
    
    // Userı kaydet (auth reducer'a)
    dispatch({ type: SET_USER, payload: userData });
    
    // Userı client reducer'a da kaydet
    dispatch({ 
      type: 'SET_CLIENT_USER', 
      payload: userData 
    });
    
    dispatch({ type: SET_LOADING, payload: false });
    
    return {
      token: response.token,
      user: userData
    };
    
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.message || 'Giriş başarısız' });
    dispatch({ type: SET_LOADING, payload: false });
    throw error;
  }
};

// Verify Token Action (Token Doğrula)( Uygulama başlarken otomatik çağrılacak)
export const verifyTokenAction = () => async (dispatch) => {
  // Önce localStorage'dan kontrol et
  let token = localStorage.getItem('token');
  
  // localStorage'da yoksa sessionStorage'dan kontrol et
  if (!token) {
    token = sessionStorage.getItem('token');
  }
  
  if (!token) {
    console.log('No token found');
    return;
  }
  
  console.log('Token found, verifying...');
  
  dispatch({ type: SET_LOADING, payload: true });
  
  try {
    
    const response = await verifyToken();
    
    console.log('Verify response:', response);
    
    // API'den user bilgisi geldi mi kontrol et
    if (response && response.name && response.email) {
      const userData = {
        name: response.name,
        email: response.email,
        role_id: response.role_id
      };
      
      console.log('User data from verify:', userData);
      
      // User'ı auth reducer'a kaydet
      dispatch({ type: SET_USER, payload: userData });
      
      // User'ı client reducer'a da kaydet
      dispatch({ 
        type: 'SET_CLIENT_USER', 
        payload: userData 
      });
      
      //Token'ı Redux'a kaydet
      dispatch({ type: SET_TOKEN, payload: token });
      
      dispatch({ type: SET_LOADING, payload: false });
      
      console.log('Auto login successful!');
      
      return userData;
    } else {
      // Response beklenen yapıda değil, logout yap
      console.error('Invalid response structure:', response);
      throw new Error('Invalid response from server');
    }
    
  } catch (error) {
    // Token geçersiz veya hata var, çıkış yap
    console.error('Token verification failed:', error);
    console.error('Error details:', error.response?.data || error.message);
    
    dispatch({ type: LOGOUT });
    dispatch({ type: SET_LOADING, payload: false });
  }
};


// Logout action (çıkış yap)
export const logoutAction = () => (dispatch) => {
  console.log('Logging out...');
  
  // localStorage ve sessionStorage'dan sil
  localStorage.removeItem('token');
  sessionStorage.removeItem('token');
  
  // Redux state'i temizle
  dispatch({ type: LOGOUT });
  
 
};