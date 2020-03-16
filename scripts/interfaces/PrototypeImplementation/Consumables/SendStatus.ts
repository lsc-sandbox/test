import { ISendStatus, SendState } from "../../Interfaces/ISendStatus.js";
import { IParticipant } from "../../Interfaces/IParticipant.js";
import { Participant } from "./Participant.js";

export class SendStatus implements ISendStatus {
    state: SendState = SendState.New; // need to come back to this
    deliveredToParticipants: IParticipant[] = Array<Participant>(); // need to come back to this
    viewedByParticipants: IParticipant[] = Array<Participant>(); // need to come back to this
    constructor() {

    }
}