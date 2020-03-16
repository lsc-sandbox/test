import { Client } from "./interfaces/PrototypeImplementation/Consumables/Client.js";
import { IConference } from "./interfaces/Interfaces/IConference.js";
class audioOnly {

    joinConfererence() {
        let client = new Client();
        client.connect().then(() => {
            audioOnly.conference = client.join({ conferenceId: "123123", camera: false});
            audioOnly.leaveConferenceButton.disabled = false;
        });
    }

    conferenceLeave() {
        audioOnly.conference.leave();
        audioOnly.conference = null;
    }

    static leaveConferenceButton?: HTMLButtonElement = null;
    static clientJoinButton: HTMLButtonElement = null;
    static conference?: IConference = null;

    constructor() {
        /// Find elements in html page.
        audioOnly.clientJoinButton = document.getElementById('clientJoin') as HTMLInputElement;
        audioOnly.clientJoinButton.addEventListener("click", this.joinConfererence);

        audioOnly.leaveConferenceButton = document.getElementById('leaveConference') as HTMLButtonElement;
        audioOnly.leaveConferenceButton.addEventListener("click", this.conferenceLeave);
        audioOnly.leaveConferenceButton.disabled = true;
    }
}
export { audioOnly };
let demo = new audioOnly();