import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { Dialogs, Users } from "./model";

function createReducer(asyncReducers) {
    return combineReducers({
        dialogs: Dialogs.reducer,
        users: Users.reducer
    });
}

const initialState = { users: {}, dialogs: {} };

export default function configureStore() {
    return createStore(createReducer(), initialState, applyMiddleware(thunk));
}
