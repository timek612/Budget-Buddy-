import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/user', config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_USER', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* fetchPersonalInfo() {
  try {
    // console.log('FETCHING');
    let response = yield axios.get('/api/user/getUserInfo')
    // console.log(response.data[0]);
    yield put({type:'FETCH_USER'})
  }
  catch {
    console.log('USER SAGA: error in retrieving user personal info');
  }
}

function* updatePersonalInfo(action) {
  try {
    yield axios.post('/api/user/updatePersonalInfo', action.payload)
    yield fetchPersonalInfo()
  }
  catch {
    console.log('USER SAGA: error in updating personal info');
  }
}

function* userSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
  yield takeEvery('FETCH_USER_PERSONAL_INFO', fetchPersonalInfo)
  yield takeEvery('UPDATED_PERSONAL_INFO', updatePersonalInfo)
}

export default userSaga;
