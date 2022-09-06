const registrationReducer = (state = [], action) => {
    switch (action.type) {
        case 'LOGIN_CREDS':
            return action.payload;
        case 'SET_PERSON_INFO':
            return [...state, action.payload];
        
    }
}

//When I come back: finish setting up reducer. need to be able to take in all new info and then send it to db on submit. 