import { IDeviceStream } from "../../Interfaces/IDeviceStream.js";
import { Stream } from "./Stream.js";
import { DevicePlayArgs } from "./DevicePlayArgs.js";
import { StreamState } from "../../Interfaces/IStream.js";
import { IAction1 } from "../../Interfaces/IAction1.js";
import { DeviceSubStream } from "./DeviceSubStream.js";
import { IDeviceSubStream } from "../../Interfaces/IDeviceSubStream.js";
export declare class DeviceStream extends Stream implements IDeviceStream {
    get camera(): IDeviceSubStream;
    get microphone(): IDeviceSubStream;
    play(args?: DevicePlayArgs): void;
    constructor(isMine: boolean, onStateChange: IAction1<StreamState>, camera?: DeviceSubStream, microphone?: DeviceSubStream);
}
