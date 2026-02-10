import {
  SET_CARDS,
  SET_SELECTED_CARD,
  SET_CARD_FETCH_STATE
} from '../actions/cardActions';

const initialState = {
  cards: [],
  selectedCard: null,
  fetchState: 'NOT_FETCHED' 
};

const cardReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CARDS:
      return {
        ...state,
        cards: action.payload
      };
    
    case SET_SELECTED_CARD:
      return {
        ...state,
        selectedCard: action.payload
      };
    
    case SET_CARD_FETCH_STATE:
      return {
        ...state,
        fetchState: action.payload
      };
    
    default:
      return state;
  }
};

export default cardReducer;