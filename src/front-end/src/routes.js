import React from 'react';
import Members from './resources/Members';
import Home from './resources/Home';
import Profile from './resources/Profile';
import CreateProfile from './resources/CreateProfile';
import { Route, Switch, Redirect } from 'react-router-dom';

export const Routes = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/members" component={Members} />
        <Route exact path="/members/create" component={CreateProfile} />
        <Route exact path="/members/:id" component={Profile} />
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </Switch>
    </div>
  );
};