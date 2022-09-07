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

function* moneySaga() {
    yield takeEvery('MONEY_PARAMETERS', moneyParameters);
}

export default moneySaga;