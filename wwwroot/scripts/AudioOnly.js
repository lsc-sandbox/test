import { Client } from "./interfaces/PrototypeImplementation/Consumables/Client.js";
class audioOnly {
    constructor() {
        /// Find elements in html page.
        audioOnly.clientJoinButton = document.getElementById('clientJoin');
        audioOnly.clientJoinButton.addEventListener("click", this.joinConfererence);
        audioOnly.leaveConferenceButton = document.getElementById('leaveConference');
        audioOnly.leaveConferenceButton.addEventListener("click", this.conferenceLeave);
        audioOnly.leaveConferenceButton.disabled = true;
    }
    joinConfererence() {
        let client = new Client();
        client.connect().then(() => {
            audioOnly.conference = client.join({ conferenceId: "123123", camera: false });
            audioOnly.leaveConferenceButton.disabled = false;
        });
    }
    conferenceLeave() {
        audioOnly.conference.leave();
        audioOnly.conference = null;
    }
}
audioOnly.leaveConferenceButton = null;
audioOnly.clientJoinButton = null;
audioOnly.conference = null;
export { audioOnly };
let demo = new audioOnly();
