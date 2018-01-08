/*

  Everytime you add a new reducer,  you will need to:
  - import it here
  - add it to the call to `combineReducers`
  - create actions to handle it

*/

import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import currentPlaylist from './currentPlaylist';
import currentPage from './currentPage';
import authReducer from './authReducer';
import userCategories from './userCategories';
import recentVideos from './recentVideos';
import topVideos from './topVideos';
import categoryVideos from './categoryVideos';
import bookmarkedVideos from './bookmarkedVideos';
import mindfeedVideos from './mindfeedVideos';
import authStatus from './authReducer';
import userPreferences from './userPreferencesReducer';
import userBookmarks from './userBookmarksReducer';

// import authReducer from './authReducer';

const rootReducer = combineReducers({
  router: routerReducer,
  currentPlaylist,
  currentPage,
  recentVideos,
  topVideos,
  categoryVideos,
  bookmarkedVideos,
  mindfeedVideos,
  authStatus,
  userCategories,
  userPreferences,
  userBookmarks
});

export default rootReducer;



/*

  ----------------------------------
  1) Refactoring the `state` object
     in App.js to reducers.
  ----------------------------------

  Some of the items in `state` have been nested for logical
  grouping into reducers. Each top level item can be considered
  a reducer.


  ----------------------------------
  2) Previous State Object
  ----------------------------------

    state = {
      currentPage: 'home',
      loggedIn: false,
      currentUser: 'guest',
      topVideos: [],
      playlist: [], // fetched from backend
      counter: 0,
      currentVideo: null,
      recentVideos: [],
      bookmarkedVideos: [],
      currentCategory: null
    };



  ----------------------------------
  3) Refactoring `state` to reducers
  ----------------------------------

  Below are reducers and example values.
  Some of the reducers have been created.
  Note that some of the values are now
  nested. Feel free to use a completely
  flat structure if you prefer.

  REDUCERS:

    currentPage: 'home',
    authStatus: {
      loggedIn: false,
      currentUser: 'guest',
    }

    topVideos: [ ... ],

    currentPlaylist: {
      videos: [ ... ] array of vids,
      currentVideo: { ... } The current video
      counter: INT // The pointer
    }

    recentVideos: [],
    bookmarkedVideos: [],
    currentCategory: null

*/