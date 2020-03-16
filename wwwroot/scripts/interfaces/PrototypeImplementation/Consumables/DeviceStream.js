import { Stream } from "./Stream.js";
import { StreamType } from "../../Interfaces/StreamType.js";
export class DeviceStream extends Stream {
    get camera() {
        return this.video;
    }
    get microphone() {
        return this.audio;
    }
    play(args) {
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
    }
    ;
    // dont need fm sources ... will in source in substream
    constructor(isMine, onStateChange, camera, microphone) {
        super(isMine, onStateChange, StreamType.Device, camera, microphone);
    }
}
