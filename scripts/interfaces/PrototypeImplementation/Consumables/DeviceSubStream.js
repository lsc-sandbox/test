import { SubStream } from "./SubStream.js";
import { SubStreamType } from "../../Interfaces/SubStreamType.js";
import { SharedObjects } from "./SharedObjects.js";
export class DeviceSubStream extends SubStream {
    constructor(id, enableSubStream, type, sink, source, isSource, remoteMedia) {
        super(id, enableSubStream, type);
        this._isSource = false;
        this._remoteMedia = null;
        if (isSource) {
            this._isSource = isSource;
        }
        if (remoteMedia) {
            this._remoteMedia = remoteMedia;
        }
        this.source = source;
        this.sink = sink;
    }
    get deviceId() {
        //if (this.source && this.source.sourceDevice) {
        //    return this.source.sourceDevice.id;
        //}
        //return null;
        if (this._isSource) {
            if (this.substreamType == SubStreamType.Video) {
                return SharedObjects.Instance().GetCameraVideoDevice();
            }
            else if (this.substreamType == SubStreamType.Audio) {
                return SharedObjects.Instance().GetCameraAudioDevice();
            }
        }
        else {
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
    set deviceId(newDeviceId) {
        if (this._isSource) {
            if (this.substreamType == SubStreamType.Video) {
                SharedObjects.Instance().switchToCameraVideoDevice(newDeviceId);
            }
            else if (this.substreamType == SubStreamType.Audio) {
                SharedObjects.Instance().switchToCameraAudioDevice(newDeviceId);
            }
        }
        else {
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
}
