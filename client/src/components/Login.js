import React, { Component } from 'react';
import NavWhite from './NavWhite';


const Login = function(props) {
  return (
    <div>
      <div className='navbg'>
        <NavWhite currentPage={props.currentPage} loggedIn={props.loggedIn} goToLogin={props.goToLogin} goToSignup={props.goToSignup} goToSubmitVideo={props.goToSubmitVideo} goToAccount={props.goToAccount} handleClickCategory={props.handleClickCategory} logout={props.logout} />
      </div>

      <div className='logInContainer'>
        <h1 className='title'><a name='explore'>Log In!</a></h1>

        <form onSubmit={props.login}>
          <input placeholder="email" id="email" name="email"></input>


          <input placeholder="password" id="password" name="password"></input>
          <button className='logInButton' type="submit">Log In</button>
        </form>
      </div>
    </div>
  )
}

export default Login;
