import axiosInstance from './axiosInstance';

// Kullanıcı kaydı
export const signupUser = async (formData) => {
  try {
    const response = await axiosInstance.post('/signup', formData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Login için
export const loginUser = async (credentials) => {
  try {
    const response = await axiosInstance.post('/login', credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Token doğrulama
export const verifyToken = async () => {
  try {
    
    const response = await axiosInstance.get('/verify');
    return response.data;
  } catch (error) {
    console.error('Verify token API error:', error.response || error);
    throw error.response?.data || error.message;
  }
};