import React, { Component } from 'react';
import { Layout, Menu, Dropdown, Icon, Anchor, Affix, Row, Col } from 'antd';
import NavWhite from './NavWhite';


const Signup = function(props) {
  return (
    <div>
      {props.currentPage !== 'home' && 
      <div className='navbg'>
        <NavWhite currentPage={props.currentPage} loggedIn={props.loggedIn} goToLogin={props.goToLogin} goToSignup={props.goToSignup} goToSubmitVideo={props.goToSubmitVideo} goToAccount={props.goToAccount} handleClickCategory={props.handleClickCategory} logout={props.logout} />
      </div>
      }
      <div className='signUpContainer'>
        <h1 className='title'>Sign Up Today!</h1>

        <form onSubmit={props.signup}>
          <input placeholder="email" id="email" name="email"></input>
          <input placeholder="password" id="password" name="password"></input>
          <button className='signUpButton' type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  )
}

export default Signup;
