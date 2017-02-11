import alt from '../alt';

class CreatePostActions {
    constructor() {
        this.generateActions(
            'titleChange',
            'authorChange',
            'locationChange',
            'imgChange',
            'textChange',
            'idIncrement',
        );
    }
}

export default alt.createActions(CreatePostActions);