import { IConference } from "./interfaces/Interfaces/IConference.js";
declare class Muting {
    joinConfererence(): void;
    conferenceLeave(): void;
    toggleAudio(): void;
    toggleVideo(): void;
    static video?: HTMLElement;
    static leaveConferenceButton?: HTMLButtonElement;
    static clientJoinButton: HTMLButtonElement;
    static toggleAudioButton: HTMLButtonElement;
    static toggleVideoButton: HTMLButtonElement;
    static conference?: IConference;
    constructor();
}
export { Muting };
