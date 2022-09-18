
const userReducer = (state = {}, action) => {// this is only one user at a time
  switch (action.type) {
    case 'SET_USER':

      return action.payload;
    case 'UNSET_USER':
      return {};
    default:
      return state;
  }
};



// user will be on the redux state at:
// state.user
export default userReducer;

