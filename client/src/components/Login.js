import React, { Component } from 'react';



const Login = function() {
  return (
    <div className='logInContainer'>
      <h1 className='title'><a name='explore'>Log In!</a></h1>

      <form onSubmit={props.login}>
        <input placeholder="email"></input>
        <input placeholder="password"></input>
        <input type="submit" vaue="Log In" />
      </form>


    </div>
  )
}

export default Login;
