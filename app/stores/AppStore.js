import alt from '../alt';
import AppActions from '../actions/AppActions';

class AppStore {
    constructor() {
        this.bindActions(AppActions);
        this.curr_id = 5;
        this.posts = [];
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

}

export default alt.createStore(AppStore);