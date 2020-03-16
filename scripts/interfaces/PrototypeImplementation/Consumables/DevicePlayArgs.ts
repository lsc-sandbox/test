import { IDevicePlayArgs, IPlayArgs } from "../../Interfaces/ISession.js";
import { ISink } from "../../Interfaces/ISink.js";

export class PlayArgs implements IPlayArgs {
    audioSink?: ISink;
    videoSink?: ISink;
    constructor(audioSink?: ISink, videoSink?: ISink) {
        this.audioSink = audioSink;
        this.videoSink = videoSink;
    }
}

export class DevicePlayArgs extends PlayArgs implements IDevicePlayArgs {
    microphone?: boolean;
    camera?: boolean;
    audioOutputDeviceId?: string;
    videoSinkElementId?: string;
    constructor(microphone?: boolean, camera?: boolean, audioOutputDeviceId?: string, videoSinkElementId?: string, audioSink?: ISink, videoSink?: ISink) {
        super(audioSink, videoSink);
        this.audioOutputDeviceId = audioOutputDeviceId;
        this.videoSinkElementId = videoSinkElementId;
        this.microphone = microphone;
        this.camera = camera;
    }
}
