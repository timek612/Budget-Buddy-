import { combineReducers } from 'redux';

const expenseReducer = (state = [], action) => {
    switch(action.type) {
        case 'SEND_RECURRING_EXPENSES':
            console.log(action.payload);
            return action.payload
        default:
            return state;
    }
}

export default combineReducers({
    expenseReducer
  });