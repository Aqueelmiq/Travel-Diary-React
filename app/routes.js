import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import CreatePost from './components/CreatePost'
import UserAccount from './components/UserAccount'

export default (
    <Route component={App}>
        <Route path='/feed' component={Home} />
        <Route path='/create' component={CreatePost}/>
        <Route path='/create/:loc' component={CreatePost}/>
        <Route path='/' component={UserAccount}/>
    </Route>
);