import { DeviceKind } from "../../Interfaces/IDeviceManager.js";
export class DeviceManager {
    getMediaDevices() {
        let promise = new Promise((resolve, reject) => {
            let devices = new Array();
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
    getAudioDevices() {
        let promise = new Promise((resolve, reject) => {
            let devices = new Array();
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
    getVideoDevices() {
        let promise = new Promise((resolve, reject) => {
            let devices = new Array();
            this.getVideoInputDevices().then((videoinputDevices) => {
                videoinputDevices.forEach((videoinputDevice) => {
                    devices.push(videoinputDevice);
                });
                resolve(devices);
            });
        });
        return promise;
    }
    getVideoInputDevices() {
        let promise = new Promise((resolve, reject) => {
            let devices = new Array();
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
    getAudioInputDevices() {
        let promise = new Promise((resolve, reject) => {
            let devices = new Array();
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
    getAudioOutputDevices() {
        let promise = new Promise((resolve, reject) => {
            let devices = new Array();
            let remoteMedia = new fm.liveswitch.RemoteMedia;
            remoteMedia.getAudioSinkOutputs().then((audioOutputs) => {
                audioOutputs.forEach((audioOutput) => {
                    let device = new DeviceInfo(audioOutput.getId(), audioOutput.getName(), DeviceKind.AudioOutput);
                    devices.push(device);
                });
                resolve(devices);
            }).fail((ex) => {
                reject(ex);
            });
        });
        return promise;
    }
}
export class DeviceInfo {
    constructor(deviceId, label, kind, groupId) {
        this._deviceId = null;
        this._groupId = null;
        this._kind = null;
        this._label = null;
        this._deviceId = deviceId;
        this._label = label;
        this._kind = kind;
        this._groupId = groupId;
    }
    get deviceId() {
        return this._deviceId;
    }
    get groupId() {
        return this._groupId;
    }
    get kind() {
        return this._kind;
    }
    get label() {
        return this._label;
    }
}
