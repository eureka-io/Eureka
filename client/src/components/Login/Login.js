import React from 'react';
import Input from '../Input/Input';
import { message } from 'antd';
import axios from 'axios';



class Login extends React.Component {
  constructor() {
      super();
  }

  parseSubcategories = (arr) => {
    let parsedSubcats = [];
    arr.map((item)=>{
      parsedSubcats = parsedSubcats.concat(item.split(','));
    });
    return parsedSubcats;
  }

  parseData = (data) => {
    let parsedSubcat = this.parseSubcategories(data.subcategory);
    console.log('PARSING DATA');
    let parsedObj = {
      category: data.category,
      subcategories: parsedSubcat,
      bookmarks: data.bookmarks };
    return parsedObj;
  }



  // post - send authentication info
  login = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const email = data.get('email');
    const password = data.get('password');
    message.config({
      top: 80,
      duration: 8,
    });
    const loginError = function() {
      message.error('Login failed. Username and/or password invalid.', 10);
    };
    axios.post('/api/signin', {
      params: {
        email: email,
        password: password
      }
    })
      .then((response) => {


        if (response.status === 200) { //successfully logged in current user
        console.log(JSON.stringify(response));
        console.log('DAAAAAAAAAAAAAAATAAAAAAA', response.data);

          if (response.data !== 'OK') {
            let parsedData = this.parseData(response.data);
            console.log(parsedData);
            this.props.setLoggedInStatus(true);
            this.props.setCurrentUser(email);
          }


          this.props.setUserPreferences(parsedData);
          this.props.setUserBookmarks(parsedData.bookmarks);

          console.log('LOGGGGGGGGED INNNNNNNNNNNNN', this.props);
          this.props.history.push("/");
        } else if (response.status === 201) { //logged in new user
          console.log(response);
          this.props.setLoggedInStatus(true);
          this.props.setCurrentUser(email);
          this.props.history.push("/walkthrough");
        } else if (response.status === 402) { //log in failed
          {loginError()};
          // this.goToLogin(); //no longer exists
        } else if (response.status === 403) { //username does not exist.
          {loginError()};
          // this.goToLogin(); no longer exists
        }
      })
  };

  render() {
      return (
          <div className='logInContainer'>
              <h1 className='title'><a name='explore'>Log In!</a></h1>
              <form onSubmit={this.login}>
                  <input inputtype="input" placeholder="email" id="email" name="email"></input>
                  <input inputtype="input" placeholder="password" id="password" name="password"></input>
                  <button className='formButton' type="submit">Log In</button>
              </form>
          </div>
      )
  }
}

export default Login;
