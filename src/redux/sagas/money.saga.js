import { put, takeLatest, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* moneyParameters (action) {// saga for the income post dispatch
    console.log(action);

    try {
        yield axios.post('/money', action.payload);
        // yield axios.post('/money', test);

    }
    catch {
        console.log('error');
    }
}

function* newRecurringExpense (action) {
    console.log(action);
    try {
        yield axios.post('/money/recurring', action.payload);
    }
    catch {

    }
}


function* moneySaga() {
    yield takeEvery('MONEY_PARAMETERS', moneyParameters);
    yield takeEvery('NEW_RECURRING_EXPENSE', newRecurringExpense)
}

export default moneySaga;