
import React from "react";
import styled from "styled-components";
import Paper from 'material-ui/Paper';
import DownloadFileIcon from "material-ui/svg-icons/file/file-download";
import { Dialogs } from "../model";

export const MessageList = styled.ol`
        border-radius: 2px;
        background: white;
        list-style: none;
        margin: 0;
        padding: 8px 24px;
        overflow-y: auto;`,
    MessageAuthor = styled.li`
        animation: show-message 0.15s ease-in-out;
        color: rgba(0, 0, 0, 0.54);
        font-size: calc(14 / 16 * 1rem);
        font-weight: 500;
        margin: 16px 0 4px 64px;`;

const MessageContainer = styled.li`
        animation: show-message 0.15s ease-in-out;
        margin: 4px 0;
        padding: 0;`,
    MessageFileLink = styled.a`
        display: inline-flex;
        align-items: center;`,
    MessageImageLink = styled.a`
        display: inline-block;
        vertical-align: middle;`,
    MessageImage = styled.img`
        display: block;
        max-width: 320px;
        max-height: 320px;
        border-radius: 2px;
        position: relative;
        left: -8px;`;

const messageItemStyle = {
        padding: "8px 16px",
        marginLeft: "64px",
        boxSizing: "border-box",
        maxWidth: "768px",
        whiteSpace: "pre-wrap"
    },
    myMessageItemStyle = {
        padding: "8px 16px",
        marginRight: "64px",
        boxSizing: "border-box",
        maxWidth: "768px",
        whiteSpace: "pre-wrap"
    };

function MessageBody({ message }) {
    if (message.type === Dialogs.MESSAGE_TYPE_TEXT) {
        return <span>{message.content}</span>;
    } else if (message.type === Dialogs.MESSAGE_TYPE_FILE) {
        return <MessageFileLink href={message.content.url} target="_blank">
                <DownloadFileIcon style={{ marginRight: "8px" }} color="#00bcd4"/>
                {message.content.name}
            </MessageFileLink>;
    } else if (message.type === Dialogs.MESSAGE_TYPE_IMAGE) {
        return <MessageImageLink href={message.content.url} target="_blank">
            <MessageImage src={message.content.url}/>
        </MessageImageLink>
    } else {
        return null;
    }
}

export function Message({ currentUserId, message }) {
    return <MessageContainer>
        <Paper style={currentUserId === message.sender ? myMessageItemStyle : messageItemStyle} zDepth={1}>
            <MessageBody message={message}/>
        </Paper>
    </MessageContainer>;
}