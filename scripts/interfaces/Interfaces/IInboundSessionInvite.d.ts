import { IDeviceStreamArgs, IScreenStreamArgs, IFileStreamArgs, ISession } from "./ISession";
import { SessionInviteRejectReason } from "./SessionInviteRejectReason";
import { IParticipant } from "./IParticipant";
import { ISessionInvite } from "./ISessionInvite";
export interface IInboundSessionInvite extends ISessionInvite {
    accept(args?: IDeviceStreamArgs): ISession;
    acceptWithDeviceStream(args?: IDeviceStreamArgs): ISession;
    acceptWithScreenStream(args?: IScreenStreamArgs): ISession;
    acceptWithFileStream(args?: IFileStreamArgs): ISession;
    reject(reason?: SessionInviteRejectReason): void;
    hasVideo?: boolean;
    hasAudio?: boolean;
    hasScreenshare?: boolean;
    inviteState?: InboundSessionInviteState;
    isNew?: boolean;
    isAccepted?: boolean;
    isRejected?: boolean;
    participants?: IParticipant[];
}
export declare enum InboundSessionInviteState {
    New = 1,
    Accepted = 2,
    Rejected = 3
}
