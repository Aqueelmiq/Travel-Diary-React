import React from 'react';
import { Router, browserHistory } from 'react-router'
import ReactDOM from 'react-dom';
import routes from './routes';
import * as firebase from "firebase";

var config = {
    apiKey: "AIzaSyBL2pDvmjWlKcROnmA8NU8lG8M9ouAsxSs",
    authDomain: "traveldiary-9ac5c.firebaseapp.com",
    databaseURL: "https://traveldiary-9ac5c.firebaseio.com",
    storageBucket: "traveldiary-9ac5c.appspot.com",
    messagingSenderId: "275348769326"
};
firebase.initializeApp(config);

ReactDOM.render(
    <Router history={browserHistory}>
        {routes}
    </Router>,
    document.getElementById('app')
);