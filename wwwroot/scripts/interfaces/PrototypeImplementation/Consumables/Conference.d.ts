import { Session } from "./Session.js";
import { IConference } from "../../Interfaces/IConference.js";
import { IAction0 } from "../../Interfaces/IAction0.js";
export declare class Conference extends Session implements IConference {
    constructor(channel: string, liveSwitchClient: fm.liveswitch.Client, notifyLeave: IAction0, videoContainer?: HTMLElement, invitation?: fm.liveswitch.ChannelInvitation);
}
