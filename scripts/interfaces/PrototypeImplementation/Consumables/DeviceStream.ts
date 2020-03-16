import { IDeviceStream } from "../../Interfaces/IDeviceStream.js";
import { Stream } from "./Stream.js";
import { SubStream } from "./SubStream.js";
import { DeviceType } from "../../Interfaces/DeviceType.js";
import { DevicePlayArgs } from "./DevicePlayArgs.js";
import { ISubStream } from "../../Interfaces/ISubStream.js";
import { StreamType } from "../../Interfaces/StreamType.js";
import { StreamState } from "../../Interfaces/IStream.js";
import { IAction1 } from "../../Interfaces/IAction1.js";
import { DeviceSubStream } from "./DeviceSubStream.js";
import { IDeviceSubStream } from "../../Interfaces/IDeviceSubStream.js";

export class DeviceStream extends Stream implements IDeviceStream {
    get camera(): IDeviceSubStream {
        return this.video as DeviceSubStream;
    }
    get microphone(): IDeviceSubStream {
        return this.audio as DeviceSubStream;
    }
    play(args?: DevicePlayArgs) {
        let video = true;
        let audio = true;

        if (args) {
            if (args.audioSink || args.videoSink) {
                throw new Error("what do you want to me do with these sinks?");
            }
            if (!args.camera) {
                video = false;
            }
            if (!args.microphone) {
                audio = false;
            }
            if (args.audioOutputDeviceId) {
                this.microphone.deviceId = args.audioOutputDeviceId;
            }
            if (args.videoSinkElementId) {
                throw new Error("Late binding to videoElementId is not currently supported. Please provide this when you join");
            }
        }
        if (video && this.video) {
            this.video.enable();
        }
        if (audio && this.audio) {
            this.audio.enable();
        }
    };
    // dont need fm sources ... will in source in substream
    constructor(isMine: boolean, onStateChange:IAction1<StreamState>, camera?: DeviceSubStream, microphone?: DeviceSubStream) {
        super(isMine, onStateChange, StreamType.Device, camera, microphone);
    }
}