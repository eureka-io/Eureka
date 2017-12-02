import React, { Component } from 'react';
import { Affix, Row, Col, Icon } from 'antd';


const Signup = function(props) {
  return (
    <div className='signUpContainer'>
      <h1 className='title'><a name='explore'>Sign Up Today!</a></h1>

      <form onSubmit={props.signup}>
        <input placeholder="email"></input>
        <input placeholder="password"></input>
        <input type="submit" vaue="Sign Up" />
      </form>


    </div>
  )
}

export default Signup;
