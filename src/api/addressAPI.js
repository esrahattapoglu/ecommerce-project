import axiosInstance from './axiosInstance';

// Tüm adresleri getir
export const fetchAddresses = async () => {
  const response = await axiosInstance.get('/user/address');
  return response.data;
};

// Yeni adres ekle
export const addAddress = async (addressData) => {
  const response = await axiosInstance.post('/user/address', addressData);
  return response.data;
};

// Adres güncelle
export const updateAddress = async (addressData) => {
  const response = await axiosInstance.put('/user/address', addressData);
  return response.data;
};

// Adres sil
export const deleteAddress = async (addressId) => {
  const response = await axiosInstance.delete(`/user/address/${addressId}`);
  return response.data;
};