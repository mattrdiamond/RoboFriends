import { apiCall } from "./api/api";
import {
  CHANGE_SEARCHFIELD,
  REQUEST_ROBOTS_PENDING,
  REQUEST_ROBOTS_SUCCESS,
  REQUEST_ROBOTS_FAILED
} from "./constants";

export const setSearchField = text => ({
  type: CHANGE_SEARCHFIELD,
  payload: text
});

//requestRobots returns function rather than object
// redux-thunk middleware is listening for actions. Any time requestRobots is triggered, it will return a function
// and trigger redux thunk
// dispatch passed to function so we can dispatch actions
export const requestRobots = () => dispatch => {
  dispatch({ type: REQUEST_ROBOTS_PENDING });
  apiCall("https://jsonplaceholder.typicode.com/users")
    .then(data => dispatch({ type: REQUEST_ROBOTS_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: REQUEST_ROBOTS_FAILED, payload: error }));
};
