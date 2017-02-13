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
            return <div key={index}> {user.name} </div>
        });

        const results = () => {
            var items = [];
            if(posts)
                items.push(<div className="box-medium posts" key={1}> {posts} </div>);
            if(users)
                items.push(<div className="box-medium users" key={2}> {users} </div>)
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