import React from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import MainContainer from './components/MainContainer';
import Login from "./components/Login/Login";




function App() {
  return (
    
    <div className="App">
      <Switch>
      <Route path='/profile:user_id?'  render = {() =>  <MainContainer/>}  />
      <Route path='/' exact={true}  render = {() =>  <Login />}  />
      </Switch>
     
    </div>
  );
}

export default App;
