import { SubStream } from "./SubStream.js";
import { IDeviceSubStream } from "../../Interfaces/IDeviceSubStream.js";
import { SubStreamType } from "../../Interfaces/SubStreamType.js";
import { ISink } from "../../Interfaces/ISink.js";
import { ISource } from "../../Interfaces/ISource.js";
import { IAction1 } from "../../Interfaces/IAction1.js";
export declare class DeviceSubStream extends SubStream implements IDeviceSubStream {
    source?: ISource;
    sink?: ISink;
    get deviceId(): string;
    set deviceId(newDeviceId: string);
    private _isSource;
    private _remoteMedia;
    constructor(id: string, enableSubStream: IAction1<boolean>, type: SubStreamType, sink?: ISink, source?: ISource, isSource?: boolean, remoteMedia?: fm.liveswitch.RemoteMedia);
}
