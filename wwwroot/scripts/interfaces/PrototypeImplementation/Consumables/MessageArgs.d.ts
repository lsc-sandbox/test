import { IMessageArgs } from "../../Interfaces/ImessageArgs.js";
export declare class MessageArgs implements IMessageArgs {
    constructor(message: string);
    binaryMessage?: Blob;
    stringMessage?: string;
    userId?: string;
}
