import { IReceiveArgs } from "../../Interfaces/IReceiveArgs.js";

export class ReceiveArgs implements IReceiveArgs {
    senderId: string;
    constructor(senderId: string) {
        this.senderId = senderId;
    }
}