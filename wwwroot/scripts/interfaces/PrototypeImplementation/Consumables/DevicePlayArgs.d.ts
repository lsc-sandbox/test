import { IDevicePlayArgs, IPlayArgs } from "../../Interfaces/ISession.js";
import { ISink } from "../../Interfaces/ISink.js";
export declare class PlayArgs implements IPlayArgs {
    audioSink?: ISink;
    videoSink?: ISink;
    constructor(audioSink?: ISink, videoSink?: ISink);
}
export declare class DevicePlayArgs extends PlayArgs implements IDevicePlayArgs {
    microphone?: boolean;
    camera?: boolean;
    audioOutputDeviceId?: string;
    videoSinkElementId?: string;
    constructor(microphone?: boolean, camera?: boolean, audioOutputDeviceId?: string, videoSinkElementId?: string, audioSink?: ISink, videoSink?: ISink);
}
