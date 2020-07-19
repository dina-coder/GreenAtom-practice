import React from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import Login from './components/Login/Login';
import PageResolver from './components/PageResolver/PageResolver';
import AdaptationPlans from './components/AdaptationPlans/AdaptationPlans';

function App() {
  return (
    <div className="App">
      <Switch>
          {/* <Route path='/login' exact={true} component={Login} /> */}
          <Route path='/' component={AdaptationPlans} />
      </Switch>
    </div>
  );
}

export default App;
