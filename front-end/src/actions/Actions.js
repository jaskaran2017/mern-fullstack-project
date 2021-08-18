import axios from "axios";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "../constants/UserConstants";

// first create a function for login
export const login = (email, password) => async (dispach) => {
  try {
      //first of all userLoginRequest will be sent then this will turn loading function on
    dispach({
      type: USER_LOGIN_REQUEST,
    });
    //after sending request successfully API will  be called
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const data = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );
// now waiting for API call response
    dispach({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    // when response recieved , local storage will be updated
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
      // if anything went wrong error message will be displayed
    dispach({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// second create a function for logOut

export const logout = () => async (dispatch) => {
    // when we call logout, all the infor removed from local storage
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
};

// creating function for new user registration

export const register = (name, email, password, pic) => async (dispach) => {
 // registration request is also same as login request. all steps are same
    try {
    dispach({
      type: USER_REGISTER_REQUEST,
    });
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users",
      { name, email, password, pic },
      config
    );
    dispach({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });
    dispach({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispach({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
