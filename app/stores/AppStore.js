import alt from '../alt';
import AppActions from '../actions/AppActions';

class AppStore {
    constructor() {
        this.bindActions(AppActions);
        this.curr_id = 5;
        this.posts = [];
        this.user = {};
    }

    onRetrievePosts(posts) {
        this.posts = posts;
    }

    onAddNewPost(posts) {
        this.posts = posts
    }

    onPostLike(data) {
        this.posts[data.postIndex].likes += 1;
    }

    onPostUnLike(data) {
        this.posts[data.postIndex].likes -= 1;
    }

    onUserDataChange(user) {
        this.user = user;
    }

}

export default alt.createStore(AppStore);