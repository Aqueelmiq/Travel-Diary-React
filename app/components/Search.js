import React from 'react';
//import {Link} from 'react-router';
import SearchStore from '../stores/SearchStore'
import SearchActions from '../actions/SearchActions';
import Post from './Post';

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = SearchStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        SearchStore.listen(this.onChange);
        SearchActions.loadResults(this.props.params.query);
    }

    componentWillUnmount() {
        SearchStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    render() {

        const posts = this.state.posts.map((post, index) => {
            return <Post key={index} post={post}/>
        });

        const users = this.state.users.map((user, index) => {
            return (
                <div key={index}>
                    <h3> {user.name} </h3>
                    <p> Followers: {" " + user.followers.length} </p>
                    <p> Following: {" " + user.following.length} </p>
                </div>
            );
        });

        const results = () => {
            var items = [];
            if(users.length > 0) {
                items.push(<h2 className="medium-align"> Users: </h2>);
                items.push(<div className="box-medium users" key={1}> {users} </div>);
            }
            if(posts.length > 0) {
                items.push(<h2 className="medium-align"> Posts: </h2>);
                items.push(<div key={2}> {posts} </div>);
            }
            if(posts.length == 0 && users.length == 0)
                items.push(<div className="box-medium users" key={3}> <h3> Nothing Found </h3> </div>);
            return items;
        }

        return (
            <div>
                <div className="results">
                    {results()}
                </div>
            </div>
        );
    }
}

export default Search;