import { IConference } from "./interfaces/Interfaces/IConference.js";
declare class DeviceSwitching {
    joinConfererence(): void;
    conferenceLeave(): void;
    static video?: HTMLElement;
    static leaveConferenceButton?: HTMLButtonElement;
    static clientJoinButton: HTMLButtonElement;
    static conference?: IConference;
    constructor();
}
export { DeviceSwitching };
