import React from "react";
import { Switch, Route } from "react-router-dom";
import Map from "./components/Map";
import Form from "./components/Suggest";
import Home from "./components/Home";

export const libraries = {
  lib: ["places"],
};

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/map" component={Map}></Route>
      <Route exact path="/suggest" component={Form}></Route>
    </Switch>
  );
}
