
import React from "react";
import styled from "styled-components";

import TextField from 'material-ui/TextField';
import SendMessageIcon from 'material-ui/svg-icons/content/send';
import AttachFileIcon from 'material-ui/svg-icons/editor/attach-file';
import IconButton from 'material-ui/IconButton';

const MessageInputContainer = styled.div`
        display: none;
        align-items: flex-end;
        padding: 24px 8px;
        background: rgba(0, 0, 0, 0.03);
        border-top: solid 1px rgba(0, 0, 0, 0.12);
        overflow: hidden;
        flex-grow: 0;
        flex-shrink: 0;
        opacity: 0;
        transition: opacity 0.15s ease-in-out;`,
    TextFieldContainer = styled.div`flex-grow: 1; flex-shrink: 1;`;

const visibleContainerStyle = {
        opacity: 1,
        display: "flex"
    },
    uploadFieldStyle = {
        display: "none"
    };

export default class MessageInput extends React.Component {
    constructor(props) {
        super(props);
        this.fileInputId = "file_" + new Date().getTime();
    }
    render() {
        let p = this.props,
            s = this.state || {},
            fileInput = null;
        return <MessageInputContainer style={p.visible ? visibleContainerStyle : {}}>
            <IconButton containerElement="label" htmlFor={this.fileInputId}>
                <AttachFileIcon color="#00bcd4"/>
            </IconButton>
            <input id={this.fileInputId}
                ref={node => fileInput = node}
                type="file"
                style={uploadFieldStyle}
                onChange={() => {
                    if (fileInput && p.onSendFile) {
                        for (let i = 0; i < fileInput.files.length; i++) {
                            p.onSendFile(fileInput.files[i]);
                        }
                    }
                }}/>
            <TextFieldContainer>
                <TextField
                    value={s.text || ""}
                    fullWidth={true}
                    multiLine={true}
                    hintText="Write a message…"
                    onChange={(e, newValue) => this.setState({ text: newValue })}
                    onKeyDown={e => {
                        if (e.keyCode === 13 && e.ctrlKey) {
                            p.onSendText && s.text && p.onSendText(s.text);
                            this.setState({ text: "" });
                        }
                    }}/>
            </TextFieldContainer>
            <IconButton tooltip="Ctrl + Enter"
                    onTouchTap={() => {
                        p.onSendText && s.text && p.onSendText(s.text);
                        this.setState({ text: "" });
                    }}>
                <SendMessageIcon color="#00bcd4"/>
            </IconButton>
        </MessageInputContainer>
    }
}