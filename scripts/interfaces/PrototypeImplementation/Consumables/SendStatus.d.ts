import { ISendStatus, SendState } from "../../Interfaces/ISendStatus.js";
import { IParticipant } from "../../Interfaces/IParticipant.js";
export declare class SendStatus implements ISendStatus {
    state: SendState;
    deliveredToParticipants: IParticipant[];
    viewedByParticipants: IParticipant[];
    constructor();
}
