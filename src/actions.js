import { CHANGE_SEARCH_FIELD } from "./constants.js";

// Actions are payloads of information that send data from your application to your store.
// They are the only source of information for the store.

// setSearchField is action
// text is what user inputs
// function returns object with type 'CHANGE SEARCH FIELD'
// payload: data sent to go on to reducer - in this case text entered by user
export const setSearchField = text => ({
  type: CHANGE_SEARCH_FIELD,
  payload: text
});
