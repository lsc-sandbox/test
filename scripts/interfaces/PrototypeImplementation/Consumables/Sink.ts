import { ISink } from "../../Interfaces/ISink.js";
import { IDevice } from "../../Interfaces/IDevice.js";
import { DeviceType } from "../../Interfaces/DeviceType.js";
import { Device } from "./Device.js";
import { SharedObjects } from "./SharedObjects.js";
import { IAction0 } from "../../Interfaces/IAction0.js";

export class Sink implements ISink {
    sinkDevice: IDevice;
    mute(): void {
        this.muteSink();
    };
    unmute() : void {
        this.unMuteSink();
    };
    private muteSink: IAction0;
    private unMuteSink: IAction0;
    constructor(deviceType: DeviceType, mute: IAction0, unMute: IAction0) {
        let device = new Device(fm.liveswitch.Guid.newGuid().toString(), deviceType.toString(), deviceType);
        this.sinkDevice = device;
        this.muteSink = mute;
        this.unMuteSink = unMute;
        // now need to something about start/stop.... make sense if 
    }

}