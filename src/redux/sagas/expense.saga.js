import { put, takeEvery, } from 'redux-saga/effects';
import axios from 'axios';


function* editExpense (action) {//Saga for editing an expense 
    try {
        yield axios.put(`/money/editExpense/${action.payload.id}`, action.payload)
        yield axios.put('/expense', action.payload)
    }
    catch {
        console.log('EXPENSE SAGA: error in editing expense');
    }
}

function* deleteExpense (id) {//Saga for deleting an expense
    try {
        yield axios.put(`/money/${id.payload}`)
        yield axios.delete(`/expense/${id.payload}`)
        yield put({type: 'GET_INDIVIDUAL'})
    }
    catch {
        console.log('EXPENSE SAGA: error in deleting expense');
    }
}

function* getRecurringExpenses () {//Saga for retrieving recurring expenses
    try {
        const response = yield axios.get('/expense/recurring')
        yield put({type: 'SEND_RECURRING_EXPENSES', payload: response.data})
    }
    catch {
        console.log('EXPENSE SAGA: error in recurring retrieval');
    }
}

function* getIndividual () {//Saga for retrieving individual expenses
    try {
        const response = yield axios.get('/expense/individual')
        yield put({type: 'SEND_INDIVIDUAL_EXPENSES', payload: response.data})
    }
    catch {
        console.log('EXPENSE SAGA: error in individual retrieval');
    }
}

function* newExpense (action) {//Saga for creating a new expense
    try {
        yield axios.post('/expense', action.payload)
    }
    catch {
        console.log('EXPENSE SAGA: error');
    }
}

function* getChartData () {//Saga for retrieving data for pie chart
    try {
        let response = yield axios.get('/money/chartData')
        yield put({type: 'SET_USER_CHART_DATA', payload: response.data})
    }   
    catch {
        console.log('MONEY SAGA: error in getting chart data');
    }
}

function* getAllExpenses () {//Saga for retrieving all expenses for a user
    try {
        let response = yield axios.get('/expense/getAllExpenses')
        yield put({type: 'STORE_ALL_EXPENSES', payload: response.data})
    }
    catch {
        console.log('EXPENSE SAGA: error in getting ALL expenses');
    }
}

function* expenseSaga () {
    yield takeEvery ('GET_RECURRING', getRecurringExpenses);
    yield takeEvery ('GET_INDIVIDUAL', getIndividual)
    yield takeEvery ('NEW_EXPENSE', newExpense)
    yield takeEvery ('DELETE_EXPENSE', deleteExpense)
    yield takeEvery ('EDITED_EXPENSE', editExpense)
    yield takeEvery ('GET_CHART_DATA', getChartData)
    yield takeEvery ('GET_ALL_EXPENSES', getAllExpenses)
}

export default expenseSaga;