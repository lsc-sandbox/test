import { Device } from "./Device.js";
export class Sink {
    constructor(deviceType, mute, unMute) {
        let device = new Device(fm.liveswitch.Guid.newGuid().toString(), deviceType.toString(), deviceType);
        this.sinkDevice = device;
        this.muteSink = mute;
        this.unMuteSink = unMute;
        // now need to something about start/stop.... make sense if 
    }
    mute() {
        this.muteSink();
    }
    ;
    unmute() {
        this.unMuteSink();
    }
    ;
}
