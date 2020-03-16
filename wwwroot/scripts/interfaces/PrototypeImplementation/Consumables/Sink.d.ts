import { ISink } from "../../Interfaces/ISink.js";
import { IDevice } from "../../Interfaces/IDevice.js";
import { DeviceType } from "../../Interfaces/DeviceType.js";
import { IAction0 } from "../../Interfaces/IAction0.js";
export declare class Sink implements ISink {
    sinkDevice: IDevice;
    mute(): void;
    unmute(): void;
    private muteSink;
    private unMuteSink;
    constructor(deviceType: DeviceType, mute: IAction0, unMute: IAction0);
}
