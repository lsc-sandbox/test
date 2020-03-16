import { IDeviceManager, DeviceKind, IDeviceInfo } from "../../Interfaces/IDeviceManager.js";
export declare class DeviceManager implements IDeviceManager {
    getMediaDevices(): Promise<IDeviceInfo[]>;
    getAudioDevices(): Promise<IDeviceInfo[]>;
    getVideoDevices(): Promise<IDeviceInfo[]>;
    getVideoInputDevices(): Promise<IDeviceInfo[]>;
    getAudioInputDevices(): Promise<IDeviceInfo[]>;
    getAudioOutputDevices(): Promise<IDeviceInfo[]>;
}
export declare class DeviceInfo implements IDeviceInfo {
    private _deviceId;
    private _groupId;
    private _kind;
    private _label;
    get deviceId(): string;
    get groupId(): string;
    get kind(): DeviceKind;
    get label(): string;
    constructor(deviceId: string, label: string, kind: DeviceKind, groupId?: string);
}
