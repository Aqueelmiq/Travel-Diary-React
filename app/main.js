import React from 'react';
import Router from 'react-router';
import ReactDOM from 'react-dom';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import routes from './routes';
import * as firebase from "firebase";

let history = createBrowserHistory();
var config = {
    apiKey: "AIzaSyBL2pDvmjWlKcROnmA8NU8lG8M9ouAsxSs",
    authDomain: "traveldiary-9ac5c.firebaseapp.com",
    databaseURL: "https://traveldiary-9ac5c.firebaseio.com",
    storageBucket: "traveldiary-9ac5c.appspot.com",
    messagingSenderId: "275348769326"
};
firebase.initializeApp(config);

ReactDOM.render(
    <Router history={history}>
        {routes}
    </Router>,
    document.getElementById('app')
);