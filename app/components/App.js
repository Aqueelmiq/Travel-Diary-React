import React from 'react';
import Nav from './Nav';
import AppStore from '../stores/AppStore';
import AppActions from '../actions/AppActions';
import Home from './Home';
import CreatePost from './CreatePost';
import * as firebase from 'firebase';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = AppStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        AppStore.listen(this.onChange);
        AppActions.getPosts();
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
                    posts: this.state.posts
                })
            }
            else
                return child;

        })
    }

    render() {
        return (
            <div className="main">
                <Nav/>
                <div className="container">
                    {this.renderChildren()}
                </div>
            </div>
        );
    }
}

export default App;