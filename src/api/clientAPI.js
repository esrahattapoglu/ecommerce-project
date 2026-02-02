import axiosInstance from './axiosInstance';

//rol listesini çek
export const fetchRoles = async () => {
  try {
    const response = await axiosInstance.get('/roles');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

//categories, products vs. için 
export const fetchCategories = async () => {
  try {
    const response = await axiosInstance.get('/categories');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const fetchProducts = async (params = {}) => {
  try {
    const queryParams = new URLSearchParams();
    
    if (params.category) {
      queryParams.append('category', params.category);
    }
    if (params.sort && params.sort !== '') {
      queryParams.append('sort', params.sort);
    }
    if (params.filter && params.filter !== '') {
      queryParams.append('filter', params.filter);
    }
    
    queryParams.append('limit', params.limit || 600);
    
    const response = await axiosInstance.get(`/products?${queryParams.toString()}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};