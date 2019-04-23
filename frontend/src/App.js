import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import './App.css';

import HomePage from './pages/Home'
import CreatePage from './pages/Create'
import UpdatePage from './pages/Update'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faPhoneVolume, faEnvelope, faMobileAlt, faBirthdayCake } from '@fortawesome/free-solid-svg-icons'

library.add(faPhoneVolume, faEnvelope, faMobileAlt, faBirthdayCake)

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Redirect from="/" to="/home" exact />
          <Route path="/home" component={HomePage} />
          <Route path="/create" component={CreatePage} />
          <Route path="/update" component={UpdatePage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
