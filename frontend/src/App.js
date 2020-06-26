import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Map from './components/Map';
import Form from './components/Suggest';

export const libraries ={
  lib: ["places"]
}

export default function App() {
  return (
    <Switch>
      <Route exact path='/' component={Map}></Route>
      <Route exact path='/suggest' component={Form}></Route>
    </Switch>
  );
}