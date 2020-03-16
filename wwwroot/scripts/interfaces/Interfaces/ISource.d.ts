import { IDevice } from "./IDevice";
import { IAction2 } from "./IAction2";
import { IAction3 } from "./IAction3";
export interface ISource {
    id: string;
    autopreview: boolean;
    sourceDevice: IDevice;
    preview(element?: any): void;
    start(): void;
    stop(): void;
    mute(file?: any): void;
    unmute(): void;
    isMuted?: boolean;
    onSourceDeviceUnplugged?: IAction2<ISource, IDevice>;
    onSourceDevicePluggedIn?: IAction2<ISource, IDevice>;
    onSourceDeviceChanged?: IAction3<ISource, IDevice, IDevice>;
    switchDevicePolicy?: SwitchDevicePolicy;
}
export declare enum SwitchDevicePolicy {
    DontSwitch = 1,
    SwitchAndSwitchBack = 2,
    SwitchAndDontSwitchBack = 3
}
