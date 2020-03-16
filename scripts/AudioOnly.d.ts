import { IConference } from "./interfaces/Interfaces/IConference.js";
declare class audioOnly {
    joinConfererence(): void;
    conferenceLeave(): void;
    static leaveConferenceButton?: HTMLButtonElement;
    static clientJoinButton: HTMLButtonElement;
    static conference?: IConference;
    constructor();
}
export { audioOnly };
