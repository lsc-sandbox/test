import { IAction0 } from "../../Interfaces/IAction0.js";
import { IAction1 } from "../../Interfaces/IAction1.js";
import { SessionInviteRejectReason } from "../../Interfaces/SessionInviteRejectReason.js";

export class Invite{
    private invitation?: fm.liveswitch.Invitation = null;
    constructor(invitation?: fm.liveswitch.Invitation) {
        if (invitation != null) {
            this.invitation = invitation;
            invitation.addOnStateChanging((invite) => {
                if (invite.getState() == fm.liveswitch.InvitationState.Accepted) {
                    if (this.oninviteaccepted != null) {
                        this.oninviteaccepted();
                    }
                } else if (invite.getState() == fm.liveswitch.InvitationState.Rejected) {
                    if (this.oninviteaccepted != null) {
                        invite.getReason();/// will have to set
                        this.oninviterejected(SessionInviteRejectReason.None);
                    }
                }
            });
        }
    }
    addInvitation(invitation: fm.liveswitch.Invitation) {
        if (this.invitation) {
            // cannot add more than once invitation
            return;
        }
        this.invitation = invitation;
        invitation.addOnStateChanging((invite) => {
            if (invite.getState() == fm.liveswitch.InvitationState.Accepted) {
                if (this.oninviteaccepted != null) {
                    this.oninviteaccepted();
                }
            } else if (invite.getState() == fm.liveswitch.InvitationState.Rejected) {
                if (this.oninviteaccepted != null) {
                    invite.getReason();/// will have to set
                    this.oninviterejected(SessionInviteRejectReason.None);
                }
            }
        });
    }
    cancel(): void {
        this.invitation?.cancel();
    }
    oninviteaccepted!: IAction0;
    oninviterejected!: IAction1<SessionInviteRejectReason>;


}