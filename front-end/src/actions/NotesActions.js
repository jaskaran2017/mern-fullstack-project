import axios from "axios";
import {
  NOTES_CREATE_FAIL,
  NOTES_CREATE_REQUEST,
  NOTES_CREATE_SUCCESS,
  NOTES_LIST_FAIL,
  NOTES_LIST_REQUEST,
  NOTES_LIST_SUCCESS,
} from "../constants/NotesConstants";

// fetching all the stored NOTES in database

export const listNotes = () => async (dispatch, getState) => {
  try {
    //first note list request will be fired and it will show the loading animation
    dispatch({
      type: NOTES_LIST_REQUEST,
    });
    //before calling api we awill fetch the user info from getState() function provided by redux
    const {
      userLogin: { userInfo },
    } = getState();
    // then api call will be fired with the middleware as  validator
    const config = {
      //for validation part
      headers: {
        Authorization: `Bearer ${userInfo.data.token}`,
      },
    };
    // console.log(config);
    // get api call
    // const { noteCreate } = getState();

    const { data } = await axios.get("/api/notes", config);
    console.log(data);
    // after making the request now waiting for response. then on success
    dispatch({
      type: NOTES_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    //now if anything went wrong then the error message comes here
    dispatch({
      type: NOTES_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const createNote =
  (title, content, category) => async (dispatch, getState) => {
    try {
      dispatch({
        type: NOTES_CREATE_REQUEST,
      });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.data.token}`,
        },
      };

      const { data } = await axios.post(
        "/api/notes/create",
        { title, content, category },
        config
      );

      dispatch({
        type: NOTES_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: NOTES_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
