export interface IDeviceManager {
    getMediaDevices(): Promise<IDeviceInfo[]>;
    getAudioDevices(): Promise<IDeviceInfo[]>;
    getAudioInputDevices(): Promise<IDeviceInfo[]>;
    getAudioOutputDevices(): Promise<IDeviceInfo[]>;
    getVideoDevices(): Promise<IDeviceInfo[]>;
}
export interface IDeviceInfo {
    deviceId?: string;
    groupId?: string;
    kind?: DeviceKind;
    label?: string;
}
export declare enum DeviceKind {
    VideoInput = 1,
    AudioInput = 2,
    AudioOutput = 3
}
