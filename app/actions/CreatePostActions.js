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
            'setLocation',
        );
    }
}

export default alt.createActions(CreatePostActions);