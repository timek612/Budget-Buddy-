import { put, takeLatest, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


function* fetchUserParameters () {
    try {
        let response = yield axios.get('/money')

        yield put({type: 'SET_USER_MONEY_PARAMETERS', payload:response.data[0]})
    }
    catch {
        console.log('MONEY SAGA: error in getting user money parameters');
    }
}

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
        console.log('error');
    }
}

function* getAllowance () {
    try {
        let response = yield axios.get('/money/allowance')
        console.log(response.data);
        yield put({type: 'SET_CALCULATIONS', payload: response.data})
    }
    catch {
        console.log('MONEY SAGA: error in getting allowance');
    }
}

function* updateUserParams (action) {
    try {
        console.log(action.payload);
        yield axios.post('/api/user/updateMoney', action.payload)
    }
    catch {
        console.log('MONEY SAGA: error in updating params');
    }
}

function* moneySaga() {
    yield takeEvery('MONEY_PARAMETERS', moneyParameters);
    yield takeEvery('NEW_RECURRING_EXPENSE', newRecurringExpense)
    yield takeEvery('GET_ALLOWANCE', getAllowance)
    yield takeEvery('FETCH_USER_PARAMETERS', fetchUserParameters)
    yield takeEvery('UPDATED_USER_PARAMS', updateUserParams)
}

export default moneySaga;