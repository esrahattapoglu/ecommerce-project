import { fetchCards, addCard, updateCard, deleteCard } from '../../api/cardAPI';

// Action Types
export const SET_CARDS = 'SET_CARDS';
export const SET_SELECTED_CARD = 'SET_SELECTED_CARD';
export const SET_CARD_FETCH_STATE = 'SET_CARD_FETCH_STATE';

// Fetch Cards
export const fetchCardsAction = () => async (dispatch) => {
  dispatch({ type: SET_CARD_FETCH_STATE, payload: 'FETCHING' });
  
  try {
    const data = await fetchCards();
    dispatch({ type: SET_CARDS, payload: data });
    dispatch({ type: SET_CARD_FETCH_STATE, payload: 'FETCHED' });
  } catch (error) {
    console.error('Fetch cards error:', error);
    dispatch({ type: SET_CARD_FETCH_STATE, payload: 'FAILED' });
    throw error;
  }
};

// Add Card
export const addCardAction = (cardData) => async (dispatch) => {
  try {
    const newCard = await addCard(cardData);
    // Kartları yeniden çek
    dispatch(fetchCardsAction());
    return newCard;
  } catch (error) {
    console.error('Add card error:', error);
    throw error;
  }
};

// Update Card
export const updateCardAction = (cardData) => async (dispatch) => {
  try {
    const updatedCard = await updateCard(cardData);
    // Kartları yeniden çek
    dispatch(fetchCardsAction());
    return updatedCard;
  } catch (error) {
    console.error('Update card error:', error);
    throw error;
  }
};

// Delete Card
export const deleteCardAction = (cardId) => async (dispatch) => {
  try {
    await deleteCard(cardId);
    // Kartları yeniden çek
    dispatch(fetchCardsAction());
  } catch (error) {
    console.error('Delete card error:', error);
    throw error;
  }
};

// Select Card
export const setSelectedCard = (card) => ({
  type: SET_SELECTED_CARD,
  payload: card
});