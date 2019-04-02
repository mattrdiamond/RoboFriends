import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import "./index.css";
import App from "./containers/App";
import registerServiceWorker from "./registerServiceWorker";
import { searchRobots } from "./reducers";
import "tachyons";

// store uses reducers to create the store and create object tree of our state
const store = createStore(searchRobots);

// provider will pass the store down the component tree from the app (without prop drilling)
// connect - makes smart (container) components redux aware - tells app to listen to connect function rather than have to subscribing all components individually to get them to listen to redux changes
// connect function is optimized to avoid having to use store.subscribe (built-in redux function to be aware of redux and listen for changes)
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
