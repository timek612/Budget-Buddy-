import { combineReducers } from 'redux';

const expenseReducer = (state = [], action) => {
    switch(action.type) {
        case 'SEND_RECURRING_EXPENSES':
            console.log(action.payload);
            return action.payload //recurring expenses
        case 'SEND_INDIVIDUAL_EXPENSES':
            console.log(action.payload);
            return action.payload //individual expenses
        default:
            return state;
    }
}

const currentExpense = (state = {}, action) => {
    switch (action.type) {
        case 'SET_EXPENSE':
            console.log(action.payload);
            return action.payload;
        default:
            return state;
    }
}

const chartData = (state = [], action) => {
    switch (action.type) {
        case 'SET_USER_CHART_DATA':
            console.log(action.payload);
            return action.payload;
        default:
            return state;
    }
}

const snackbarReducer = (state = [], action) => {
    switch(action.type) {
        case 'SNACKBAR_MESSAGE':
            return action.payload;
        default:
            return state;
    }
}

const allExpenses = (state = [], action) => {
    switch(action.type) {
        case 'STORE_ALL_EXPENSES':
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    expenseReducer,
    currentExpense,
    chartData,
    snackbarReducer,
    allExpenses
  });