import { Session } from "./Session.js";
export class Conference extends Session {
    constructor(channel, liveSwitchClient, notifyLeave, videoContainer, invitation) {
        super(channel, liveSwitchClient, notifyLeave, videoContainer, invitation);
    }
}
