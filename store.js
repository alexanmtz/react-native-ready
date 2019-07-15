import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import createLogger from 'redux-logger';
import promise from 'redux-promise';
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';
import AppReducer from "./reducers";

const middleware = createReactNavigationReduxMiddleware(
    "app",
    state => state.navigation,
);

const store = createStore(AppReducer, applyMiddleware(middleware));

export default store;
