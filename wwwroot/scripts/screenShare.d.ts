import { IConference } from "./interfaces/Interfaces/IConference.js";
declare class screenShare {
    private static isScreenOn;
    private static isCameraOn;
    joinConfererence(): void;
    conferenceLeave(): void;
    switch(): void;
    screenAndCamera(): void;
    static video?: HTMLElement;
    static switchToScreenShareButton?: HTMLButtonElement;
    static cameraAndScreenButton?: HTMLButtonElement;
    static leaveConferenceButton?: HTMLButtonElement;
    static clientJoinButton: HTMLButtonElement;
    static conference?: IConference;
    constructor();
}
export { screenShare };
