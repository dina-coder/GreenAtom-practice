import React from 'react';
import './App.css';
import Login from "./components/Login/Login";
import {Route} from 'react-router-dom';
import ProfileContainer from './components/Profile/ProfileContainer';

function App() {
  return (
    <div className="App">
      <Route path='/' exact={true}  render = {() =>  <ProfileContainer/>}  />
      <Route path='/login' exact={true}  render = {() =>  <Login />}  />
      
     
    </div>
  );
}

export default App;
