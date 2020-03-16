import { IConference } from "./interfaces/Interfaces/IConference.js";
declare class helloWorld {
    joinConfererence(): void;
    conferenceLeave(): void;
    static leaveConferenceButton?: HTMLButtonElement;
    static clientJoinButton: HTMLButtonElement;
    static video?: HTMLElement;
    static userId?: HTMLInputElement;
    static conference?: IConference;
    constructor();
}
export { helloWorld };
