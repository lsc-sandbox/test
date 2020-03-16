export class PlayArgs {
    constructor(audioSink, videoSink) {
        this.audioSink = audioSink;
        this.videoSink = videoSink;
    }
}
export class DevicePlayArgs extends PlayArgs {
    constructor(microphone, camera, audioOutputDeviceId, videoSinkElementId, audioSink, videoSink) {
        super(audioSink, videoSink);
        this.audioOutputDeviceId = audioOutputDeviceId;
        this.videoSinkElementId = videoSinkElementId;
        this.microphone = microphone;
        this.camera = camera;
    }
}
