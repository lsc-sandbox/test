import { Client } from "./interfaces/PrototypeImplementation/Consumables/Client.js";
class Muting {
    constructor() {
        Muting.video = document.getElementById('video');
        Muting.video.style.display = 'block';
        Muting.clientJoinButton = document.getElementById('clientJoin');
        Muting.clientJoinButton.addEventListener("click", this.joinConfererence); // modify       
        Muting.clientJoinButton.disabled = true;
        Muting.leaveConferenceButton = document.getElementById('leaveConference');
        Muting.leaveConferenceButton.addEventListener("click", this.conferenceLeave); // modify    
        Muting.leaveConferenceButton.disabled = true;
        Muting.toggleAudioButton = document.getElementById('toggleAudioMute');
        Muting.toggleAudioButton.addEventListener("click", this.toggleAudio); // modify    
        Muting.toggleAudioButton.disabled = true;
        Muting.toggleVideoButton = document.getElementById('toggleVideoMute');
        Muting.toggleVideoButton.addEventListener("click", this.toggleVideo); // modify    
        Muting.toggleVideoButton.disabled = true;
    }
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
}
Muting.video = null;
Muting.leaveConferenceButton = null;
Muting.clientJoinButton = null;
Muting.toggleAudioButton = null;
Muting.toggleVideoButton = null;
Muting.conference = null;
export { Muting };
let demo = new Muting();
