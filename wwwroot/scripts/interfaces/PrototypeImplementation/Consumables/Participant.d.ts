import { IParticipant } from "../../Interfaces/IParticipant.js";
import { IScreenStream } from "../../Interfaces/IScreenStream.js";
import { IDeviceStream } from "../../Interfaces/IDeviceStream.js";
import { IFileStream } from "../../Interfaces/IFileStream.js";
import { IAction1 } from "../../Interfaces/IAction1.js";
export declare class Participant implements IParticipant {
    id: string;
    isMe: boolean;
    get screenStream(): IScreenStream;
    screenStreams: IScreenStream[];
    get deviceStream(): IDeviceStream;
    deviceStreams: IDeviceStream[];
    constructor(id?: string, isMe?: boolean);
    get fileStream(): IFileStream;
    get fileStreams(): IFileStream[];
    connectionQuality: number;
    roundTripTime: number;
    packetLoss: number;
    audioLevel: number;
    onParticipantTypingMessage?: IAction1<IParticipant>;
    onParticipantSendingFile?: IAction1<IParticipant>;
}
