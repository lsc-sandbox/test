import { IMessageArgs } from "../../Interfaces/ImessageArgs.js";

export class MessageArgs implements IMessageArgs {
    constructor(message: string) {
        this.stringMessage = message;
    }
    binaryMessage?: Blob;
    stringMessage?: string;
    userId?: string;
}