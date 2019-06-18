import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Home from './pages/Home';
import Users from './pages/UserForm';
import Systems from './pages/Systems';
import Versions from './pages/Versions';
import NewVersion from './pages/NewVersion';
import NewSystem from './pages/NewSystem';


const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/home" exact component={Home} />
            <Route path="/users/new" exact component={Users} />
            <Route path="/users/:id/edit" exact component={Users} />
            <Route path="/systems" exact component={Systems} />
            <Route path="/systems/new" exact component={NewSystem} />
            <Route path="/versions" exact component={Versions} />
            <Route path="/versions/new" exact component={NewVersion} />
        </Switch>
    </BrowserRouter>
);

export default Routes;