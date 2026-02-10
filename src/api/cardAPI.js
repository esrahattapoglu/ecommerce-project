import axiosInstance from './axiosInstance';

// Tüm kartları getir
export const fetchCards = async () => {
  const response = await axiosInstance.get('/user/card');
  return response.data;
};

// Yeni kart ekle
export const addCard = async (cardData) => {
  const response = await axiosInstance.post('/user/card', cardData);
  return response.data;
};

// Kart güncelle
export const updateCard = async (cardData) => {
  const response = await axiosInstance.put('/user/card', cardData);
  return response.data;
};

// Kart sil
export const deleteCard = async (cardId) => {
  const response = await axiosInstance.delete(`/user/card/${cardId}`);
  return response.data;
};