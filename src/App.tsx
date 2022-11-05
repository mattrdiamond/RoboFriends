import { useState, useEffect, ChangeEvent } from "react";
import CardList from "./components/CardList";
import SearchBox from "./components/SearchBox";
import Scroll from "./components/Scroll";

import { getData } from "./utils/data.utils";
import "./App.css";

export type Robot = {
  id: string;
  name: string;
  email: string;
};

const App = () => {
  const [robots, setRobots] = useState<Robot[]>([]);
  const [searchField, setSearchField] = useState("");
  const [filteredRobots, setFilteredRobots] = useState(robots);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getData<Robot[]>(
        "https://jsonplaceholder.typicode.com/users"
      );
      setRobots(users);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const filteredRobots = robots.filter((robot) =>
      robot.name.toLocaleLowerCase().includes(searchField.toLocaleLowerCase())
    );
    setFilteredRobots(filteredRobots);
  }, [searchField, robots]);

  const onSearchChange = (event: ChangeEvent<HTMLInputElement>) =>
    setSearchField(event.target.value.toLocaleLowerCase());

  return (
    <div className='tc'>
      <h1 className='f1'>RoboFriends</h1>
      <SearchBox placeholder='Search Robots' onChangeHandler={onSearchChange} />
      <Scroll>
        {!robots.length ? (
          <h1>Loading...</h1>
        ) : (
          <CardList robots={filteredRobots} />
        )}
      </Scroll>
    </div>
  );
};

export default App;
