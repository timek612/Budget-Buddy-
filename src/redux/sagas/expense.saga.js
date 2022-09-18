import { put, takeLatest, takeEvery, take } from 'redux-saga/effects';
import axios from 'axios';
import { useDispatch } from 'react-redux'


function* editExpense (action) {
    try {
        console.log(action.payload);
        yield axios.put(`/money/editExpense/${action.payload.id}`, action.payload)
        yield axios.put('/expense', action.payload)
        // yield put({type: 'GET_INDIVIDUAL'})
    }
    catch {
        console.log('EXPENSE SAGA: error in editing expense');
    }
}

function* deleteExpense (id) {
    try {
        console.log(id);
        yield axios.put(`/money/${id.payload}`)
        yield axios.delete(`/expense/${id.payload}`)
        yield put({type: 'GET_INDIVIDUAL'})
    }
    catch {
        console.log('EXPENSE SAGA: error in deleting expense');
    }
}

function* getRecurringExpenses () {
    
    try {

        const response = yield axios.get('/expense/recurring')
        console.log('SENDING RECURRING');
        yield put({type: 'SEND_RECURRING_EXPENSES', payload: response.data})
    }
    catch {
        console.log('EXPENSE SAGA: error in recurring retrieval');
    }
}

function* getIndividual () {
    try {
        const response = yield axios.get('/expense/individual')
        console.log('SENDING INDIVIDUAL');
        yield put({type: 'SEND_INDIVIDUAL_EXPENSES', payload: response.data})
    }
    catch {
        console.log('EXPENSE SAGA: error in individual retrieval');
    }
}

function* newExpense (action) {
    try {
        yield axios.post('/expense', action.payload)
    }
    catch {
        console.log('EXPENSE SAGA: error');
    }
}

function* getChartData () {
    try {
        let response = yield axios.get('/money/chartData')
        // console.log(response.data);
        yield put({type: 'SET_USER_CHART_DATA', payload: response.data})
    }   
    catch {
        console.log('MONEY SAGA: error in getting chart data');
    }
}

function* getAllExpenses () {
    try {
        let response = yield axios.get('/expense/getAllExpenses')
        // console.log(response.data);
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