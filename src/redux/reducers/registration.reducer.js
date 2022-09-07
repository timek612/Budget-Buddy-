import { combineReducers } from 'redux';
const registrationReducer = (state = {}, action) => {
    switch (action.type) {
        case 'LOGIN_CREDS':
            console.log(action.payload);
            return action.payload;
        case 'SET_PERSON_INFO':
            return action.payload;
        default:
            return state; 
        ;
    }
    
}

const userData = (state = {}, action) => {
    switch (action.type) {
        case 'SEND_IT':
            return action.payload;
        default:
            return state;
    }
}


export default combineReducers({
    registrationReducer,
    userData
  });

//When I come back: finish setting up reducer. need to be able to take in all new info and then send it to db on submit. 