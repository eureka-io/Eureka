import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import '../css/style.css';
import Nav from './Nav';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import Account from './Account';
import SubmitVideo from './SubmitVideo';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentPage: 'home',
      loggedIn: true,
      currentUser: 'guest',
      playlist: [], //playlist of videos; each video an object of -- needs thumbnails, urls, titles, descriptions, etc.
      recentVideos: [],

      //for guest - current Video Info
      currentCategory: "",
      currentVideoSource: '',
      currentVideoCode: '',
      currentVideoInfo: {}, //name, desc, etc.

      //for users
      bookmarkedVideos: []

    };
  
  this.goToHome = this.goToHome.bind(this);
  this.goToLogin = this.goToLogin.bind(this);
  this.goToSignup = this.goToSignup.bind(this);
  this.goToDashboard = this.goToDashboard.bind(this);
  this.goToAccount = this.goToAccount.bind(this);
  this.goToSubmitVideo = this.goToSubmitVideo.bind(this);
  this.logout = this.logout.bind(this);
  this.signup = this.signup.bind(this);
  this.login = this.login.bind(this);
  this.getPlaylistByCategory = this.getPlaylistByCategory.bind(this);
  this.handleClick = this.handleClick.bind(this);
  this.nextVideo = this.nextVideo.bind(this);
  this.playClickedVideo = this.playClickedVideo.bind(this);
  };


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
    document.getElementById('nav').setAttribute("class", 'navDashboard');
    document.getElementById('navLinks').setAttribute("class", 'navDashboard');
    document.getElementById('navLinks2').setAttribute("class", 'navDashboard');
  }

  goToAccount() {
    this.setState({currentPage: 'account'});
  }

  goToSubmitVideo() {
    this.setState({currentPage: 'submitVideo'});

  }

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  MVP FUNCTIONS
* * * * * * * * * * * * * * * * * * * * * * * * * * */

// post - send authentication info
  signup(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const email = data.get('email');
    const password = data.get('password');

    axios.post('/signup', {
      params: {
        email: email,
        password: password
      }
    })
    .then((response) => {
      console.log(response);
      if (response === "success") {
        alert("All signed up!, Please log in to continue!");
        //THEN WHAT?! SEND ME STUFFFFFS 
        //NOW LOG IN.
        //this.getPlaylist()
        //this.getBookmarks()
      } else {
        alert("Unable to signup");
      }
    })
  }  

  login() {
    event.preventDefault();
    const data = new FormData(event.target);
    const email = data.get('email');
    const password = data.get('password');

    axios.post('/login', {
      params: {
        email: email,
        password: password
      }
    })
    .then((response) => {
      console.log(response);
      if (response === "success") {
        this.setState({username: email});
        this.setState({loggedIn: true});
        this.goToDashboard();
      } else {
        alert ("Log In Fail. Try Again.");
        this.goToLogin();
      }
    })
  }

  getPlaylistByCategory(category) {
    axios.get('/getPlaylistByCategory', {
      params: {
        category: this.state.currentCategory,
      }
    })
    .then((response) => {
      var videos = response.data.items;
      this.setState({playlist: videos})
    })
    .catch((error) => {
      console.log(error);
    }) 
  }


// // post - user submitted video
//   addVideo(url, category, user) {
//     axios.post('/submittedVideo', {
//       params: {
//         url: url,
//         category: category,
//         user: this.state.currentUser
//       }
//     })
//     .then((response) => {
//       alert("Video Submitted!");
//     })
//   }

// post - user submitted video
  addVideo(object) {
    axios.post('/addVideo', {
      params: {
        url: url,
        category: category,
        currentUser: this.state.currentUser
      }
    })
    .then((response) => {
      window.alert('Added Video!');
    })

    .catch((error)=>{
      window.alert('Error. Video Not Added');
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
    this.setState({currentUser: 'guest'});
    this.goToHome();
  }

  //handle click of category buttons on home page
  handleClick(event) {
    console.log('clicked');
    this.setState({currentCategory: event.target.name});
    //this.getPlaylistByCategory(this.state.currentCategory);
    this.goToDashboard();
  }

  nextVideo() {
    console.log('main center button. next video to be changed');
    //change state to next video in playlist
    //add video to this.state.recentVideos
  }

  playClickedVideo() {
    console.log('video clicked.');
  }

  handleHeartClick(event) {
    console.log('heart Clicked');
    document.getElementById('heartIcon').setAttribute("class", 'heartIconSelected');
    //add current video to this.state.bookmarkedVideos

  }


/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  Renders the components based ot the current state
* * * * * * * * * * * * * * * * * * * * * * * * * * */


  render() {
    var toBeRendered = () => {
      if (this.state.currentPage === 'home') {
        return (<Home handleClick={this.handleClick}/>)
      }
      if (this.state.currentPage ==='login') {
        return (<Login login={this.login} />)
      }
      if (this.state.currentPage ==='signup') {
        return (<Signup signup={this.signup} />) }
      if(this.state.currentPage ==='dashboard') {
        return (<Dashboard loggedIn={this.state.loggedIn} currentCategory={this.state.currentCategory} nextVideo={this.nextVideo} handleHeartClick={this.handleHeartClick} playClickedVideo={this.playClickedVideo}/>)
      }
      if(this.state.currentPage ==='account') {
        return (<Account />)
      }
      if(this.state.currentPage ==='submitVideo') {
        return (<SubmitVideo sendToDB={this.addVideo}/>)
      }
   	}



    return (
      <div className='App'>
        <div className='navbg'>
          <Nav currentPage={this.state.currentPage} loggedIn={this.state.loggedIn} goToLogin={this.goToLogin} goToSignup={this.goToSignup} goToSubmitVideo={this.goToSubmitVideo} goToAccount={this.goToAccount} handleClick={this.handleClick} logout={this.logout} />
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