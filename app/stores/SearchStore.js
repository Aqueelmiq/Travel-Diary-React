import alt from '../alt';
import SearchActions from '../actions/SearchActions';

class SearchStore {
    constructor() {
        this.bindActions(SearchActions);
        this.users = [];
        this.posts = [];
    }

    onUsersUpdate(users) {
        this.users = users;
    }

    onPostsUpdate(posts) {
        this.posts = posts;
    }

}

export default alt.createStore(SearchStore);