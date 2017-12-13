import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home//Home'
import Dashboard from './Dashboard/Dashboard'
import SubmitVideo from './SubmitVideo/SubmitVideo'
import Login from './Login/Login'
import Signup from './Signup/Signup'
import Account from './Account/Account'


const Main = () => (
  <main>
    <Switch>
      <Route path='/' exact component={Home}/>
      <Route path='/dashboard' component={Dashboard}/>
      <Route path='/submitvideo' component={SubmitVideo}/>
      <Route path='/login' component={Login}/>
      <Route path='/signup' component={Signup}/>
      <Route path='/account' component={Account}/>
    </Switch>
  </main>
);

export default Main;
