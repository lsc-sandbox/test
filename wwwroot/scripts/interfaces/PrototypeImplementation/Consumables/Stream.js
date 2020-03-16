export class Stream {
    constructor(isMine, onStateChange, streamType, video, audio) {
        this._isMine = false;
        this._id = fm.liveswitch.Guid.newGuid().toString();
        this._tag = "Not populated";
        // need another thing in the constructor for sinks
        var me = this;
        me._isMine = isMine;
        onStateChange = (state) => {
            if (me.onstatechange) {
                me.onstatechange(me, state);
            }
        };
        this.streamType = streamType;
        this.audio = audio;
        this.video = video;
    }
    start() {
        this.video.enable();
        this.audio.enable();
    }
    stop() {
        this.video.disable();
        this.audio.disable();
    }
    get audioSink() {
        //if (this.audio && this.audio.sink) {
        //    return this.audio.sink;
        //}
        return null;
    }
    get videoSink() {
        //if (this.video && this.video.sink) {
        //    return this.video.sink;
        //}
        return null;
    }
    get audioSource() {
        //if (this.audio && this.audio.source) {
        //    return this.audio.source;
        //}
        return null;
    }
    get audioSourceDeviceId() {
        //if (this.audio && this.audio.sourceDeviceId) {
        //    return this.audio.sourceDeviceId;
        //}
        return null;
    }
    get videoSource() {
        //if (this.video && this.video.source) {
        //    return this.video.source;
        //}
        return null;
    }
    get videoSourceDeviceId() {
        //if (this.video && this.video.sourceDeviceId) {
        //    return this.video.sourceDeviceId;
        //}
        return null;
    }
    get isMine() {
        //if (this.video.source || this.audio.source) {
        //    return true;
        //}
        //return false;
        return this._isMine;
    }
    get id() {
        return this.id;
    }
    get tag() {
        return this._tag;
    }
    set tag(tag) {
        this.tag = tag;
    }
    connected() {
        throw new Error("Method not implemented.");
    }
    disconnected() {
        throw new Error("Method not implemented.");
    }
    play(args) {
        let video = true;
        let audio = true;
        if (args) {
            if (args.audioSink || args.videoSink) {
                throw new Error("Sink not used in TypeScript/Javascript");
            }
        }
        if (video && this.video) {
            this.video.enable();
        }
        if (audio && this.audio) {
            this.audio.enable();
        }
    }
}
