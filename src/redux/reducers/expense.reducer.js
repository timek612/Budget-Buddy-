import { combineReducers } from 'redux';

const expenseReducer = (state = [], action) => {//Where retrieved expenses are stored
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

const currentExpense = (state = {}, action) => {//for storing 1 expense used for editing 
    switch (action.type) {
        case 'SET_EXPENSE':
            return action.payload;
        default:
            return state;
    }
}

const chartData = (state = [], action) => {//for storing data to be used by the pie chart
    switch (action.type) {
        case 'SET_USER_CHART_DATA':
            return action.payload;
        default:
            return state;
    }
}

const snackbarReducer = (state = [], action) => {//for storing snackbar messages
    switch(action.type) {
        case 'SNACKBAR_MESSAGE':
            return action.payload;
        default:
            return state;
    }
}

const allExpenses = (state = [], action) => {//Where all expenses are stored for displaying recent expenses
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