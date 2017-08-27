import {createStore as createReduxStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

export default function createStore() {
    return createReduxStore(
        rootReducer,
        {categories: []},
        applyMiddleware(thunk)
    )
}
