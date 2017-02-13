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
            'fileChange',
        );
    }
}

export default alt.createActions(CreatePostActions);