import { IParticipant } from "../../Interfaces/IParticipant.js";
import { IScreenStream } from "../../Interfaces/IScreenStream.js";
import { IDeviceStream } from "../../Interfaces/IDeviceStream.js";
import { IFileStream } from "../../Interfaces/IFileStream.js";
import { IAction1 } from "../../Interfaces/IAction1.js";
import { DeviceStream } from "./DeviceStream.js";
import { ScreenStream } from "./ScreenStream.js";

export class Participant implements IParticipant {
    id: string = fm.liveswitch.Guid.newGuid().toString();
    isMe: boolean = false;
    get screenStream(): IScreenStream {
        if (this.screenStreams.length == 0) {
            return null;
        }
        return this.screenStreams[0];    
    }
    screenStreams: IScreenStream[] = new Array<ScreenStream>();
    get deviceStream(): IDeviceStream {
        if (this.deviceStreams.length == 0) {
            return null;
        }
        return this.deviceStreams[0];

    }
    deviceStreams: IDeviceStream[] = new Array<DeviceStream>();
    constructor(id?: string, isMe?:boolean) {
        if (id) {
            this.id = id;
        }
        if (isMe) {
            this.isMe = isMe;
        }
    }
    // Don't need this I think
    //private isInvolvedWithYourStreaming = true;
    //get isInvolvedWithYou(): boolean {
    //    return this.isInvolvedWithYourStreaming;
    //}
    //set isInvolvedWithYou(boolean: boolean) {
    //    this.isInvolvedWithYourStreaming = boolean;
    //}
    // don't worry about the following
    get fileStream(): IFileStream {
        return null;
    }
    get fileStreams(): IFileStream[] {
        return null
    }
    connectionQuality!: number;
    roundTripTime!: number;
    packetLoss!: number;
    audioLevel!: number;
    onParticipantTypingMessage?: IAction1<IParticipant>;
    onParticipantSendingFile?: IAction1<IParticipant>;
}