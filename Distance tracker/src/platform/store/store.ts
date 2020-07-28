import { createStore, compose, applyMiddleware } from 'redux';
import reducer from './reducers/reducer';
import ReduxThunk from 'redux-thunk';
import { asyncActions } from './actions/async-actions';

const store = createStore(
    reducer,
    compose(
        applyMiddleware(ReduxThunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f: any) => f
    )
);

store.dispatch(asyncActions.fetchItems());
export { store };