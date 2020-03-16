import { DeviceType } from "./DeviceType";
import { IAction1 } from "./IAction1";
export interface IDevice {
    id: string;
    name: string;
    deviceType: DeviceType;
    start(): void;
    stop(): void;
    isNew: boolean;
    isStarted: boolean;
    isStopped: boolean;
    isPluggedIn: boolean;
    onUnplugged: IAction1<IDevice>;
    onPluggedIn: IAction1<IDevice>;
}
export declare enum DeviceState {
    New = 1,
    Started = 2,
    Stopped = 3
}
