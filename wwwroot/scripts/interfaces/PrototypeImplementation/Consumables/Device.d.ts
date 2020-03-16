import { IDevice } from "../../Interfaces/IDevice.js";
import { DeviceType } from "../../Interfaces/DeviceType.js";
import { IAction1 } from "../../Interfaces/IAction1.js";
export declare class Device implements IDevice {
    id: string;
    name: string;
    deviceType: DeviceType;
    start(): void;
    stop(): void;
    fmSourceInput?: fm.liveswitch.SourceInput;
    constructor(id: string, name: string, deviceType: DeviceType, fmSourceInput?: fm.liveswitch.SourceInput);
    isNew: boolean;
    isStarted: boolean;
    isStopped: boolean;
    isPluggedIn: boolean;
    onUnplugged: IAction1<IDevice>;
    onPluggedIn: IAction1<IDevice>;
}
