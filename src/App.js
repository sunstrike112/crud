import React from "react";

import "antd/dist/antd.css";

import "./App.css";
import ListMeals from "./components/ListMeals";
import AddPopUp from "./components/AddPopUp";

function App() {
  return (
    <div className="crud-app">
      <h1>CRUD app</h1>
      <AddPopUp />
      <ListMeals />
    </div>
  );
}

export default App;
