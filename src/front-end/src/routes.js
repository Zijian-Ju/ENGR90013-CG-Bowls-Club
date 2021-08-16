import React from 'react';
import Members from './resources/Members';
import Home from './resources/Home';
import Profile from './resources/Profile';
import Teams from './resources/Teams';
import CreateProfile from './resources/CreateProfile';
import MoreTeams from './resources/other/MoreTeams';
import { Route, Switch, Redirect } from 'react-router-dom';

export const Routes = () => {
  return (
    <div>
      <Switch>
        <Route path="/home" component={Home} />
        <Route exact path="/teams" component={Teams}/>
        <Route exact path="/members" component={Members} />
        <Route exact path="/members/create" component={CreateProfile} />
        <Route exact path="/members/:id" component={Profile} />
        <Route exact path="/moreTeams" component={MoreTeams} />
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </Switch>
    </div>
  );
};