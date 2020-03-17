import { IReceiveArgs } from "../../../../wwwroot/scripts/interfaces/Interfaces/IReceiveArgs.js";
import { IMessageArgs } from "../../../../wwwroot/scripts/interfaces/Interfaces/ImessageArgs.js";
export declare class StringMessageArgs {
    message: string;
    constructor(message: string);
}
export declare class ChatArgs implements IReceiveArgs, IMessageArgs {
    senderId: string;
    binaryMessage?: Blob;
    stringMessage?: string;
    userId?: string;
    constructor();
}
