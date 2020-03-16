export class Device {
    constructor(id, name, deviceType, fmSourceInput) {
        this.id = id;
        this.name = name;
        this.deviceType = deviceType;
        // need to know the input device? yes
        // also need to know the mediaType? 
        this.fmSourceInput = fmSourceInput;
    }
    start() {
        //if (this.deviceType == DeviceType.Camera) {
        //    SharedObjects.Instance().StartCameraDevice(this.fmSourceInput);
        //} else if (this.deviceType == DeviceType.Microphone) {
        //    SharedObjects.Instance().StartAudioDevice(this.fmSourceInput);
        //} else if (this.deviceType == DeviceType.Screen) {
        //    SharedObjects.Instance().StartScreenDevice(this.fmSourceInput);
        //}
    }
    stop() {
        // this state need to presist.
        //if (this.deviceType == DeviceType.Camera) {
        //    SharedObjects.Instance().StopCameraDevice(this.fmSourceInput);
        //} else if (this.deviceType == DeviceType.Microphone) {
        //    SharedObjects.Instance().StopAudioDevice(this.fmSourceInput);
        //} else if (this.deviceType == DeviceType.Screen) {
        //    SharedObjects.Instance().StopScreenDevice(this.fmSourceInput);
        //}
    }
}
