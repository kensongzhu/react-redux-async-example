import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";

import thunk from "redux-thunk";
import {createLogger} from "redux-logger";
import {applyMiddleware, createStore} from "redux"
import {composeWithDevTools} from 'redux-devtools-extension';

import rootReducer from "./reducers"

const middleware = [thunk];

let store;

if (process.env.NODE_ENV !== 'production') {
	middleware.push(createLogger());
	const composeEnhancers = composeWithDevTools({trace: true, traceLimit: 25});

	store = createStore(
		rootReducer,
		composeEnhancers(applyMiddleware(...middleware))
	);
} else {
	store = createStore(
		rootReducer,
		applyMiddleware(...middleware)
	);
}


ReactDOM.render(
	<Provider store={store}>
		<App/>
	</Provider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
