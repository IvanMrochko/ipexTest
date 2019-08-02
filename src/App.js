import React from "react";
import "./App.css";
import Search from "./components/search";
import List from "./components/city-list";
class App extends React.PureComponent {
  render() {
    return (
      <div className="App">
        <Search />
        <List />
      </div>
    );
  }
}

export default App;
