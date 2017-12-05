import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Icon, Row, Col } from 'antd';
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
      topVideos: [],
      playlist: [], 
      counter: 0,
      currentVideo: null,
      recentVideos: [],
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
  this.handleClickCategory = this.handleClickCategory.bind(this);
  this.playClickedVideo = this.playClickedVideo.bind(this);
  this.submitVideo = this.submitVideo.bind(this);
  this.setCurrentVideo = this.setCurrentVideo.bind(this);
  this.parseUrlIntoEmbed = this.parseUrlIntoEmbed.bind(this);
  this.insertCurrentVideoIntoDom = this.insertCurrentVideoIntoDom.bind(this);
  this.setLastVideoInRecentVideos = this.setLastVideoInRecentVideos.bind(this);
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
// load initial seed data
  componentDidMount() {  
    axios.get('api/saveInitialData')
    .then((response) => {
      console.log('Initial data saved successfully', response);
    })
    .catch((error) => {
      console.log(error);
    })
  }

// post - send authentication info
  signup(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const email = data.get('email');
    const password = data.get('password');
    axios.post('/api/signup', {
      params: {
        email: email,
        password: password
      }
    })
    .then((response) => {
      console.log(response);
      if (response.status === 200) {
        console.log("successfully signed in");
        this.goToLogin();
      } else {
        console.log("Unable to signup");
      }
    })
  }  

  login(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const email = data.get('email');
    const password = data.get('password');
    axios.post('/api/signin', {
      params: {
        email: email,
        password: password
      }
    })
    .then((response) => {
      console.log(response.status);
      if (response.status === 200) {
        this.setState({currentUser: email});
        this.setState({loggedIn: true});
        this.goToHome();
      } else {
        console.log("Log In Fail. Try Again.");
        this.goToLogin();
      }
    })
  }

  getPlaylistByCategory(category) {
    axios.get('/api/getPlaylistByCategory', {
      params: category
    })
    .then((response) => {
      var videos = response.data;
      this.setState({playlist: videos});
      this.setCurrentVideo();
      this.goToDashboard();
      this.insertCurrentVideoIntoDom();
      console.log('Video List', videos);
    })
    .catch((error) => {
      console.log(error);
    }) 
  }

  submitVideo(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const email = this.state.currentUser;
    const category = data.get('category');
    const subcategory = null;
    const url = data.get('url');

    axios.post('/api/addVideo', {
      params: {
        email: email,
        category: category,
        subcategory: subcategory,
        url: url
      }
    })
    .then((response) => {
      if (response.data === "Valid video and saved") {
          console.log('LOL')
        console.log('Successfully submitted video!')
        this.goToSubmitVideo(); 
      } else if (response.data === "Duration too long" || response.data === "Link not from valid provider") {
        console.log('LOL')
        console.log("Video Submission Fail. Video Too long. Try Again.");
      }
    })

  }



/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  POST MVP FUNCTIONS
* * * * * * * * * * * * * * * * * * * * * * * * * * */

//getPlaylist()
//postUserCategories()
//postVote()
//postUserBookmark()
//getUserBookmarks()

  playClickedVideo() {
    console.log('video clicked. still need to write function');
  }



