import { Client } from "./interfaces/PrototypeImplementation/Consumables/Client.js";
import { IConference } from "./interfaces/Interfaces/IConference.js";
import { IClient } from "./interfaces/Interfaces/IClient.js";
import { MessageArgs } from "./interfaces/PrototypeImplementation/Consumables/MessageArgs.js";
import { ISession, SessionState } from "./interfaces/Interfaces/ISession.js";
import { IMessageArgs } from "./interfaces/Interfaces/ImessageArgs.js";
import { IReceiveArgs } from "./interfaces/Interfaces/IReceiveArgs.js";
import { DeviceManager } from "./interfaces/PrototypeImplementation/Consumables/DeviceManager.js";

class Muting {

    joinConfererence() {
        let client = new Client();
        client.connect().then(() => {
            Muting.clientJoinButton.disabled = false;
            Muting.conference = client.join({ conferenceId: "123123", videoSinkElementId: Muting.video.id });
            Muting.leaveConferenceButton.disabled = false;
            Muting.toggleAudioButton.value = "Mute Audio";
            Muting.toggleVideoButton.value = "Mute Video";
            Muting.toggleAudioButton.disabled = false;
            Muting.toggleVideoButton.disabled = false;
        });
    }
  
    conferenceLeave() {
        Muting.conference.leave();
        Muting.conference = null;
    }
    toggleAudio() {
        if (Muting.conference.me.deviceStream.microphone.enabled) {
            Muting.conference.me.deviceStream.microphone.disable();
            Muting.toggleAudioButton.value = "Unmute Audio";
        }
        if (Muting.conference.me.deviceStream.microphone.disabled) {
            Muting.conference.me.deviceStream.microphone.enable();
            Muting.toggleAudioButton.value = "Mute Audio";
        }
    }
    toggleVideo() {
        if (Muting.conference.me.deviceStream.camera.enabled) {
            Muting.conference.me.deviceStream.camera.disable();
            Muting.toggleAudioButton.value = "Unmute Video";
        }
        if (Muting.conference.me.deviceStream.camera.disabled) {
            Muting.conference.me.deviceStream.camera.enable();
            Muting.toggleAudioButton.value = "Mute Video";
        }
    }
    static video?: HTMLElement = null;
    static leaveConferenceButton?: HTMLButtonElement = null;

    static clientJoinButton: HTMLButtonElement = null;

    static toggleAudioButton: HTMLButtonElement = null;
    static toggleVideoButton: HTMLButtonElement = null;

    static conference?: IConference = null;

    constructor() {
        Muting.video = document.getElementById('video') as HTMLElement;
        Muting.video.style.display = 'block';

        Muting.clientJoinButton = document.getElementById('clientJoin') as HTMLInputElement;
        Muting.clientJoinButton.addEventListener("click", this.joinConfererence); // modify       
        Muting.clientJoinButton.disabled = true;

        Muting.leaveConferenceButton = document.getElementById('leaveConference') as HTMLButtonElement;
        Muting.leaveConferenceButton.addEventListener("click", this.conferenceLeave); // modify    
        Muting.leaveConferenceButton.disabled = true;


        Muting.toggleAudioButton = document.getElementById('toggleAudioMute') as HTMLButtonElement;
        Muting.toggleAudioButton.addEventListener("click", this.toggleAudio); // modify    
        Muting.toggleAudioButton.disabled = true;

        Muting.toggleVideoButton = document.getElementById('toggleVideoMute') as HTMLButtonElement;
        Muting.toggleVideoButton.addEventListener("click", this.toggleVideo); // modify    
        Muting.toggleVideoButton.disabled = true;
    }
}
export { Muting };
let demo = new Muting(); 
