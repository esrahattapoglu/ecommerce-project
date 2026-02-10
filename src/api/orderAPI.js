import axiosInstance from './axiosInstance';

//Sipariş oluştur
export const createOrder = async (orderData) => {
  const response = await axiosInstance.post('/order', orderData);
  
  return response.data;
};

//siparişleri getir
export const fetchOrders = async () => {
  const response = await axiosInstance.get('/order');
  return response.data;
};