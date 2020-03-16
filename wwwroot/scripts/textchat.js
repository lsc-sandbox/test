import { Client } from "./interfaces/PrototypeImplementation/Consumables/Client.js";
import { MessageArgs } from "./interfaces/PrototypeImplementation/Consumables/MessageArgs.js";
class TextChat {
    constructor() {
        this.sendMessage = () => {
            let text = TextChat.inputText.value;
            if (TextChat.conference != null) {
                TextChat.conference.sendMessage(new MessageArgs(text));
            }
            TextChat.inputText.value = "";
            TextChat.writeMessage("Me: " + text);
        };
        TextChat.text = document.getElementById('eventLog');
        TextChat.inputText = document.getElementById('sendInput');
        TextChat.sendButton = document.getElementById('sendButton');
        TextChat.sendButton.addEventListener("click", this.sendMessage);
        TextChat.clientJoinButton = document.getElementById('clientJoin');
        TextChat.clientJoinButton.addEventListener("click", this.joinConfererence); // modify       
        TextChat.userId = document.getElementById('userName');
        TextChat.clientJoinButton.disabled = true;
        TextChat.leaveConferenceButton = document.getElementById('leaveConference');
        TextChat.leaveConferenceButton.addEventListener("click", this.conferenceLeave); // modify    
        TextChat.leaveConferenceButton.disabled = true;
    }
    joinConfererence() {
        let client = new Client(TextChat.userId.value);
        client.connect().then(() => {
            TextChat.conference = client.join({ conferenceId: "123123", camera: false, microphone: false });
            TextChat.conference.onIncomingMessage = (session, message) => {
                TextChat.writeMessage(message.senderId + ": " + message.stringMessage);
            };
            TextChat.leaveConferenceButton.disabled = false;
        });
    }
    conferenceLeave() {
        TextChat.conference.leave();
        TextChat.conference = null;
    }
}
TextChat.writeMessage = (msg) => {
    var content = document.createElement('p');
    content.innerHTML = msg;
    if (TextChat.text != null) {
        TextChat.text.appendChild(content);
        TextChat.text.scrollTop = TextChat.text.scrollHeight;
    }
};
TextChat.sendButton = null;
TextChat.text = null;
TextChat.inputText = null;
TextChat.userId = null;
TextChat.clientJoinButton = null;
TextChat.conference = null;
TextChat.leaveConferenceButton = null;
export { TextChat };
