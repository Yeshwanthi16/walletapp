const initialState = { user: null };

const reducerFn = (state = initialState, action) => {
  if (action.type === "LOGIN_SUCCESS") {
    return { ...state, user: action.payload };
  }
  if (action.type === "LOGOUT_SUCCESS") {
    return { ...state, user: null };
  }

  return state;
};

export default reducerFn;
