import React, { Component } from 'react';
import { Affix, Row, Col, Icon } from 'antd';


const Signup = function(props) {
  return (
    <div className='signUpContainer'>
      <h1 className='title'>Sign Up Today!</h1>

      <form onSubmit={props.signup}>
        <input placeholder="email" id="email" name="email"></input>
        <input placeholder="password" id="password" name="password"></input>
        <button type="submit">Sign Up</button>
      </form>


    </div>
  )
}

export default Signup;
