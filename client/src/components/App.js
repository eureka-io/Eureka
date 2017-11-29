import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import '../css/style.css';

import HomeNav from './HomeNav';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import Account from './Account';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentPage: 'home',
      loggedIn: true,
      currentUser: 'guest',
      playlist: [], //playlist of videos; each video an object of -- needs thumbnails, urls, titles, descriptions, etc.
      //current Video Info
      currentCategory: "",
      currentVideoSource: '',
      currentVideoCode: '',
      currentVideoInfo: {} //name, desc, etc.
      // userCategories: [],
      // userBookmarks: [],
    };
  
  this.goToHome = this.goToHome.bind(this);
  this.goToLogin = this.goToLogin.bind(this);
  this.goToSignup = this.goToSignup.bind(this);
  this.goToDashboard = this.goToDashboard.bind(this);
  this.goToAccount = this.goToAccount.bind(this);
  this.logout = this.logout.bind(this);
  }


/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  The following functions change the view on the app
* * * * * * * * * * * * * * * * * * * * * * * * * * */

  goToHome() {
    this.setState({currentPage: 'home'})
  }

  goToLogin() {
    this.setState({currentPage: 'login'});
  }

  goToSignup() {
    this.setState({currentPage: 'signup'})
  }

  goToDashboard() {
    this.setState({currentPage: 'dashboard'});
  }

  goToAccount() {
    this.setState({currentPage: 'account'});
  }

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  MVP FUNCTIONS
* * * * * * * * * * * * * * * * * * * * * * * * * * */

// post - send authentication info
  signup() {
    axios.post('/signup', {
      params: {
        username: username,
        password: password
      }
    })
    .then((response) => {
      console.log(response);
      if (response === "success") {
        alert("All signed up!, Please log in to continue!");
        //this.getPlaylist()
        //this.getBookmarks()
      }
    })
  }  

  login() {
    axios.post('/login', {
      params: {
        username: username,
        password: password
      }
    })
    .then((response) => {
      console.log(response);
      if (response === "success") {
        this.setState({username: username});
        this.setState({loggedIn: true});
        //this.getPlaylist()
        //this.getBookmarks()
      }
    })
  }

// get - playlist for category for guest user
  getPlaylistByCategory(category) {
    axios.get('/getPlaylistByCategory', {
      params: {
        category: this.state.currentCategory,
      }
    })
    .then((response) => {
      //add retrieved playlist to state
      var videos = response.data.items;
      this.setState({playlist: videos})
    })
    .catch((error) => {
      console.log(error);
    }) 
  }

// post - user submitted video
  addVideo(url, category, user) {
    axios.post('/submittedVideo', {
      params: {
        url: url,
        category: category,
        user: this.state.currentUser
      }
    })
    .then((response) => {
      alert("Video Submitted!");
    })
  }



/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  USER ACCOUNT FUNCTIONS - POST MVP
* * * * * * * * * * * * * * * * * * * * * * * * * * */

// get - users playlist based on preferences, upvotes and downvotes
//   getPlaylistByUser() {
//    axios.get('/getPlaylistByUser', {
//       params: {
//         username: this.state.currentUser
//       }
//     })
//     .then((response) => {
//       //add retrieved playlist to state
//       var videos = response.data.items;
//       this.setState({playlist: videos})
//     })
//   }

// // post - preferences for specific user
//   postUserCategories() {
//    axios.post('postUserCategories', {
//      params: {
//        username: this.state.currentUser,
//        categories: this.state.userCategories
//      }
//    })
//    .then((response) => {
//      //if success, alert success
//      //getPlaylistByUser(); //retrieves playlist after topics/prefs sent
//    })
//   }

// // post - upvote and downvotes for specific video
//   postVote(video, vote) {
//    axios.post('/postUserVote', {
//      params: {
//        currentUser: this.state.currentUser,
//        url: video,
//        vote: vote
//      }
//    })
//    .then((response) => {
//      //on success, alert success
//      //getPlaylistByUser() ? right away?
//    })
//   }

// // post - users bookmarked videos
//   postUserBookmark(url) {
//    axios.post('/postUserBookmark', {
//      params: {
//        currentUser: this.state.curentUser,
//        url: url
//      }
//    })
//    .then((response) => {
//       //on success, alert success
//       getUserBookmarks() //update bookmark list
//    })
//   }

// // get - users bookmarked videos
//   getUserBookmarks() {
//     axios.get('/getUserBookmarks', {
//      params: {
//        currentUser: this.state.currentUser
//      }
//     })
//   }



/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  Additional Functions
* * * * * * * * * * * * * * * * * * * * * * * * * * */

  logout() {
    this.setState({loggedIn: false});
  }


/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  Renders the components based ot the current state
* * * * * * * * * * * * * * * * * * * * * * * * * * */


  render() {
    var toBeRendered = () => {
      if (this.state.currentPage === 'home') {
        return (<Home />)
      }
      if (this.state.currentPage ==='login') {
        return (<Login />)
      }
      if (this.state.currentPage ==='signup') {
        return (<Signup />)
      }
      if(this.state.currentPage ==='dashboard') {
        return (<Dashboard loggedIn={this.state.loggedIn}/>)
      }
      if(this.state.currentPage ==='account') {
        return (<Account />)
      }
    }


    return (
      <div className='App'>
        <div className='navbg'>
          <HomeNav currentPage={this.state.currentPage} loggedIn={this.state.loggedIn} goToLogin={this.goToLogin} goToSignup={this.goToSignup} goToAccount = {this.goToAccount} logout = {this.logout} />
        </div>

        {toBeRendered()}

        <div className='footer'>
        Hello Footer stuff
        </div>
      </div>
    )

  }
}

export default App;