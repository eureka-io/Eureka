const bodyParser = require("body-parser");
const express = require("express");
const jwt = require("jsonwebtoken");

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const WebpackDevServer = require('webpack-dev-server');

const config = require('../webpack.config.js');
const compiler = webpack(config);

/* Helper Functions */
const userSignUp = require("./helpers/userSignUp");
const userSignIn = require("./helpers/userSignIn");
const addVideo = require("./helpers/addVideo");
const voteVideo = require("./helpers/voteVideo");
const bookmarkVideo = require('./helpers/bookmarkVideo');

const viewVideo = require("./helpers/viewVideo");
const saveInitialData = require('./helpers/saveInitialData');
const getInitialData = require('./helpers/getInitialData');
const getPlaylistByCategory = require('./helpers/getPlaylistByCategory');
const logout = require('./helpers/logout');
const db = require('./db').mongoose;
const app = express();
const session = require('express-session');
const getAllTypeOfCategories = require('./helpers/getAllTypeOfCategories');
const getCatSubCatData = require('./helpers/getCatSubCatData');
const getVideoData = require('./helpers/getVideoData');
const getQueueVideos = require('./helpers/getQueueVideos');
const approveVideo = require('./helpers/approveVideo');
const denyVideo = require('./helpers/denyVideo');
const getTopVideos = require('./helpers/getTopVideos');
const updateUserBookmarks = require('./helpers/updateUserBookmarks');
const updateUserBookmarkCount = require('./helpers/updateUserBookmarkCount');
const upViewCount = require('./helpers/upViewCount');
const updateUserViewedVideos = require('./helpers/updateUserViewedVideos');
const getUserPreferences = require('./helpers/getUserPreferences');
const getUserLikes = require('./helpers/getUserLikes');
const getUserDislikes = require('./helpers/getUserDislikes');
const updateUserPreferences = require('./helpers/updateUserPreferences');
const getAllBookmarkedVideo = require('./helpers/getAllBookmarkedVideo');
const updateUserLikesAndDislikes = require('./helpers/updateUserLikesAndDislikes');
const tempRandomVideos = require('./helpers/tempRandomVideos'); // to be removed after rec engine
const recommendationEngine = require('./recommendationEngine/engine'); // to be removed after rec engine
const verifyToken = require('./helpers/verifyToken');
const getMindFeedPlaylist = require('./helpers/getMindfeedPlaylist');
const cors = require('cors');
//app.use(cors());

if (process.env.DEV_SERVER) {
  new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    proxy: {
      "/api/*": "http://localhost:3000"
    },
    open: true
  }).listen(8000, 'localhost', (err, result) => {
    if (err) throw Error(err);
    console.log('WebpackDevServer listening on http://localhost:8000');
  })
} else {
  app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
  }));
}

//app.use(function(req, res, next) {
//  res.header("Access-Control-Allow-Origin", "*");
//  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
//  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//  next();
//});

//app.all('*', function(req, res, next) {
//    res.header('Access-Control-Allow-Origin', 'URLs to trust of allow');
//    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//    res.header('Access-Control-Allow-Headers', 'Content-Type');
//    if ('OPTIONS' == req.method) {
//    res.sendStatus(200);
//    } else {
//      next();
//    }
//  });
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.listen(process.env.PORT || 3000);
console.log('Server listening on:', (process.env.PORT || 3000));
//app.use(cors());
/* use sessions for tracking login */
app.use(session({ secret: 'keyboard cat',
                  resave: false,
                  saveUninitialized: true,
                  cookie: {
                            maxAge: 60000
                          }}));


/* parse incoming requests */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('../client/src/index.html'));


/* List of Routes */

app.post('/api/signup', userSignUp);
app.post('/api/signin', userSignIn);
app.post('/api/addVideo', addVideo);
app.post('/api/voteVideo', voteVideo);
app.post('/api/viewVideo', viewVideo);
app.get('/api/getPlaylistByCategory', getPlaylistByCategory);
app.get('/api/saveInitialData', saveInitialData);
app.get('/api/getCategories', getAllTypeOfCategories);
app.get('/api/getInitialData', getInitialData);
app.get('/api/logout', logout);
app.get('/api/getCatSubCatData', getCatSubCatData);
app.get('/api/getVideoData', getVideoData);
app.get('/api/getQueueVideos', getQueueVideos);
app.get('/api/approveVideo', approveVideo);
app.get('/api/denyVideo', denyVideo);
app.get('/api/getTopVideos', getTopVideos);
app.get('/api/getUserPreferences', getUserPreferences);
app.get('/api/getUserDislikes', getUserDislikes);
app.get('/api/getUserLikes', getUserLikes);
app.post('/api/updateUserBookmarks', updateUserBookmarks);
app.post('/api/updateUserBookmarkCount', updateUserBookmarkCount);
app.post('/api/upViewCount', upViewCount);
app.post('/api/updateUserViewedVideos', updateUserViewedVideos);
app.get('/api/updateUserPreferences', updateUserPreferences);
app.get('/api/tempRandomVideos', tempRandomVideos);
//recEng call for testing fn
app.get('/api/recommendationEngine', recommendationEngine);
app.get('/api/bookmarkVideo', bookmarkVideo);
app.get('/api/getAllBookmarkedVideo', getAllBookmarkedVideo);
app.get('/api/getMindfeedPlaylist', getMindFeedPlaylist);
app.post('/api/updateUserLikesAndDislikes',updateUserLikesAndDislikes);
app.get('/api/verifyToken', verifyToken);

/* catch 404 and forward to error handler */

// app.use(function (req, res, next) {
//     const err = new Error('File Not Found');
//     err.status = 404;
//     next(err);
// });

// if (process.env.NODE_ENV !== 'production') {
// 	// Will force all non matched routes to root directory
// 	// Helpful for client routing in dev
// 	app.all('*', function(req, res) {
// 	  res.redirect("/");
// 	});
// }

/*
* define as the last app.use callback
* error handler
*/

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.message);
});

