import { put, takeLatest, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { useDispatch } from 'react-redux'

function* getRecurringExpenses (action) {
    
    try {

        const response = yield axios.get('/expense')
        console.log('SENDING');
        yield put({type: 'SEND_RECURRING_EXPENSES', payload: response.data})
    }
    catch {
        console.log('error');
    }
}

function* expenseSaga () {
    yield takeEvery ('GET_RECURRING', getRecurringExpenses)
}

export default expenseSaga;