import configureStore from './configureStore'
import chatActions from '../actions/API/chat/actions'
const store = configureStore(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

chatActions(store);
export default store;