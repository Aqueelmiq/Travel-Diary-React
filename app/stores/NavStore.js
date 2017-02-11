import alt from '../alt';
import NavActions from '../actions/NavActions';

class NavStore {
    constructor() {
        this.bindActions(NavActions);
        this.searchText = ''
    }

    onSearchTextUpdate(event) {
        this.searchText = event.target.value;
    }

}

export default alt.createStore(NavStore);