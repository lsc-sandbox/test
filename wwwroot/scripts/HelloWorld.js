import { Client } from "./interfaces/PrototypeImplementation/Consumables/Client.js";
class helloWorld {
    constructor() {
        /// Find elements in html page.
        helloWorld.video = document.getElementById('video');
        helloWorld.video.style.display = 'block';
        helloWorld.clientJoinButton = document.getElementById('clientJoin');
        helloWorld.clientJoinButton.addEventListener("click", this.joinConfererence);
        helloWorld.userId = document.getElementById('userName');
        helloWorld.leaveConferenceButton = document.getElementById('leaveConference');
        helloWorld.leaveConferenceButton.addEventListener("click", this.conferenceLeave);
        helloWorld.leaveConferenceButton.disabled = true;
    }
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
}
helloWorld.leaveConferenceButton = null;
helloWorld.clientJoinButton = null;
helloWorld.video = null;
helloWorld.userId = null;
helloWorld.conference = null;
export { helloWorld };
let demo = new helloWorld();
