import React from 'react';
import Members from './resources/Members';
import Home from './resources/Home';
import Profile from './resources/Profile';
import { Route, Switch, Redirect } from 'react-router-dom';

export const Routes = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/members" component={Members} />
        <Route exact path="/members/:id" component={Profile} />
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </Switch>
    </div>
  );
};