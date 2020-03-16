import { Stream } from "./Stream.js";
import { IScreenStream } from "../../Interfaces/IScreenStream.js";
import { ISubStream } from "../../Interfaces/ISubStream.js";
import { IScreenPlayArgs } from "../../Interfaces/ISession.js";
import { DeviceType } from "../../Interfaces/DeviceType.js";
import { SubStream } from "./SubStream.js";
import { StreamState } from "../../Interfaces/IStream.js";
import { IAction1 } from "../../Interfaces/IAction1.js";
import { StreamType } from "../../Interfaces/StreamType.js";
import { IDisplaySubStream } from "../../Interfaces/IScreenSubStream.js";

export class ScreenStream extends Stream implements IScreenStream {
    get display(): IDisplaySubStream 
    {
        if (this.displays.length == 0) {
            return null;
        }
        return this.displays[0];
    }
    displays?: IDisplaySubStream[] = new Array<IDisplaySubStream>();
    get systemAudio(): ISubStream
    {
        if (this.displays.length == 0) {
            return null;
        }
        return this.displays[0];
    }
    systemAudios?: ISubStream[] = new Array<SubStream>();
    play(args?: IScreenPlayArgs): void {
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
    constructor(isMine: boolean, onStateChange: IAction1<StreamState>, screenVideo?: SubStream, systemAudio?: SubStream) {
        super(isMine, onStateChange, StreamType.Device, screenVideo, systemAudio);
    }
}