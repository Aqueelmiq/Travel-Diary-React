import alt from '../alt';
import HomeActions from '../actions/HomeActions';

class HomeStore {
    constructor() {
        this.bindActions(HomeActions);
        this.newItemText = '';
    }

    onNewItemTextUpdate(event) {
        this.newItemText = event.target.value;
    }

}

export default alt.createStore(HomeStore);