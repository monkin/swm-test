
import * as api from "./api";
import { MY_ID } from "./api";

const ACTION_LOADING = "LOADING_USERS",
    ACTION_RECEIVE = "RECEIVE_USERS";

const load = () => {
        return async (dispatch, getState) => {
            if (!getState().loading) {
                dispatch(loading());
                dispatch(receive(await api.getUsers()));
            }
        };
    },
    loading = () => ({ type: ACTION_LOADING }),
    receive = (users) => ({ type: ACTION_RECEIVE, users });

function reducer(state = { loading: false, ready: false, users: [] }, action) {
    switch (action.type) {
    case ACTION_LOADING:
        return { loading: true, ready: false, users: [] };
    case ACTION_RECEIVE:
        return { loading: false, ready: true, users: action.users }
    default:
        return state;
    }
}

export {
    MY_ID,
    load,
    reducer
}