/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  ADDITIONAL FUNCTIONS
* * * * * * * * * * * * * * * * * * * * * * * * * * */

  logout() {
    this.setState({loggedIn: false});
    this.setState({currentUser: 'guest'});
    this.goToHome();
  }

  //handle click of category buttons
  handleClickCategory(event) {
    this.setState({counter: 0});
    this.getPlaylistByCategory(event.target.name);
    this.setState({currentCategory: event.target.name});
  }

  setCurrentVideo() {
    if (this.state.counter === 0) { //check needed for preloader
      this.setState({currentVideo: this.state.playlist[0]});
      this.setState({counter: this.state.counter + 1});
    } else if (this.state.counter !== 0 && this.state.playlist.length !== this.state.counter){
      this.setLastVideoInRecentVideos();
      const newVideo = this.state.playlist[this.state.counter]; //needed bc next line is asynchronous
      this.setState({currentVideo: this.state.playlist[this.state.counter]});
      document.getElementById("videoDisplay").innerHTML = this.parseUrlIntoEmbed(newVideo.url); //relies on inner 
      this.setState({counter: this.state.counter + 1});
      //write preloader function
    } else {
      console.log('no more videos!')
    }
  }

  setLastVideoInRecentVideos() {
    let lastVideo = this.state.currentVideo;
    let recentVideosList = this.state.recentVideos;
    recentVideosList.unshift(lastVideo);
    recentVideosList = recentVideosList.slice(0, 5)
    this.setState({recentVideos: recentVideosList});
  }

  insertCurrentVideoIntoDom() {
    console.log('Current Video:', this.state.currentVideo.title);
    document.getElementById("videoDisplay").innerHTML = this.parseUrlIntoEmbed(this.state.currentVideo.url);
  }


  parseUrlIntoEmbed(url) {
    let videoId = false;

    if(this.state.currentVideo.linkType === 'YouTube') {
      videoId = url.split('youtube.com/watch?v=')[1];
      return (`<iframe width="760" height="515" src="https://www.youtube.com/embed/` + videoId +`" frameborder="0" allowfullscreen></iframe>`);
    } else if(this.state.currentVideo.linkType === 'DailyMotion') {
      videoId = url.split('dailymotion.com/video/')[1];
      return (`<iframe frameborder="0" width="780" height="570" src="//www.dailymotion.com/embed/video/` + videoId + `" allowfullscreen></iframe>`);
    } else if(this.state.currentVideo.linkType === 'Vimeo') {
      videoId = url.split('vimeo.com/')[1];
      return (`<iframe src="https://player.vimeo.com/video/` + videoId + `?color=ebebeb&title=0&byline=0&portrait=0&badge=0" width="840" height="560" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>`);
    } else {
      console.log('error. invalid video type');
    }
  }

  handleClickHeart(event) {
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
        return (<Home handleClickCategory={this.handleClickCategory}/>)
      }
      if (this.state.currentPage ==='login') {
        return (<Login login={this.login} />)
      }
      if (this.state.currentPage ==='signup') {
        return (<Signup signup={this.signup} />) }
      if(this.state.currentPage ==='dashboard') {
        return (<Dashboard loggedIn={this.state.loggedIn} currentCategory={this.state.currentCategory} playlist={this.state.playlist} currentVideo={this.state.currentVideo} recentVideos={this.state.recentVideos} setCurrentVideo={this.setCurrentVideo} parseUrlIntoEmbed={this.parseUrlIntoEmbed} handleClickHeart={this.handleClickHeart} playClickedVideo={this.playClickedVideo}/>)
      }
      if(this.state.currentPage ==='account') {
        return (<Account />)
      }
      if(this.state.currentPage ==='submitVideo') {
        return (<SubmitVideo submitVideo={this.submitVideo}/>)
      }
   	}



    return (
      <div className='App'>
        <div className='navbg'>
          <Nav currentPage={this.state.currentPage} loggedIn={this.state.loggedIn} goToLogin={this.goToLogin} goToSignup={this.goToSignup} goToSubmitVideo={this.goToSubmitVideo} goToAccount={this.goToAccount} handleClickCategory={this.handleClickCategory} logout={this.logout} />
        </div>

        {toBeRendered()}

        <div className='footer'>

          <Row className ='footerInner'>
            <Col span={8}>
              <h2>About Us</h2>
              <div className='footerAboutUs'>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum 
              </div>
            </Col>
            <Col span={8}>
              <h2>Credits</h2>
              <Icon type="caret-right" style={{color: '#efcc44'}}/> Graphics, Background & Vectors: <a href='https://www.freepik.com'>freepik</a> <br />
              <Icon type="caret-right" style={{color: '#efcc44'}}/> Design Library: <a href='https://ant.design/'>Ant Design</a> <br />
              <Icon type="caret-right" style={{color: '#efcc44'}}/> Roots: <a href='http://www.hackreactor.com'>Hack Reactor RPT</a><br />


            </Col>
            <Col span={8}>
              <h2>Get In Touch</h2>
              <Icon type='mail' style={{color: '#efcc44'}}/> Our mailing address? FAN LETTERS! <br />
              <Icon type="phone" style={{color: '#efcc44'}}/> Phone number... who's number... <br />
              <Icon type="mail" style={{color: '#efcc44'}}/> Email woooo <br />
            </Col>
          </Row>
        </div>


			</div>
		)


  }
}

export default App;