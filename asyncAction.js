const redux = require("redux");
const createStore = redux.createStore;

const initialState = {
  loading: false,
  users:[],
  erro: "",
};

const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
const FETCH_USERS_FAILED = "FETCH_USERS_FAILED";

const fetchUsersRequest = () => {
    return {
    type: FETCH_USERS_REQUEST,
  };
}

const fetchUsersSuccess = (users) => {
    return {
    type: FETCH_USERS_SUCCESS,
    payload: users,
  };
}

const fetchUsersFailed = (error) => {
    return {
    type: FETCH_USERS_FAILED,
    payload: error,
  };
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USERS_SUCCESS:
      return {
        loading: false,
        users: action.payload,
        error: "",
      };
    case FETCH_USERS_FAILED:
      return {
        loading: false,
        users: [],
        error: action.payload,
      };
    default:
      return state;
  }
}

const store = createStore(reducer);


