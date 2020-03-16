import { IAction0 } from "../../Interfaces/IAction0.js";
import { IAction1 } from "../../Interfaces/IAction1.js";
import { SessionInviteRejectReason } from "../../Interfaces/SessionInviteRejectReason.js";
export declare class Invite {
    private invitation?;
    constructor(invitation?: fm.liveswitch.Invitation);
    addInvitation(invitation: fm.liveswitch.Invitation): void;
    cancel(): void;
    oninviteaccepted: IAction0;
    oninviterejected: IAction1<SessionInviteRejectReason>;
}
