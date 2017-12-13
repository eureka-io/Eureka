import React, { Component } from 'react';
import NavWhite from '../Nav/NavWhite';
import Input from '../Input/Input';
import { withRouter } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
      super(props);
  }
    onBackButtonEvent(e) {
        e.preventDefault();
        console.log(this.props);
        this.props.history.goBack();
    }
    componentWillMount() {
        console.log(this.props)
        window.onpopstate = this.onBackButtonEvent;
    }

  render() {
      return (
          <div className='logInContainer'>
              <h1 className='title'><a name='explore'>Log In!</a></h1>
              <form onSubmit={this.props.login}>
                  <Input inputtype="input" placeholder="email" id="email" name="email"></Input>
                  <Input inputtype="input" placeholder="password" id="password" name="password"></Input>
                  <button className='formButton' type="submit">Log In</button>
              </form>
          </div>
      )
  }
}

export default withRouter(Login);
