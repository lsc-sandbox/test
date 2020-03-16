import { IDevice } from "../../Interfaces/IDevice.js";
import { DeviceType } from "../../Interfaces/DeviceType.js";
import { IAction1 } from "../../Interfaces/IAction1.js";
import { SharedObjects } from "./SharedObjects.js";

export class Device implements IDevice {
    id: string;
    name: string;
    deviceType: DeviceType;
    start(): void {
        //if (this.deviceType == DeviceType.Camera) {
        //    SharedObjects.Instance().StartCameraDevice(this.fmSourceInput);
        //} else if (this.deviceType == DeviceType.Microphone) {
        //    SharedObjects.Instance().StartAudioDevice(this.fmSourceInput);
        //} else if (this.deviceType == DeviceType.Screen) {
        //    SharedObjects.Instance().StartScreenDevice(this.fmSourceInput);
        //}
    }
    stop(): void {
        // this state need to presist.
        //if (this.deviceType == DeviceType.Camera) {
        //    SharedObjects.Instance().StopCameraDevice(this.fmSourceInput);
        //} else if (this.deviceType == DeviceType.Microphone) {
        //    SharedObjects.Instance().StopAudioDevice(this.fmSourceInput);
        //} else if (this.deviceType == DeviceType.Screen) {
        //    SharedObjects.Instance().StopScreenDevice(this.fmSourceInput);
        //}
    }
    fmSourceInput?: fm.liveswitch.SourceInput; // needs to definded maybe in another class with start and stop being overriden.
    constructor(id: string, name: string, deviceType: DeviceType, fmSourceInput?: fm.liveswitch.SourceInput) {
        this.id = id;
        this.name = name;
        this.deviceType = deviceType;
        // need to know the input device? yes
        // also need to know the mediaType? 
        this.fmSourceInput = fmSourceInput;
    }
    isNew: boolean;
    isStarted: boolean;
    isStopped: boolean;
    isPluggedIn: boolean;
    onUnplugged: IAction1<IDevice>;
    onPluggedIn: IAction1<IDevice>;
}