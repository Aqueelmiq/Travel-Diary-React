import alt from '../alt';
import CreatePostActions from '../actions/CreatePostActions';

class CreatePostStore {
    constructor() {
        this.bindActions(CreatePostActions);
        this.title = '';
        this.author = '';
        this.img = '';
        this.text = '';
        this.location = '';
        this.curr_id = 5;
    }

    onTitleChange(event) {
        this.title = event.target.value;
    }

    onTextChange(event) {
        this.text = event.target.value;
    }

    onLocationChange(event) {
        this.location = event.target.value;
    }

    onImgChange(event) {
        this.img = event.target.value;
    }

    onAuthorChange(event) {
        this.author = event.target.value;
    }

    onIdIncrement() {
        this.curr_id += 1;
    }

}

export default alt.createStore(CreatePostStore);