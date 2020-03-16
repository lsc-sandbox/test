import { ISendArgs } from "../../Interfaces/ISendArgs.js";
import { IAction0 } from "../../Interfaces/IAction0.js";
import { IAction1 } from "../../Interfaces/IAction1.js";
import { IAction2 } from "../../Interfaces/IAction2.js";

export class SendArgs implements ISendArgs {
    onSent?: IAction1<ISendArgs>;
    onDelivered?: IAction1<ISendArgs>;
    onProgress?: IAction2<ISendArgs, number>;
    onFailed?: IAction2<ISendArgs, Error>;
    onViewed?: IAction1<ISendArgs>;
    constructor(onsent?: IAction1<ISendArgs>, ondelivered?: IAction1<ISendArgs>, onprogress?: IAction2<ISendArgs,number>, onfailed?: IAction2<ISendArgs,Error>, onviewed?: IAction1<ISendArgs>) {
        if (onsent) {
            this.onSent = onsent;
        }
        if (ondelivered) {
            this.onDelivered = ondelivered;
        }
        if (onprogress) {
            this.onProgress = onprogress;
        }
        if (onfailed) {
            this.onFailed = onfailed;
        }
        if (onviewed) {
            this.onViewed = onviewed;
        }
    }

}