export class Source {
    constructor(sourceDevice, autoPreview) {
        this._autopreview = true;
        this._isSourceStarted = false;
        this._sourceDevice = sourceDevice;
        if (autoPreview) {
            this.autopreview = autoPreview;
        }
    }
    set autopreview(autopreview) {
        this._autopreview = autopreview;
    }
    get autopreview() {
        return this._autopreview;
    }
    set sourceDevice(sourceDevice) {
        this._sourceDevice = sourceDevice;
        // enable this source
    }
    get sourceDevice() {
        return this._sourceDevice;
    }
    preview(element) {
        throw new Error("Method not implemented.");
    }
    start() {
        this.sourceDevice.start();
        this._isSourceStarted = true;
        throw new Error("Method not implemented.");
    }
    stop() {
        this.sourceDevice.stop();
        this._isSourceStarted = false;
        throw new Error("Method not implemented.");
    }
    mute(file) {
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
    unmute() {
        throw new Error("Method not implemented.");
    }
}
