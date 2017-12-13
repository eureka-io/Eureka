import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import App from './components/App';

//createStore makes the main store
//combine reducers makes all the reducers into one object
//apply middleware to store redux data
import { createStore, combineReducers, applyMiddleware } from 'redux';

//Provider is what gives reducers access to store commands
import { Provider } from 'react-redux';

//stores the history?
import createHistory from 'history/createBrowserHistory';

//Route is pretty self explanatory
import { Route } from 'react-router';


//special redux and router components needed
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import { composeWithDevTools } from 'redux-devtools-extension';

const historyB = createHistory();

// const app = (
//     <BrowserRouter history={historyB}>
//
//     </BrowserRouter>
// );
const history = createHistory();
const middleware = routerMiddleware(history);
const reducers = combineReducers({
    // ...reducers,
    router: routerReducer
  });

const store = createStore(
reducers,
  composeWithDevTools(applyMiddleware(middleware)));
ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
          <App />
      </ConnectedRouter>
    </Provider>
  , document.getElementById('app')
);

