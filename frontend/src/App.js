import React from 'react';
import './App.css';
import Login from "./Login/Login";
import {Route, Switch} from 'react-router-dom';
import MainContainer from './MainContainer';


function App() {
  return (
    
    <div className="App">
      <Switch>
      <Route path='/profile:user_id?'  render = {() =>  <MainContainer/>}  />
      <Route path='/login' exact={true}  render = {() =>  <Login />}  />
      </Switch>
     
    </div>
  );
}

export default App;
