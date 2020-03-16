import { IScreenStream } from "./IScreenStream";
import { IDeviceStream } from "./IDeviceStream";
import { IFileStream } from "./IFileStream";
import { IAction1 } from "./IAction1";
export interface IParticipant {
    id: string;
    isMe: boolean;
    screenStream: IScreenStream;
    screenStreams: IScreenStream[];
    deviceStream: IDeviceStream;
    deviceStreams: IDeviceStream[];
    fileStream: IFileStream;
    fileStreams: IFileStream[];
    onParticipantTypingMessage?: IAction1<IParticipant>;
    onParticipantSendingFile?: IAction1<IParticipant>;
    connectionQuality: number;
    roundTripTime: number;
    packetLoss: number;
    audioLevel: number;
}
