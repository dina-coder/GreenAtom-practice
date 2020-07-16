import React from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import Login from "./components/Login/Login";
import PersonnelComponent from './components/Personnel/PersonnelComponent';
import DirectorComponent from './components/Director/DirectorComponent';
import EmployeeComponent from './components/Employee/EmployeeComponent';




function App() {
  return (
    
    <div className="App">
      <Switch>
      <Route path='/director:user_id?'  render = {() =>  <DirectorComponent/>}  />
      <Route path='/employee:user_id?'  render = {() =>  <EmployeeComponent/>}  />
      <Route path='/personnel:user_id?'  render = {() =>  <PersonnelComponent/>}  />
      <Route path='/' exact={true}  render = {() =>  <Login />}  />
      </Switch>
    </div>
  );
}

export default App;
