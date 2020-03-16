
import { IDeviceManager, DeviceKind, IDeviceInfo } from "../../Interfaces/IDeviceManager.js";

export class DeviceManager implements IDeviceManager {
    getMediaDevices(): Promise<IDeviceInfo[]> {
        let promise: Promise<IDeviceInfo[]> = new Promise((resolve, reject) => {
            let devices = new Array<IDeviceInfo>();
            this.getAudioDevices().then((audioDevices) => {
                audioDevices.forEach((audioDevice) => {
                    devices.push(audioDevice);
                });
                this.getVideoDevices().then((videoDevices) => {
                    videoDevices.forEach((videoDevice) => {
                        devices.push(videoDevice);
                    });
                    resolve(devices);
                });
            });
        });
        return promise;
    }
    getAudioDevices(): Promise<IDeviceInfo[]> {
        let promise: Promise<IDeviceInfo[]> = new Promise((resolve, reject) => {
            let devices = new Array<IDeviceInfo>();
            this.getAudioInputDevices().then((audioinputDevices) => {
                audioinputDevices.forEach((audioinputDevice) => {
                    devices.push(audioinputDevice);
                });
                this.getAudioOutputDevices().then((audioOutputDevices) => {
                    audioOutputDevices.forEach((output) => {
                        devices.push(output);
                    });
                    resolve(devices);
                });
            });
        });
        return promise;
    }
    getVideoDevices(): Promise<IDeviceInfo[]> {
        let promise: Promise<IDeviceInfo[]> = new Promise((resolve, reject) => {
            let devices = new Array<IDeviceInfo>();
            this.getVideoInputDevices().then((videoinputDevices) => {
                videoinputDevices.forEach((videoinputDevice) => {
                    devices.push(videoinputDevice);
                });
                resolve(devices);
            });
        });
        return promise;
    }                         

    getVideoInputDevices(): Promise<IDeviceInfo[]> {
        let promise: Promise<DeviceInfo[]> = new Promise((resolve, reject) => {
            let devices = new Array<DeviceInfo>();
            let localmedia = new fm.liveswitch.LocalMedia(false, true);
            localmedia?.getVideoSourceInputs().then((inputs) => {
                inputs.forEach((input) => {
                    let device = new DeviceInfo(input.getId(), input.getName(), DeviceKind.VideoInput);
                    devices.push(device);
                });
                resolve(devices);
            }).fail((ex) => {
                reject(ex);
            });
        });
        return promise;
    }

    getAudioInputDevices(): Promise<IDeviceInfo[]> {
        let promise: Promise<DeviceInfo[]> = new Promise((resolve, reject) => {
            let devices = new Array<DeviceInfo>();
            let localmedia = new fm.liveswitch.LocalMedia(true, false);
            localmedia?.getAudioSourceInputs().then((inputs) => {
                inputs.forEach((input) => {
                    let device = new DeviceInfo(input.getId(), input.getName(), DeviceKind.AudioInput);
                    devices.push(device);
                });
                resolve(devices);
            }).fail((ex) => {
                reject(ex);
            });
        });
        return promise;
    }

    getAudioOutputDevices(): Promise<IDeviceInfo[]> {
        let promise: Promise<DeviceInfo[]> = new Promise((resolve, reject) => {
            let devices = new Array<DeviceInfo>();
            let remoteMedia = new fm.liveswitch.RemoteMedia;
            remoteMedia.getAudioSinkOutputs().then((audioOutputs) => {
                audioOutputs.forEach((audioOutput) => {
                    let device = new DeviceInfo(audioOutput.getId(), audioOutput.getName(), DeviceKind.AudioOutput);
                    devices.push(device);
                });
                resolve(devices);
            }).fail((ex)=>{
                reject(ex);
            });
        });
        return promise;
    }
}

export class DeviceInfo implements IDeviceInfo {
    private _deviceId: string = null;
    private _groupId: string = null;
    private _kind: DeviceKind  = null;
    private _label: string = null;
    get deviceId(): string {
        return this._deviceId;
    }
    get groupId(): string {
        return this._groupId;
    } 
    get kind(): DeviceKind {
        return this._kind; 
    }
    get label(): string {
        return this._label;
    }
    constructor(deviceId: string, label: string, kind: DeviceKind, groupId?: string) {
        this._deviceId = deviceId;
        this._label = label;
        this._kind = kind;
        this._groupId = groupId;
    }
}