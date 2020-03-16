import { ISession } from "./ISession";
import { IOutboundSessionInvite } from "./IOutboundSessionInvite";
export interface ISessionContext extends ISession, IOutboundSessionInvite {
}
