
import jdenticon from "jdenticon";

function randomDelay(timeout) {
    return new Promise(resolve => setTimeout(resolve, (timeout + Math.random() * timeout * 2) / 3));
}

function random(min, max) {
    return Math.floor(min + Math.random() * (max - min));
}

const users = [
    "Willard Edwards",
    "Nick Barnes",
    "Clint Vega",
    "Grace Simon",
    "Norma Tucker",
    "Maggie Johnston",
    "Eddie Knight",
    "Lucille Chandler",
    "Lynn Gomez",
    "Kathryn Santos"
].map((name, id) => {
    let hash = "";
    return {
        name,
        id: "u" + id,
        avatar: "data:image/svg+xml;utf8," + encodeURIComponent(jdenticon.toSvg(name.split("")
                .map(c => c.charCodeAt(0).toString(16))
                .join(""), 64))
    };
});


class Dialog {
    constructor() {
        this.messages = [];
        this.readTimeByUser = {};
    }
    getUnreadCount(user) {
        let time = this.readTimeByUser[user] || 0,
            messages = this.messages,
            count = 0;
        for (let i = messages.length - 1; i >= 0 && messages[i].time > time; i--) {
            if (messages[i].sender !== user) {
                count++;
            }
        }
        return count;
    }
    sendMessage(sender, messageType, content, time) {
        this.messages.push({ sender, type: messageType, content, time });
    }
    getMessages(since = 0) {
        if (since) {
            let result = [],
                messages = this.messages;
            for (let i = messages.length - 1; i >= 0; i--) {
                if (messages[i].time <= since) {
                    return this.messages.slice(i + 1, messages.length);
                }
            }
        }
        
        return this.messages.slice();
    }
    markAsRead(user, time) {
        this.readTimeByUser[user] = time;
    }
}

const dialogs = {};

const MY_ID = "me";
const MESSAGE_TYPE_TEXT = "TEXT";
const MESSAGE_TYPE_FILE = "FILE";
const MESSAGE_TYPE_IMAGE = "IMAGE";

async function getUsers() {
    await randomDelay(300);
    return users;
}
async function getMessages(dialog, since = 0) {
    await randomDelay(300);
    let counters = Object.keys(dialogs).map(id => {
                return { id, counter: dialogs[id].getUnreadCount(MY_ID) };
            }).reduce((r, v) => {
                r[v.id] = v.counter;
                return r;
            }, {}),
        messages = dialog && dialogs.hasOwnProperty(dialog)
            ? dialogs[dialog].getMessages(since)
            : [];
    return { counters, messages };
}
async function sendMessage(dialog, messageType, content, time) {
    await randomDelay(300);
    if (!dialogs.hasOwnProperty(dialog)) {
        dialogs[dialog] = new Dialog();
    }
    dialogs[dialog].sendMessage(MY_ID, messageType, content, time);
    randomDelay(2000).then(() => {
        let message = `Elizabeth II (Elizabeth Alexandra Mary; born ${random(1, 31)} April ${random(1890, 1945)}) `
                + `has been Queen of the United Kingdom, Canada, Australia, and New Zealand since `
                + `${random(1, 30)} February ${random(1947, 1975)}.`;
        dialogs[dialog].sendMessage(dialog, MESSAGE_TYPE_TEXT, message, new Date().getTime());
    });
}
async function markAsRead(dialog, user, time) {
    await randomDelay(300);
    let d = dialogs[dialog] || (dialogs[dialog] = new Dialog());
    d.markAsRead(user, time);
}

export {
    MY_ID,
    MESSAGE_TYPE_TEXT,
    MESSAGE_TYPE_FILE,
    MESSAGE_TYPE_IMAGE,
    getUsers,
    getMessages,
    sendMessage,
    markAsRead
}