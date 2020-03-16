import { SendState } from "../../Interfaces/ISendStatus.js";
export class SendStatus {
    constructor() {
        this.state = SendState.New; // need to come back to this
        this.deliveredToParticipants = Array(); // need to come back to this
        this.viewedByParticipants = Array(); // need to come back to this
    }
}
