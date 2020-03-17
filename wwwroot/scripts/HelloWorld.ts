import { Client } from "./interfaces/PrototypeImplementation/Consumables/Client.js";
import { IConference } from "./interfaces/Interfaces/IConference.js";
class helloWorld {

    joinConfererence() {
        let client = new Client(helloWorld.userId.value);
        client.connect().then(() => {
            helloWorld.conference = client.join({ conferenceId: "123123", videoSinkElementId: helloWorld.video.id });
            helloWorld.leaveConferenceButton.disabled = false;
        });
    }

    conferenceLeave() {
        helloWorld.conference.leave();
        helloWorld.conference = null;
        helloWorld.leaveConferenceButton.disabled = true;
    }
   
    static leaveConferenceButton?: HTMLButtonElement = null;
    static clientJoinButton: HTMLButtonElement = null;
    static video?: HTMLElement = null;
    static userId?: HTMLInputElement = null;
    static conference?: IConference = null;

    constructor() {
        /// Find elements in html page.
        helloWorld.video = document.getElementById('video') as HTMLElement;
        helloWorld.video.style.display = 'block';
   
        helloWorld.clientJoinButton = document.getElementById('clientJoin') as HTMLInputElement;
        helloWorld.clientJoinButton.addEventListener("click", this.joinConfererence);     

        helloWorld.userId = document.getElementById('userName') as HTMLInputElement;

        helloWorld.leaveConferenceButton = document.getElementById('leaveConference') as HTMLButtonElement;
        helloWorld.leaveConferenceButton.addEventListener("click", this.conferenceLeave);  
        helloWorld.leaveConferenceButton.disabled = true;
    }
}
export { helloWorld };
let demo = new helloWorld();