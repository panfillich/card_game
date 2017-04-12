import configureStore from './configureStore'
import chatActions from '../actions/API/chat/actions_server'
import userActions from '../actions/UserAction'

const store = configureStore(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

chatActions(store);
store.dispatch(userActions.checkToken());
export default store;