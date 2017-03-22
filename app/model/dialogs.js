
import * as api from "./api";
import { MY_ID, MESSAGE_TYPE_TEXT, MESSAGE_TYPE_FILE, MESSAGE_TYPE_IMAGE } from "./api";

const ACTION_LOADING = "LOADING_MESSAGES",
    ACTION_RECEIVE = "RECEIVE_MESSAGES",
    ACTION_SEND = "SEND_MESSAGE",
    ACTION_MARK_AS_READ = "MARK_AS_READ";

const load = (dialog = null, since = 0) => {
        return async (dispatch,  getState) => {
            let state = getState().dialogs,
                isUpdate = state.dialog === dialog;
            if (!state.loading || !isUpdate) {
                let since = 0;
                if (isUpdate) {
                    let m = state.messages.slice().reverse().find(v => v.sender !== MY_ID);
                    since = m ? m.time : 1;
                }
                dispatch(loading(dialog, isUpdate));
                dispatch(receive(dialog, isUpdate, await api.getMessages(dialog, since)));
            }
        }
    },
    loading = (dialog, isUpdate) => ({ type: ACTION_LOADING, dialog, isUpdate }),
    receive = (dialog, isUpdate, response) => ({ type: ACTION_RECEIVE, dialog, isUpdate, response }),
    send = (dialog, messageType, content) => ({ type: ACTION_SEND, dialog, messageType, content }),
    markAsRead = (dialog) => ({ type: ACTION_MARK_AS_READ }),
    sendText = (dialog, text) => send(dialog, MESSAGE_TYPE_TEXT, text),
    sendFile = (dialog, file) => send(dialog, MESSAGE_TYPE_FILE, file),
    sendImage = (dialog, image) => send(dialog, MESSAGE_TYPE_IMAGE, image);

const initialState = {
    dialog: null,
    counters: {},
    messages: [],
    updating: false,
    loading: false,
    readPosition: 0
};


function reducer(state = initialState, action) {
    switch (action.type) {
    case ACTION_LOADING:
        return {
            ...state,
            updating: action.isUpdate,
            loading: true,
            dialog: action.dialog,
            messages: action.isUpdate ? state.messages : []
        }
    case ACTION_RECEIVE:
        if (state.dialog === action.dialog) {            return {
                ...state,
                messages: action.isUpdate
                    ? (state.messages || []).concat(action.response.messages.filter(m => m.sender !== MY_ID))
                    : action.response.messages,
                counters: action.response.counters,
                loading: false,
                updating: false
            }
        } else {
            return state;
        }
    case ACTION_SEND:
        let time = new Date().getTime();
        api.sendMessage(action.dialog, action.messageType, action.content, time);
        if (action.dialog === state.dialog) {
            return {
                ...state,
                messages: (state.messages || []).concat([{
                    sender: MY_ID,
                    type: action.messageType,
                    content: action.content,
                    time
                }])
            };
        } else {
            return state;
        }
    case ACTION_MARK_AS_READ:

    default:
        return state;
    }
}


export {
    load,
    sendText,
    sendFile,
    sendImage,
    markAsRead,
    reducer,
    MESSAGE_TYPE_TEXT,
    MESSAGE_TYPE_FILE,
    MESSAGE_TYPE_IMAGE
}