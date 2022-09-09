import { put, takeLatest, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { useDispatch } from 'react-redux'


function* getRecurringExpenses () {
    
    try {

        const response = yield axios.get('/expense/recurring')
        console.log('SENDING RECURRING');
        yield put({type: 'SEND_RECURRING_EXPENSES', payload: response.data})
    }
    catch {
        console.log('error in recurring retrieval');
    }
}

function* getIndividual () {
    try {
        const response = yield axios.get('/expense/individual')
        console.log('SENDING INDIVIDUAL');
        yield put({type: 'SEND_INDIVIDUAL_EXPENSES', payload: response.data})
    }
    catch {
        console.log('error in individual retrieval');
    }
}

function* newExpense (action) {
    try {
        yield axios.post('/expense', action.payload)
    }
    catch {
        console.log('error');
    }
}

function* expenseSaga () {
    yield takeEvery ('GET_RECURRING', getRecurringExpenses);
    yield takeEvery ('GET_INDIVIDUAL', getIndividual)
    yield takeEvery ('NEW_EXPENSE', newExpense)
}

export default expenseSaga;