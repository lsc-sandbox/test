import { Stream } from "./Stream.js";
import { StreamType } from "../../Interfaces/StreamType.js";
export class ScreenStream extends Stream {
    constructor(isMine, onStateChange, screenVideo, systemAudio) {
        super(isMine, onStateChange, StreamType.Device, screenVideo, systemAudio);
        this.displays = new Array();
        this.systemAudios = new Array();
    }
    get display() {
        if (this.displays.length == 0) {
            return null;
        }
        return this.displays[0];
    }
    get systemAudio() {
        if (this.displays.length == 0) {
            return null;
        }
        return this.displays[0];
    }
    play(args) {
        let haveSystemAudio = true;
        if (args) {
            if (args.systemAudio) {
                haveSystemAudio = args.systemAudio;
            }
            // ignore the other args for now?
        }
        this.displays.forEach((thisDisplay) => {
            //if (thisDisplay.sink.sinkDevice.id == args.videoSink.sinkDevice.id) {
            thisDisplay.play();
        });
        if (haveSystemAudio) {
            this.systemAudios.forEach((thisSystemAudio) => {
                thisSystemAudio.play();
            });
        }
    }
}
