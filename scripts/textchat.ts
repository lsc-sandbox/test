import { Client } from "./interfaces/PrototypeImplementation/Consumables/Client.js";
import { IConference } from "./interfaces/Interfaces/IConference.js";
import { MessageArgs } from "./interfaces/PrototypeImplementation/Consumables/MessageArgs.js";
import { ISession, SessionState } from "./interfaces/Interfaces/ISession.js";
import { IMessageArgs } from "./interfaces/Interfaces/ImessageArgs.js";
import { IReceiveArgs } from "./interfaces/Interfaces/IReceiveArgs.js";

class TextChat {

    joinConfererence() {
        let client = new Client(TextChat.userId.value);
        client.connect().then(() => {
            TextChat.conference = client.join({ conferenceId: "123123", camera: false, microphone: false });
            TextChat.conference.onIncomingMessage = (session: ISession, message: IMessageArgs & IReceiveArgs) => {
                TextChat.writeMessage(message.senderId + ": " + message.stringMessage);
            };
            TextChat.leaveConferenceButton.disabled = false;
        });
    }
    
    conferenceLeave() {
        TextChat.conference.leave();
        TextChat.conference = null;
    }

    sendMessage = () => {
        let text = TextChat.inputText.value;
        if (TextChat.conference != null) {
            TextChat.conference.sendMessage(new MessageArgs(text));
        }
        TextChat.inputText.value = "";
        TextChat.writeMessage("Me: " + text);
    };

    static writeMessage = (msg: string) => {
        var content = document.createElement('p');
        content.innerHTML = msg;
        if (TextChat.text != null) {
            TextChat.text.appendChild(content);
            TextChat.text.scrollTop = TextChat.text.scrollHeight;
        }
    };

    static sendButton?: HTMLButtonElement = null;
    static text?: HTMLButtonElement = null;
    static inputText?: HTMLButtonElement = null;
    static userId?: HTMLInputElement = null;
    static clientJoinButton: HTMLButtonElement = null;
    static conference?: IConference = null;
    static leaveConferenceButton?: HTMLButtonElement = null;

    constructor() {
     
        TextChat.text = document.getElementById('eventLog') as HTMLButtonElement;
        TextChat.inputText = document.getElementById('sendInput') as HTMLButtonElement;

        TextChat.sendButton = document.getElementById('sendButton') as HTMLButtonElement;
        TextChat.sendButton.addEventListener("click", this.sendMessage); 

        TextChat.clientJoinButton = document.getElementById('clientJoin') as HTMLInputElement;
        TextChat.clientJoinButton.addEventListener("click", this.joinConfererence); // modify       

        TextChat.userId = document.getElementById('userName') as HTMLInputElement;
        TextChat.clientJoinButton.disabled = true;

        TextChat.leaveConferenceButton = document.getElementById('leaveConference') as HTMLButtonElement;
        TextChat.leaveConferenceButton.addEventListener("click", this.conferenceLeave); // modify    
        TextChat.leaveConferenceButton.disabled = true;
    }
}

export { TextChat };
