import { combineReducers } from 'redux';

const calculationReducer = (state = {}, action) => {
    switch(action.type) {
        case 'SET_CALCULATIONS':
            return action.payload
        default:
            return state;
    }
}

const userParameterReducer = (state = {}, action) => {//stores users money parameters from DB 
    switch(action.type) {
        case 'SET_USER_MONEY_PARAMETERS':
            return action.payload
        default:
            return state
    }
}

const personalInfoReducer = (state = [], action) => {//stores user personal information from the DB
    switch (action.type) {
      case 'SET_USER_PERSONAL_INFO':
        return action.payload;
      default:
        return state;
    }
  }

export default combineReducers({
    calculationReducer,
    userParameterReducer,
    personalInfoReducer
  });