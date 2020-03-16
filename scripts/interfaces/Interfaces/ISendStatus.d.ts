import { IParticipant } from "./IParticipant";
export interface ISendStatus {
    state: SendState;
    deliveredToParticipants: IParticipant[];
    viewedByParticipants: IParticipant[];
}
export declare enum SendState {
    New = 1,
    Sent = 2,
    Delivered = 3,
    Viewed = 4
}
