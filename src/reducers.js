// Reducers specify how the application's state changes in response to actions sent to the store.

import { CHANGE_SEARCH_FIELD } from "./constants.js";

// initial state in redux store
const initialStateSearch = {
  searchField: ""
};

// Params: state of application (what action just happened)
// 'initial state' and '{}' are default if state is empty
export const searchRobots = (state = initialStateSearch, action = {}) => {
  switch (action.type) {
    case CHANGE_SEARCH_FIELD:
      // return new state with current state plus update searchfield with action.payload (text entered by user)
      return Object.assign({}, state, { searchField: action.payload });
    // for other action types
    default:
      return state;
  }
};
