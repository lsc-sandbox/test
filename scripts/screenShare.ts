import { Client } from "./interfaces/PrototypeImplementation/Consumables/Client.js";
import { IConference } from "./interfaces/Interfaces/IConference.js";

class screenShare {

    private static isScreenOn = false;
    private static isCameraOn = false;

    joinConfererence() {
        let client = new Client();
        client.connect().then(() => {
            screenShare.clientJoinButton.disabled = false;
            screenShare.conference = client.join({ conferenceId: "123123", videoSinkElementId: screenShare.video.id , screenshare: true});
            screenShare.isScreenOn = true;
            screenShare.leaveConferenceButton.disabled = false;
            screenShare.switchToScreenShareButton.disabled = false;
            screenShare.cameraAndScreenButton.disabled = false;
        });
    }

    conferenceLeave() {
        screenShare.conference.leave();
        screenShare.conference = null;
    }

    switch() {
        if (screenShare.isCameraOn && screenShare.isScreenOn) {
            screenShare.conference.me.screenStream.stop();
            screenShare.isScreenOn = false;
        }
        else if (screenShare.isCameraOn) {
            screenShare.conference.me.deviceStream.stop();
            if (screenShare.conference.me.screenStream) {
                screenShare.conference.me.screenStream.start();
            } else {
                screenShare.conference.startScreenStream();
            }
            screenShare.isCameraOn = false;
            screenShare.isScreenOn = true;
        } else if (screenShare.isScreenOn) {
            screenShare.conference.me.screenStream.stop();
            if (screenShare.conference.me.deviceStream) {
                screenShare.conference.me.deviceStream.start();
            } else {
                screenShare.conference.startDeviceStream();
            }
            screenShare.isCameraOn = true;
            screenShare.isScreenOn = false;
        }
    }
    screenAndCamera() {
        if (!screenShare.isCameraOn) {
            if (screenShare.conference.me.deviceStream) {
                screenShare.conference.me.deviceStream.start();
            } else {
                screenShare.conference.startDeviceStream();
            }
            screenShare.isCameraOn = true;
        }
        if (!screenShare.isScreenOn) {
            if (screenShare.conference.me.screenStream) {
                screenShare.conference.me.screenStream.start();
            } else {
                screenShare.conference.startScreenStream();
            }
            screenShare.isScreenOn = true;
        }
    }
   
    static video?: HTMLElement = null;
    static switchToScreenShareButton?: HTMLButtonElement = null;
    static cameraAndScreenButton?: HTMLButtonElement = null;
    static leaveConferenceButton?: HTMLButtonElement = null;

    static clientJoinButton: HTMLButtonElement = null;

    static conference?: IConference = null;

    constructor() {
        screenShare.video = document.getElementById('video') as HTMLElement;
        screenShare.video.style.display = 'block';

        screenShare.clientJoinButton = document.getElementById('clientJoin') as HTMLInputElement;
        screenShare.clientJoinButton.addEventListener("click", this.joinConfererence); // modify       

        screenShare.switchToScreenShareButton = document.getElementById('switchScreenShare') as HTMLButtonElement;
        screenShare.switchToScreenShareButton.addEventListener("click", this.switch); // modify        
        screenShare.switchToScreenShareButton.disabled = true;

        screenShare.cameraAndScreenButton = document.getElementById('enableCameraAndScreen') as HTMLButtonElement;
        screenShare.cameraAndScreenButton.addEventListener("click", this.screenAndCamera); // modify        
        screenShare.cameraAndScreenButton.disabled = true;

        screenShare.leaveConferenceButton = document.getElementById('leaveConference') as HTMLButtonElement;
        screenShare.leaveConferenceButton.addEventListener("click", this.conferenceLeave); // modify    
        screenShare.leaveConferenceButton.disabled = true;
    }
}

export { screenShare };
let demo = new screenShare();