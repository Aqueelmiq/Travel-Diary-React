import React from 'react';
//import {Link} from 'react-router';
import HomeStore from '../stores/HomeStore'
import HomeActions from '../actions/HomeActions';
import Post from './Post';
//import * as firebase from 'firebase';
//import {first, without, findWhere} from 'underscore';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = HomeStore.getState();
        this.onChange = this.onChange.bind(this);
        this.handleNewItem = this.handleNewItem.bind(this);
    }

    componentDidMount() {
        HomeStore.listen(this.onChange);
    }

    componentWillUnmount() {
        HomeStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    handleNewItem(event) {
        event.preventDefault();
        window.location = '/create/' + this.state.newItemText;
    }

    render() {
        const posts = this.props.posts.map((post, index) => {
            return <Post key={index} post={post}/>
        });

        return (
            <div>
                <div className="add-item">
                    <form className="add" onSubmit={this.handleNewItem}>
                        <input type="text" className="item-name" value={this.state.newItemText} placeholder="Add a story by entering location" onChange={HomeActions.newItemTextUpdate}/>
                        <input type="submit" className="add-button" value=""/>
                    </form>
                </div>
                <div className="posts">
                    {posts}
                </div>
            </div>
        );
    }
}

export default Home;