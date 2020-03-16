import { ISession } from "./ISession";
import { IAction1 } from "./IAction1";
export interface ICall extends ISession {
    callerId?: string;
    onEnded?: IAction1<ICall>;
    merge?: {
        (anotherCall: ICall): void;
        (...otherCalls: ICall[]): void;
        (anotherCallId: string): void;
        (otherCallIds: string[]): void;
    };
}
