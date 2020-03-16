import { ISendArgs } from "../../Interfaces/ISendArgs.js";
import { IAction1 } from "../../Interfaces/IAction1.js";
import { IAction2 } from "../../Interfaces/IAction2.js";
export declare class SendArgs implements ISendArgs {
    onSent?: IAction1<ISendArgs>;
    onDelivered?: IAction1<ISendArgs>;
    onProgress?: IAction2<ISendArgs, number>;
    onFailed?: IAction2<ISendArgs, Error>;
    onViewed?: IAction1<ISendArgs>;
    constructor(onsent?: IAction1<ISendArgs>, ondelivered?: IAction1<ISendArgs>, onprogress?: IAction2<ISendArgs, number>, onfailed?: IAction2<ISendArgs, Error>, onviewed?: IAction1<ISendArgs>);
}
