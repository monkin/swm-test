
import React, { Component } from "react";
import { connect } from "react-redux";
import styled from 'styled-components';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { Users, Dialogs } from "../model";

import { MessageList, Message, MessageAuthor } from "./message-list";
import UserList from "./user-list";
import MessageInput from "./message-input";

const AppLayout = styled.div`
        display: flex;
        align-items: stretch;
        width: 100%;
        height: 100%;`,
    MenuArea = styled.div`
        overflow-y: auto;
        width: 16rem;
        flex-shrink: 0;
        border-right: solid 1px rgba(0, 0, 0, 0.12)`,
    DialogArea = styled.div`
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        align-items: stretch;`,
     MessagesArea = styled.div`
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        flex-grow: 1;`

class App extends Component {
    constructor(props) {
        super(props);
        this.props.dispatch(Users.load());
        this.props.dispatch(Dialogs.load(props.params.dialog || null));
        this.interval = setInterval(() => {
            this.props.dispatch(Dialogs.load(this.props.params.dialog || null));
        }, 1000);
        this.state = { usersById: {} };
    }
    componentWillReceiveProps(newProps) {
        if (newProps.params.dialog !== this.props.params.dialog) {
            this.props.dispatch(Dialogs.load(newProps.params.dialog || null));
        }
        this.setState({
            usersById: (newProps.users.users || []).reduce((r, v) => {
                    r[v.id] = v;
                    return r;
                }, {})
        });
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    render() {
        let { users, dialogs, params, dispatch, router } = this.props,
            { usersById } = this.state || {};
        return <MuiThemeProvider>
            <AppLayout>
                <MenuArea>
                    <UserList users={users.users || []}
                        selectedUserId={params.dialog}
                        onSelect={userId => {
                            router.push("/" + userId);
                        }}/>
                </MenuArea>
                <DialogArea>
                    <MessagesArea>
                        <MessageList>
                            {(dialogs.messages || []).map((message, i) => {
                                let showAuthor = usersById && message.sender !== Users.MY_ID && (i ===  0 || dialogs.messages[i - 1].sender === Users.MY_ID);
                                return [
                                    showAuthor ? <MessageAuthor>{usersById[message.sender].name}</MessageAuthor> : null,
                                    <Message key={message.time} currentUserId={Users.MY_ID} message={message}/>
                                ];
                            })}
                        </MessageList>
                    </MessagesArea>
                    <MessageInput visible={!!params.dialog}
                        key={params.dialog || "empty"}
                        onSendFile={file => {
                            let message = { name: file.name, url: URL.createObjectURL(file) };
                            if (/^image\//.test(file.type)) {
                                this.props.dispatch(Dialogs.sendImage(params.dialog, message));
                            } else {
                                this.props.dispatch(Dialogs.sendFile(params.dialog, message));
                            }
                        }}
                        onSendText={text => {
                            this.props.dispatch(Dialogs.sendText(params.dialog, text));
                        }}/>
                </DialogArea>
            </AppLayout>
        </MuiThemeProvider>;
    }
}

export default connect(state => state)(App);