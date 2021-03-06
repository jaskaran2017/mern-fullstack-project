import { createStore, combineReducers, applyMiddleware } from "redux";

import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userLoginReducer, userRegisterReducer, userUpdateReducer } from "./reducers/UserReducers";
import { noteCreateReducer, noteListReducer } from "./reducers/NotesReducers";

// create reducer
const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  noteList: noteListReducer,
  noteCreate: noteCreateReducer,
  userUpdate: userUpdateReducer,
});

// setting up initial state
// But before we need to check if there is anything in the local storage using condition
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

export const middleware = [thunk];

//creating store
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store; // from here we will export the store inside index.js file and wrap our app
