import { SubStream } from "./SubStream.js";
import { IDeviceSubStream } from "../../Interfaces/IDeviceSubStream.js";
import { SubStreamType } from "../../Interfaces/SubStreamType.js";
import { ISink } from "../../Interfaces/ISink.js";
import { ISource } from "../../Interfaces/ISource.js";
import { IAction1 } from "../../Interfaces/IAction1.js";
import { SharedObjects } from "./SharedObjects.js";
import { StreamType } from "../../Interfaces/StreamType.js";

export class DeviceSubStream extends SubStream implements IDeviceSubStream
{
    //Gets or sets the sink for this substream.
    source?: ISource;
    sink?: ISink;
    get deviceId(): string {
        //if (this.source && this.source.sourceDevice) {
        //    return this.source.sourceDevice.id;
        //}
        //return null;
        if (this._isSource) {
            if (this.substreamType == SubStreamType.Video) {
                return SharedObjects.Instance().GetCameraVideoDevice();
            } else if (this.substreamType == SubStreamType.Audio) {
                return SharedObjects.Instance().GetCameraAudioDevice();
            }
        } else {
            // get audio sink id if can.
        }
        //else if (this._streamType == StreamType.Screen) {
        //    if (this.substreamType == SubStreamType.Video) {
        //        return SharedObjects.Instance().GetScreenVideoDevice();
        //    } else if (this.substreamType == SubStreamType.Audio) {
        //        // only one system audio.
        //    }
        //}
        return null;
    }
    set deviceId(newDeviceId: string) {
        if (this._isSource) {
            if (this.substreamType == SubStreamType.Video) {
                SharedObjects.Instance().switchToCameraVideoDevice(newDeviceId);
            } else if (this.substreamType == SubStreamType.Audio) {
                SharedObjects.Instance().switchToCameraAudioDevice(newDeviceId);
            }
        } else {
            if (this._remoteMedia) {
                if (this.substreamType == SubStreamType.Audio) {
                    this._remoteMedia.changeAudioSinkOutput(new fm.liveswitch.SinkOutput(newDeviceId, ""));
                }
            }
        }
        //else if (this._streamType == StreamType.Screen) {
        //    if (this.substreamType == SubStreamType.Video) {
        //        SharedObjects.Instance().switchToScreenVideoDevice(newDeviceId);
        //    } else if (this.substreamType == SubStreamType.Audio) {
        //        // only one system audio.
        //    }
        //}
        // implementThis

    }
    private _isSource: boolean = false;
    private _remoteMedia: fm.liveswitch.RemoteMedia = null;
    constructor(id: string, enableSubStream: IAction1<boolean>, type: SubStreamType, sink?: ISink, source?: ISource, isSource?: boolean, remoteMedia?: fm.liveswitch.RemoteMedia) {
        super(id, enableSubStream, type);
        if (isSource) {
            this._isSource = isSource;
        }
        if (remoteMedia) {
            this._remoteMedia = remoteMedia;
        }
        this.source = source;
        this.sink = sink;
    }
}