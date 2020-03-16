import { ISource } from "../../Interfaces/ISource.js";
import { SwitchDevicePolicy } from "../../Interfaces/ISource.js";
import { IDevice } from "../../Interfaces/IDevice.js";
import { IAction2 } from "../../Interfaces/IAction2.js";
import { IAction3 } from "../../Interfaces/IAction3.js";
export declare class Source implements ISource {
    constructor(sourceDevice: IDevice, autoPreview?: boolean);
    id: string;
    isMuted?: boolean;
    switchDevicePolicy?: SwitchDevicePolicy;
    onSourceDeviceUnplugged?: IAction2<ISource, IDevice>;
    onSourceDevicePluggedIn?: IAction2<ISource, IDevice>;
    onSourceDeviceChanged?: IAction3<ISource, IDevice, IDevice>;
    switchDeviceOnUnplugPolicy: SwitchDevicePolicy;
    private _autopreview;
    set autopreview(autopreview: boolean);
    get autopreview(): boolean;
    private _sourceDevice;
    set sourceDevice(sourceDevice: IDevice);
    get sourceDevice(): IDevice;
    preview(element?: any): void;
    protected _isSourceStarted: boolean;
    start(): void;
    stop(): void;
    mute(file?: any): void;
    unmute(): void;
}
