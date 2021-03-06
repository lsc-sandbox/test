import { Client } from "./interfaces/PrototypeImplementation/Consumables/Client.js";
import { IConference } from "./interfaces/Interfaces/IConference.js";
declare class App {
    joinConfererence(): void;
    private static isScreenOn;
    private static isCameraOn;
    switchMode(): void;
    conferenceLeave(): void;
    sendMessage: () => void;
    static writeMessage: (msg: string) => void;
    private CameraMuted;
    private AudioMuted;
    toggleAudio(): void;
    toggleVideo(): void;
    static video?: HTMLElement;
    static text?: HTMLButtonElement;
    static inputText?: HTMLButtonElement;
    static switchToScreenShare?: HTMLButtonElement;
    static leaveConferenceButton?: HTMLButtonElement;
    static userId?: HTMLInputElement;
    static sendButton?: HTMLButtonElement;
    static inviteButton?: HTMLButtonElement;
    static clientConnectButton: HTMLButtonElement;
    static clientJoinButton: HTMLButtonElement;
    static toggleAudioButton: HTMLButtonElement;
    static toggleVideoButton: HTMLButtonElement;
    static client: Client;
    static conference?: IConference;
    constructor();
}
export { App };
