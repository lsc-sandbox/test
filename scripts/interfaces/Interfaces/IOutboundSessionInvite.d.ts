import { SessionInviteRejectReason } from "./SessionInviteRejectReason";
import { ISession } from "./ISession";
import { ISessionInvite } from "./ISessionInvite";
import { IAction1 } from "./IAction1";
import { IAction2 } from "./IAction2";
export interface IOutboundSessionInvite extends ISessionInvite {
    accepted(): Promise<ISession>;
    rejected(): Promise<void>;
    rejectReason?: SessionInviteRejectReason;
    cancel(): void;
    onInviteAccepted?: IAction1<IOutboundSessionInvite>;
    onInviteRejected?: IAction2<IOutboundSessionInvite, SessionInviteRejectReason>;
}
