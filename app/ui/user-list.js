
import React from "react";
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

const listItemStyle = {
        transition: "background 0.6s ease-in-out"
    },
    selectedListItemStyle = {
        ...listItemStyle,
        background: "rgba(0, 0, 0, 0.12)"
    };

export default function UserList({ users, selectedUserId, onSelect }) {
    return <List value={selectedUserId}>
        {users.map(user => {
            return <div key={user.id}
                    style={user.id === selectedUserId ? selectedListItemStyle : listItemStyle}>
                <ListItem
                    onTouchTap={() => user.id !== selectedUserId && onSelect(user.id)}
                    primaryText={user.name}
                    leftAvatar={<Avatar src={user.avatar}/>}/>
            </div>
        })}
    </List>
}