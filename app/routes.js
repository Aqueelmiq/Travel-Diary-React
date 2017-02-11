import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import CreatePost from './components/CreatePost'
import UserAccount from './components/UserAccount'

export default (
    <Route component={App}>
        <Route path='/' component={Home} />
        <Route path='/create' component={CreatePost}/>
        <Route path='/user' component={UserAccount}/>
    </Route>
);