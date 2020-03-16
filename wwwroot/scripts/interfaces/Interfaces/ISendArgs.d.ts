import { IAction2 } from "./IAction2";
import { IAction1 } from "./IAction1";
export interface ISendArgs {
    onSent?: IAction1<ISendArgs>;
    onDelivered?: IAction1<ISendArgs>;
    onProgress?: IAction2<ISendArgs, number>;
    onFailed?: IAction2<ISendArgs, Error>;
    onViewed?: IAction1<ISendArgs>;
}
