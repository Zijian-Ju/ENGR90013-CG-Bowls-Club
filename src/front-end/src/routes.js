import React from 'react';
import Members from './resources/Members';
import Committee from './resources/Committee';
import Home from './resources/Home';
import Profile from './resources/Profile';
import Teams from './resources/Teams';
import EditTeam from './resources/EditTeam';
import Competitions from './resources/Competitions';
import CreateProfile from './resources/CreateProfile';
import { Route, Switch, Redirect } from 'react-router-dom';

export const Routes = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/teams" component={Teams}/>
        <Route exact path="/members" component={Members} />
        <Route exact path="/competitions" component={Competitions} />
        <Route exact path="/editteam/:id" component={EditTeam} />
        <Route exact path="/members/create" component={CreateProfile} />
        <Route exact path="/members/:id" component={Profile} />
        <Route exact path="/committee" component={Committee}/>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </Switch>
    </div>
  );
};