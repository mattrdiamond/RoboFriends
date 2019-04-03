import React, { Component } from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import ErrorBoundary from "../components/ErrorBoundary";
import "./App.css";

// connect to redux -> make container component aware that redux exists so that it can subscribe to changes
import { connect } from "react-redux";
import { setSearchField } from "../actions";

// mapStateToProps connects redux STATE to props of react component
// returns an object that includes specified part of current state
// both functions have to return an object, whose keys will then be
// passed on as the props of the component they are connected to.
const mapStateToProps = state => {
  // searchField will be used as props - state.searchRobots.searchField comes from reducer
  // in index.js we created the store with the searchRobots reducer
  return {
    searchField: state.searchField
  };
};

// allows us to modify state -> this function directs the dispatching or sending of an action by pointing it to an action creator.
// connects redux ACTIONS to react props -> dispatches action to reducer -> store
// dispatch triggers action (flux architecture) -> dispatch sends action to reducer
// what props should app listen to that are actions that need to get dispatched

// any time you connect component to redux store, you get access to dispatch function
// mapDispatchToProps - replaces general dispatch function with onSearchChange or whatever you specify
// ** instead of mapDispatchToProps function here, you can just list actions as second parameter in connect function below:
// export default connect(mapStateToProps, {setSearchField})(App);
const mapDispatchToProps = dispatch => {
  // onSearchChange named after onSearchChange function in App
  // action is a function that returns an object. dispatch setSearchField action so that reducers are aware of it
  // setSearchField imported from actions
  return {
    onSearchChange: event => dispatch(setSearchField(event.target.value))
  };
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      robots: []
      // searchfield: ""
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(users => this.setState({ robots: users }));
  }

  // onSearchChange = event => {
  //   this.setState({ searchfield: event.target.value });
  // };

  render() {
    const { robots } = this.state;
    // searchField and onSearchChange now sent down as props
    const { searchField, onSearchChange } = this.props;

    const filteredRobots = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchField.toLowerCase());
    });
    if (!robots.length) {
      return <h1>Loading</h1>;
    } else {
      return (
        <div className="tc">
          <h1 className="f1">RoboFriends</h1>
          <SearchBox searchChange={onSearchChange} />
          <Scroll>
            <ErrorBoundary>
              <CardList robots={filteredRobots} />
            </ErrorBoundary>
          </Scroll>
        </div>
      );
    }
  }
}

// connect to redux - app subscribed to any state changes in redux store
// connect is higher order function -> returns another function with app as param
// // connect params tell app what state and actions it should listen for and then give those props to app
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
