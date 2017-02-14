import React from 'react';
import Nav from './Nav';
import AppStore from '../stores/AppStore';
import AppActions from '../actions/AppActions';
import Home from './Home';
import CreatePost from './CreatePost';
import UserAccount from './UserAccount';
import * as firebase from 'firebase';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = AppStore.getState();
        this.onChange = this.onChange.bind(this);
        this.navigate = this.navigate.bind(this);
    }

    componentDidMount() {
        AppStore.listen(this.onChange);
        AppActions.getPosts();
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                this.readUser(user.uid);
            } else {
                //localStorage.removeItem('uid');
                this.props.router.push('/');
            }
        }.bind(this));
    }

    updateUser(uid, user) {
        firebase.database().ref('users/' + uid).set(user);
    }

    readUser(uid) {
        firebase.database().ref('users/' + uid).once('value')
            .then(function(snapshot) {
                if(snapshot.val()) {
                    AppActions.userDataChange(snapshot.val());
                }
                else {
                }
            });
    }

    componentWillUnmount() {
        AppStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    renderChildren() {
        return React.Children.map(this.props.children, child => {
            if(child.type === Home) {
                return React.cloneElement(child, {
                    posts: this.state.posts
                })
            }
            else if (child.type === CreatePost) {
                return React.cloneElement(child, {
                    onPostSubmit: AppActions.newPost,
                })
            }
            else if (child.type === UserAccount) {
                return React.cloneElement(child, {
                    setUser: this.updateUser,
                    readUser: this.readUser,
                })
            }
            else
                return child;
        })
    }

    navigate(location) {
        this.props.router.push(location);
    }

    render() {
        return (
            <div className="main">
                <Nav navigate={this.navigate}/>
                <div className="container">
                    {this.renderChildren()}
                </div>
            </div>
        );
    }
}

export default App;