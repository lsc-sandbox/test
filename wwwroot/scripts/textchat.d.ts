import { IConference } from "./interfaces/Interfaces/IConference.js";
declare class TextChat {
    joinConfererence(): void;
    conferenceLeave(): void;
    sendMessage: () => void;
    static writeMessage: (msg: string) => void;
    static sendButton?: HTMLButtonElement;
    static text?: HTMLButtonElement;
    static inputText?: HTMLButtonElement;
    static userId?: HTMLInputElement;
    static clientJoinButton: HTMLButtonElement;
    static conference?: IConference;
    static leaveConferenceButton?: HTMLButtonElement;
    constructor();
}
export { TextChat };
