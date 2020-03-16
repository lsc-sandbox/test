import { ISource } from "../../Interfaces/ISource.js";
import { SwitchDevicePolicy } from "../../Interfaces/ISource.js";
import { IDevice } from "../../Interfaces/IDevice.js";
import { IAction2 } from "../../Interfaces/IAction2.js";
import { IAction3 } from "../../Interfaces/IAction3.js";

export class Source implements ISource {
    constructor(sourceDevice: IDevice, autoPreview?: boolean) {
        this._sourceDevice = sourceDevice;
        if (autoPreview) {
            this.autopreview = autoPreview;
        }
    }
    id: string;
    isMuted?: boolean;
    switchDevicePolicy?: SwitchDevicePolicy;
    onSourceDeviceUnplugged?: IAction2<ISource, IDevice>;
    onSourceDevicePluggedIn?: IAction2<ISource, IDevice>;
    onSourceDeviceChanged?: IAction3<ISource, IDevice, IDevice>;
    switchDeviceOnUnplugPolicy: SwitchDevicePolicy;
    private _autopreview: boolean = true;
    public set autopreview (autopreview: boolean) {
        this._autopreview = autopreview;
    }
    public get autopreview (): boolean {
        return this._autopreview;
    }
    //Gets or sets the source media device for this source.
    private _sourceDevice: IDevice;
    public set sourceDevice(sourceDevice: IDevice) {
        this._sourceDevice = sourceDevice;
        // enable this source
    }
    public get sourceDevice(): IDevice {
        return this._sourceDevice;
    }
    preview(element?: any): void {
        throw new Error("Method not implemented.");
    }
    protected _isSourceStarted = false;
    start(): void {
        this.sourceDevice.start();
        this._isSourceStarted = true;
        throw new Error("Method not implemented.");
    }
    stop(): void {
        this.sourceDevice.stop();
        this._isSourceStarted = false;
        throw new Error("Method not implemented.");
    }
    mute(file?: any): void {
        //if (this.sinkDevice.deviceType == DeviceType.Camera) {
        //    SharedObjects.Instance().muteCamera();
        //}
        //if (this.sinkDevice.deviceType == DeviceType.Microphone) {
        //    SharedObjects.Instance().muteMicrophone();
        //}
        //if (this.sinkDevice.deviceType == DeviceType.Screen) {
        //    SharedObjects.Instance().muteScreen();
        //}
        throw new Error("Method not implemented.");
    }
    unmute(): void {
        throw new Error("Method not implemented.");
    }

    
}