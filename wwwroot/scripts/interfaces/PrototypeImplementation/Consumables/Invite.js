import { SessionInviteRejectReason } from "../../Interfaces/SessionInviteRejectReason.js";
export class Invite {
    constructor(invitation) {
        this.invitation = null;
        if (invitation != null) {
            this.invitation = invitation;
            invitation.addOnStateChanging((invite) => {
                if (invite.getState() == fm.liveswitch.InvitationState.Accepted) {
                    if (this.oninviteaccepted != null) {
                        this.oninviteaccepted();
                    }
                }
                else if (invite.getState() == fm.liveswitch.InvitationState.Rejected) {
                    if (this.oninviteaccepted != null) {
                        invite.getReason(); /// will have to set
                        this.oninviterejected(SessionInviteRejectReason.None);
                    }
                }
            });
        }
    }
    addInvitation(invitation) {
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
            }
            else if (invite.getState() == fm.liveswitch.InvitationState.Rejected) {
                if (this.oninviteaccepted != null) {
                    invite.getReason(); /// will have to set
                    this.oninviterejected(SessionInviteRejectReason.None);
                }
            }
        });
    }
    cancel() {
        var _a;
        (_a = this.invitation) === null || _a === void 0 ? void 0 : _a.cancel();
    }
}
