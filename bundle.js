var SessionState;
(function (SessionState) {
    SessionState[SessionState["New"] = 0] = "New";
    SessionState[SessionState["Connecting"] = 1] = "Connecting";
    SessionState[SessionState["Connected"] = 2] = "Connected";
    SessionState[SessionState["Terminated"] = 3] = "Terminated";
})(SessionState || (SessionState = {}));

class Source {
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

// import liveswitch from 'fm.liveswitch';
// import LiveSwitch from 'fm.liveswitch/fm.liveswitch';
// let LiveSwitch = require('fm.liveswitch');
// import 'fm.liveswitch/fm.liveswitch';
class CameraSource extends Source {
    constructor(sourceDevice, autoPreview) {
        super(sourceDevice, autoPreview);
        //private localmedia: fm.liveswitch.LocalMedia;
        this._layoutManager = null;
        //this.localmedia = localMedia;
    }
    updateLayout(layoutManager) {
        this._layoutManager = layoutManager;
    }
    // local media should have been started with this CameraSource and then set localmedia's view to layout
    preview(element) {
        //let localmedia = SharedObjects.Instance().cameraLocalMedia;
        //if (element instanceof preview) {
        //    var myElement = element as preview;
        //    localmedia?.changeVideoSourceInput(new fm.liveswitch.SourceInput(this.sourceDevice.id, this.sourceDevice.name)).then(() => {
        //        if (!SharedObjects.Instance().islocalmediastarted && !this._isSourceStarted) {
        //            localmedia?.start();
        //        } if (localmedia) {
        //            myElement.layoutManager.setLocalView(localmedia.getView());
        //        }
        //    });
        //myElement. ?.setLocalView((view));
        //}
        // switch to this element
    }
}

var ClientState;
(function (ClientState) {
    ClientState[ClientState["New"] = 1] = "New";
    ClientState[ClientState["Connecting"] = 2] = "Connecting";
    ClientState[ClientState["Connected"] = 3] = "Connected";
    ClientState[ClientState["Disconnected"] = 4] = "Disconnected";
})(ClientState || (ClientState = {}));

class EntryPoint {
    constructor() {
        fm.liveswitch.Log.registerProvider(new fm.liveswitch.ConsoleLogProvider(fm.liveswitch.LogLevel.Debug));
    }
    static Instance() {
        if (typeof EntryPoint._Instance == "undefined") {
            EntryPoint._Instance = new EntryPoint();
        }
        return EntryPoint._Instance;
    }
}
function LogDebug(logMessage) {
    fm.liveswitch.Log.debug(logMessage);
}

class DefaultConfig {
    constructor() {
        this.DefaultAppId = "my-app-id";
        this.DefaultGatewayUrl = "https://demo.liveswitch.fm:8443/sync";
        this.DefaultSharedSecret = "--replaceThisWithYourOwnSharedSecret--";
        this.DefaultChannel = "YouWillNeverFindMe";
        this.DefaultDevice = "Device";
        this.DefaultUserId = "User";
        this.ClientId = "ClientId";
        // Make Sure Entrypoint Exists.. this stupid.. fix it later
        EntryPoint.Instance();
        this.DefaultChannels = new Array();
        for (let i = 0; i < 10; i++) {
            this.DefaultChannels[i] = "conference/" + Math.floor(Math.random() * 9999999).toString();
            LogDebug("Pre-generated conference Id: " + this.DefaultChannels[i]);
        }
        fm.liveswitch.Log.debug("DefaultConfig class is created ");
    }
    static Instance() {
        if (typeof DefaultConfig._Instance == "undefined") {
            DefaultConfig._Instance = new DefaultConfig();
        }
        return DefaultConfig._Instance;
    }
}

var DeviceType;
(function (DeviceType) {
    DeviceType[DeviceType["Camera"] = 1] = "Camera";
    DeviceType[DeviceType["Microphone"] = 2] = "Microphone";
    DeviceType[DeviceType["Screen"] = 3] = "Screen";
    DeviceType[DeviceType["Speaker"] = 4] = "Speaker";
    DeviceType[DeviceType["Headphones"] = 5] = "Headphones";
})(DeviceType || (DeviceType = {}));

var StreamState;
(function (StreamState) {
    StreamState[StreamState["New"] = 1] = "New";
    StreamState[StreamState["Connected"] = 2] = "Connected";
    StreamState[StreamState["Disconnected"] = 3] = "Disconnected";
})(StreamState || (StreamState = {}));

var SubStreamType;
(function (SubStreamType) {
    SubStreamType[SubStreamType["Audio"] = 0] = "Audio";
    SubStreamType[SubStreamType["Video"] = 1] = "Video";
    SubStreamType[SubStreamType["Data"] = 2] = "Data";
})(SubStreamType || (SubStreamType = {}));

class CentralConnections {
    constructor() {
        /// don't know if I will need this 
        //private sfuUpstreamConnections = new Map<string, fm.liveswitch.SfuUpstreamConnection>();
        //clientId, connectionInfo
        //need to update the remoteClientInfo on update.
        this.remoteConnectionInfoForCamera = new Map();
        this.remoteConnectionInfoForScreen = new Map();
    }
    // Singleton
    static Instance() {
        if (typeof CentralConnections._Instance == "undefined") {
            CentralConnections._Instance = new CentralConnections();
        }
        return CentralConnections._Instance;
    }
}
/*        let updateConnection = (enableVideo: boolean, enableAudio: boolean) => {
            let connectionConfig = connection.getConfig();
            if (enableAudio) {
                connectionConfig.setAudioDirection(me._Direction(fm.liveswitch.StreamDirection.ReceiveOnly));
            }
            else {
                connectionConfig.setAudioDirection(me._Direction(fm.liveswitch.StreamDirection.Inactive));
            }
            let layoutHasRemoteView = false;
            for (let id in SharedObjects.Instance().getLayoutManager(this).getRemoteViewIds()) {
                if (id == remoteMedia.getId()) {
                    layoutHasRemoteView = true;
                }
            }
            if (enableVideo) {
                if (CentralConnections.Instance().remoteConnectionInfoForCamera.get(remoteConnectionInfo.getClientId()).getHasVideo()) {
                    connectionConfig.setVideoDirection(me._Direction(fm.liveswitch.StreamDirection.ReceiveOnly));
                    if (!layoutHasRemoteView) {
                        SharedObjects.Instance().getLayoutManager(this).addRemoteView(remoteMedia.getId(), remoteMedia.getView());
                    }
                }
            }
            else {
                if (layoutHasRemoteView) {
                    SharedObjects.Instance().getLayoutManager(this).removeRemoteView(remoteMedia.getId());
                }
                connectionConfig.setVideoDirection(me._Direction(fm.liveswitch.StreamDirection.Inactive));
            }
            connection.update(connectionConfig);

            ////let connectioninfo = connection.getInfo();
            ////let videoAlreadyon = connectioninfo.getHasVideo();
            ////connectioninfo.getVideoStream().getDirection();
            ////let audioAlreadyon = connectioninfo.getHasAudio();
            //let updateRequired = false;
            //let createVideo = false;
            //let destroyVideo = false;
            //let createAudio = false;
            //let destroyAudio = false;

            //if (enableVideo && !videoAlreadyon) {
            //    createVideo = true;
            //}
            //if (!enableVideo && videoAlreadyon) {
            //    destroyVideo = true;
            //}
            //if (enableAudio && !audioAlreadyon) {
            //    createAudio = true;
            //}
            //if (!enableAudio && audioAlreadyon) {
            //    destroyAudio = true;
            //}
            //if (createVideo || destroyVideo || createAudio || destroyAudio) {
            //    updateRequired = true;
            //}
            //remoteMedia;
            //let newAudioStream: fm.liveswitch.AudioStream = null
            //let newVideoStream: fm.liveswitch.VideoStream = null;
            //if (destroyVideo || destroyVideo) {
            //    remoteMedia.destroy();
            //    remoteMedia = null;
            //    remoteMedia = new fm.liveswitch.RemoteMedia();
            //}
            //if (createVideo) {
            //    newVideoStream = new fm.liveswitch.VideoStream(remoteMedia);
            //}
            //if (createAudio) {
            //    newAudioStream = new fm.liveswitch.AudioStream(remoteMedia);
            //}

            //connectioninfo.setAudioStream(newAudioStream.getInfo());
            //connectioninfo.setVideoStream(newVideoStream.getInfo());
            //connection.updateConnection(connection.getInfo(), connectioninfo);
            //SharedObjects.Instance().getLayoutManager(this).addRemoteView(remoteMedia.getId(), remoteMedia.getView());
        //SharedObjects.Instance().getLayoutManager(this).removeRemoteView(remoteMedia.getId());
        };*/

class Stream {
    constructor(isMine, onStateChange, streamType, video, audio) {
        this._isMine = false;
        this._id = fm.liveswitch.Guid.newGuid().toString();
        this._tag = "Not populated";
        // need another thing in the constructor for sinks
        var me = this;
        me._isMine = isMine;
        this.streamType = streamType;
        this.audio = audio;
        this.video = video;
    }
    start() {
        if (this.video) {
            this.video.enable();
        }
        if (this.audio) {
            this.audio.enable();
        }
    }
    stop() {
        if (this.video) {
            this.video.disable();
        }
        if (this.audio) {
            this.audio.disable();
        }
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
        if (args) {
            if (args.audioSink || args.videoSink) {
                throw new Error("Sink not used in TypeScript/Javascript");
            }
        }
        if ( this.video) {
            this.video.enable();
        }
        if ( this.audio) {
            this.audio.enable();
        }
    }
}

var StreamType;
(function (StreamType) {
    StreamType[StreamType["Device"] = 0] = "Device";
    StreamType[StreamType["File"] = 1] = "File";
    StreamType[StreamType["Screen"] = 2] = "Screen";
})(StreamType || (StreamType = {}));

class DeviceStream extends Stream {
    get camera() {
        return this.video;
    }
    get microphone() {
        return this.audio;
    }
    play(args) {
        let video = true;
        let audio = true;
        if (args) {
            if (args.audioSink || args.videoSink) {
                throw new Error("what do you want to me do with these sinks?");
            }
            if (!args.camera) {
                video = false;
            }
            if (!args.microphone) {
                audio = false;
            }
            if (args.audioOutputDeviceId) {
                this.microphone.deviceId = args.audioOutputDeviceId;
            }
            if (args.videoSinkElementId) {
                throw new Error("Late binding to videoElementId is not currently supported. Please provide this when you join");
            }
        }
        if (video && this.video) {
            this.video.enable();
        }
        if (audio && this.audio) {
            this.audio.enable();
        }
    }
    ;
    // dont need fm sources ... will in source in substream
    constructor(isMine, onStateChange, camera, microphone) {
        super(isMine, onStateChange, StreamType.Device, camera, microphone);
    }
}

class Participant {
    constructor(id, isMe) {
        this.id = fm.liveswitch.Guid.newGuid().toString();
        this.isMe = false;
        this.screenStreams = new Array();
        this.deviceStreams = new Array();
        if (id) {
            this.id = id;
        }
        if (isMe) {
            this.isMe = isMe;
        }
    }
    get screenStream() {
        if (this.screenStreams.length == 0) {
            return null;
        }
        return this.screenStreams[0];
    }
    get deviceStream() {
        if (this.deviceStreams.length == 0) {
            return null;
        }
        return this.deviceStreams[0];
    }
    // Don't need this I think
    //private isInvolvedWithYourStreaming = true;
    //get isInvolvedWithYou(): boolean {
    //    return this.isInvolvedWithYourStreaming;
    //}
    //set isInvolvedWithYou(boolean: boolean) {
    //    this.isInvolvedWithYourStreaming = boolean;
    //}
    // don't worry about the following
    get fileStream() {
        return null;
    }
    get fileStreams() {
        return null;
    }
}

class ScreenStream extends Stream {
    constructor(isMine, onStateChange, screenVideo, systemAudio) {
        super(isMine, onStateChange, StreamType.Device, screenVideo, systemAudio);
        this.displays = new Array();
        this.systemAudios = new Array();
    }
    get display() {
        if (this.displays.length == 0) {
            return null;
        }
        return this.displays[0];
    }
    get systemAudio() {
        if (this.displays.length == 0) {
            return null;
        }
        return this.displays[0];
    }
    play(args) {
        let haveSystemAudio = true;
        if (args) {
            if (args.systemAudio) {
                haveSystemAudio = args.systemAudio;
            }
            // ignore the other args for now?
        }
        this.displays.forEach((thisDisplay) => {
            //if (thisDisplay.sink.sinkDevice.id == args.videoSink.sinkDevice.id) {
            thisDisplay.play();
        });
        if (haveSystemAudio) {
            this.systemAudios.forEach((thisSystemAudio) => {
                thisSystemAudio.play();
            });
        }
    }
}

var SendState;
(function (SendState) {
    SendState[SendState["New"] = 1] = "New";
    SendState[SendState["Sent"] = 2] = "Sent";
    SendState[SendState["Delivered"] = 3] = "Delivered";
    SendState[SendState["Viewed"] = 4] = "Viewed";
})(SendState || (SendState = {}));

class SendStatus {
    constructor() {
        this.state = SendState.New; // need to come back to this
        this.deliveredToParticipants = Array(); // need to come back to this
        this.viewedByParticipants = Array(); // need to come back to this
    }
}

var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class SharedObjects {
    constructor() {
        // need to be made private
        this.cameraLocalMedia = null;
        this.screenLocalMedia = null;
        // have one audio stream with camera and none with screen
        this._isLocalMediaStarted = false;
        this._localCameraAudio = false;
        this._localCameraVideo = false;
        this._localScreenVideo = false;
        this._localScreenAudio = false;
        // Need to disable localmedia with all session have left.
        // Create a new layout for each session....
        //private _Sessions: { [id: string]: ISession }= {};
        this._Sessions = new Map();
        this._SessionLayouts = new Map();
        this.cameraResolved = false;
        this.screenResolved = false;
        //this.videoContainer = videoContainer;
        //this.layoutManager = new fm.liveswitch.DomLayoutManager(videoContainer);
    }
    GetCameraVideoDevice() {
        var _a, _b;
        if (this.cameraLocalMedia && ((_a = this.cameraLocalMedia) === null || _a === void 0 ? void 0 : _a.getVideoInput())) {
            return (_b = this.cameraLocalMedia) === null || _b === void 0 ? void 0 : _b.getVideoInput().getId();
        }
        return null;
    }
    GetScreenVideoDevice() {
        var _a, _b;
        if (this.screenLocalMedia && ((_a = this.screenLocalMedia) === null || _a === void 0 ? void 0 : _a.getVideoInput())) {
            return (_b = this.cameraLocalMedia) === null || _b === void 0 ? void 0 : _b.getVideoInput().getId();
        }
        return null;
    }
    GetCameraAudioDevice() {
        var _a, _b;
        if (this.cameraLocalMedia && ((_a = this.cameraLocalMedia) === null || _a === void 0 ? void 0 : _a.getAudioInput())) {
            return (_b = this.cameraLocalMedia) === null || _b === void 0 ? void 0 : _b.getAudioInput().getId();
        }
        return null;
    }
    switchToScreenVideoDevice(newDeviceId) {
        this.screenLocalMedia.changeVideoSourceInput(new fm.liveswitch.SourceInput(newDeviceId, ""));
    }
    switchToCameraAudioDevice(newDeviceId) {
        this.cameraLocalMedia.changeAudioSourceInput(new fm.liveswitch.SourceInput(newDeviceId, ""));
    }
    switchToCameraVideoDevice(newDeviceId) {
        this.cameraLocalMedia.changeVideoSourceInput(new fm.liveswitch.SourceInput(newDeviceId, ""));
    }
    // use _localAudio to if you need audio... as audio will only be a connection with camera.
    get _needAudio() {
        return this._localScreenAudio || this._localCameraAudio;
    }
    //private _screenShare: boolean = false;
    //get islocalmediastarted(): boolean {
    //    // this.localMedia?.
    //    return false;
    //}
    //get localVideo(): boolean {
    //    return this._localCameraVideo;
    //}
    //get localAudio(): boolean {
    //    return this._localCameraAudio;
    //}
    //set localVideo(on: boolean) {
    //    this._localCameraVideo = on;
    //    this.cameraLocalMedia?.stop();
    //    if (this.cameraLocalMedia) {
    //        this.startLocalMedia();
    //    }
    //}
    //set localAudio(on: boolean) {
    //    this._localCameraVideo = on;
    //    this.cameraLocalMedia?.stop();
    //    if (this.cameraLocalMedia) {
    //        this.startLocalMedia();
    //    }
    //}
    // don't need this now
    StopCamera() {
        // need to do for IStream
    }
    // don't need this now
    StopScreen() {
        // need to do for IStream
    }
    //public getLayoutManager(): fm.liveswitch.DomLayoutManager {
    //    return this.layoutManager;
    //}
    //public setVideoContrainer(videoContainer: HTMLElement): void {
    //    this.videoContainer = videoContainer;
    //    this.layoutManager?.removeRemoteViews();
    //    this.layoutManager?.unsetLocalView();
    //    this.layoutManager = new fm.liveswitch.DomLayoutManager(videoContainer);
    //}
    //private layoutManager!: fm.liveswitch.DomLayoutManager | null;  /// need to fill this in
    static Instance() {
        if (typeof SharedObjects._Instance == "undefined") {
            SharedObjects._Instance = new SharedObjects();
        }
        return SharedObjects._Instance;
    }
    onSessionUpdate() {
        return this.updateLocaLMedias();
    }
    // screenAudio will be ignored
    //public createScreenStream(session: ISession, screenVideo: boolean, screenAudio?: boolean) {
    //    if (!this._Sessions.has(session.id)) {
    //        throw new Error("Trying to create Session without calling onSessionJoin");
    //    }
    //    if (!this._localScreenVideo && screenVideo) {
    //        this._localScreenAudio = true;
    //    }
    //    if (!this._localScreenAudio && screenAudio) {
    //        this._localScreenAudio = true;
    //    }
    //    //update
    //}
    createScreenStream(session, screenVideo, screenAudio, container) {
        if (!container) {
            if (!this._Sessions.has(session.id)) {
                throw new Error("Call onSessionJoin first");
            }
        }
        else {
            this._Sessions.set(session.id, session);
            this._SessionLayouts.set(session.id, new fm.liveswitch.DomLayoutManager(container));
        }
        var me = this;
        // start camera local media if required
        // start screen local media if required
        //return promise;
        let promise = new Promise((resolve, reject) => {
            me.updateLocaLMedias(undefined, undefined, screenVideo, screenAudio).then(() => {
                resolve(me.screenLocalMedia);
            }).catch((ex) => {
                reject(ex);
            });
        });
        return promise;
    }
    createCameraStream(session, container, cameraVideo, cameraAudio) {
        if (!container) {
            if (!this._Sessions.has(session.id)) ;
        }
        else {
            this._Sessions.set(session.id, session);
            if (container) {
                this._SessionLayouts.set(session.id, new fm.liveswitch.DomLayoutManager(container));
            }
        }
        var me = this;
        // start camera local media if required
        // start screen local media if required
        //return promise;
        let promise = new Promise((resolve, reject) => {
            me.updateLocaLMedias(cameraVideo, cameraAudio).then(() => {
                resolve(me.cameraLocalMedia);
            }).catch((ex) => {
                reject(ex);
            });
        });
        return promise;
    }
    onSessionLeave(session) {
        var me = this;
        if (this._Sessions.has(session.id)) {
            this.removeLocalLayouts(this._SessionLayouts.get(session.id)).then(() => {
                me._SessionLayouts.delete(session.id);
            });
            this._Sessions.delete(session.id);
        }
        return me.updateLocaLMedias(false, false, false, false);
    }
    updateLocaLMedias(needCameraVideo, needCameraAudio, needScreenVideo, needScreenAudio) {
        let updateRequiredToScreenMedia = false;
        let updateRequiredToCameraMedia = false;
        if (needCameraVideo != this._localCameraVideo && (typeof needCameraVideo != "undefined" && typeof needCameraAudio != "undefined")) {
            updateRequiredToCameraMedia = true;
            this._localCameraVideo = needCameraVideo;
        }
        if (needScreenVideo != this._localScreenVideo && (typeof needScreenVideo != "undefined" && typeof needScreenAudio != "undefined")) {
            updateRequiredToScreenMedia = true;
            this._localScreenVideo = needScreenVideo;
        }
        if (needCameraAudio != this._needAudio && (typeof needCameraVideo != "undefined" && typeof needCameraAudio != "undefined")) {
            updateRequiredToCameraMedia = true; // camera media contains audio
        }
        this._localCameraAudio = needCameraAudio;
        this._localScreenAudio = needScreenAudio;
        // Do updates
        let promise = new Promise((resolve, reject) => {
            var me = this;
            if (updateRequiredToCameraMedia) {
                me.stopCameraLocalMedia().then(() => {
                    if (needCameraVideo || needCameraAudio) {
                        me.startLocalCameraMedia().then(() => {
                            me.updatePromiseResolve(true, undefined).then(() => {
                                resolve();
                            });
                        });
                    }
                    else {
                        me.updatePromiseResolve(true, undefined).then(() => {
                            resolve();
                        });
                    }
                });
            }
            else {
                me.updatePromiseResolve(true, undefined).then(() => {
                    resolve();
                });
            }
            if (updateRequiredToScreenMedia) {
                me.stopScreenLocalMedia().then(() => {
                    if (needScreenVideo) {
                        me.startLocalScreenMedia().then(() => {
                            me.updatePromiseResolve(undefined, true).then(() => {
                                resolve();
                            });
                        });
                    }
                    else {
                        me.updatePromiseResolve(undefined, true).then(() => {
                            resolve();
                        });
                    }
                });
            }
            else {
                me.updatePromiseResolve(undefined, true).then(() => {
                    resolve();
                });
            }
        });
        return promise;
    }
    updatePromiseResolve(cameraPromise, screenPromise) {
        var me = this;
        if (cameraPromise) {
            me.cameraResolved = cameraPromise;
        }
        if (screenPromise) {
            me.screenResolved = screenPromise;
        }
        let promise = new Promise((resolve, reject) => {
            if (me.cameraResolved && me.screenResolved) {
                me.cameraResolved = false;
                me.screenResolved = false;
                resolve();
            }
        });
        return promise;
    }
    getLayoutManagerBySessionId(sessionId) {
        if (this._SessionLayouts.has(sessionId)) {
            return this._SessionLayouts.get(sessionId);
        }
        return null;
    }
    getLayoutManagerBySession(seesion) {
        return this.getLayoutManagerBySessionId(seesion.id);
    }
    removeLocalLayouts(layout) {
        let promise = new Promise((resolve, reject) => {
            if (layout != null) {
                layout === null || layout === void 0 ? void 0 : layout.removeRemoteViews();
                layout === null || layout === void 0 ? void 0 : layout.unsetLocalView();
                layout = null;
            }
            resolve();
        });
        return promise;
    }
    stopScreenLocalMedia() {
        var me = this;
        let promise = new Promise((resolve, reject) => {
            if (me.screenLocalMedia != null) {
                me.screenLocalMedia.stop().then((o) => {
                    //me.screenLocalMedia?.destroy();
                    //me.screenLocalMedia = null;
                    resolve();
                });
            }
            else {
                resolve();
            }
        });
        return promise;
    }
    stopCameraLocalMedia() {
        var me = this;
        let promise = new Promise((resolve, reject) => {
            if (me.cameraLocalMedia != null) {
                me.cameraLocalMedia.stop().then((o) => {
                    //me.cameraLocalMedia?.destroy();
                    //me.cameraLocalMedia = null;
                    resolve();
                });
            }
            else {
                resolve();
            }
        });
        return promise;
    }
    startLocalScreenMedia() {
        var me = this;
        let promise = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            //await this.wait(0);
            if (me.screenLocalMedia != null) {
                throw new Error("Local media has already been Started");
            }
            // assume we want audio and video // forget about simulcast
            var pluginConfig = new fm.liveswitch.PluginConfig();
            //pluginConfig.setActiveXPath("./FM.LiveSwitch.ActiveX.cab"); // ignore IE for now
            if (!fm.liveswitch.Plugin.isReady(true)) {
                // Check if this browser is supported without local media.
                if (fm.liveswitch.Plugin.isReady()) {
                    throw new Error('This browser supports WebRTC, but does not support media capture.\nTry receive-only mode!');
                }
                else {
                    throw new Error('This browser does not support WebRTC, and no plugin could be found.'); // if IE likely
                }
            }
            if (!me.screenLocalMedia) {
                me.screenLocalMedia = new fm.liveswitch.LocalMedia(false, me._localScreenVideo, true);
            }
            me.screenLocalMedia.start().then((o) => {
                var _a, _b;
                for (let session of me._Sessions.values()) {
                    //session.screenStreams.forEach((ss) => {
                    //    if (ss.video.isEnabled) {
                    //        addTolayout = true;
                    //    }
                    //})
                    {
                        (_a = me._SessionLayouts.get(session.id)) === null || _a === void 0 ? void 0 : _a.unsetLocalView();
                        (_b = me._SessionLayouts.get(session.id)) === null || _b === void 0 ? void 0 : _b.setLocalView(o.getView());
                    }
                }
            }).fail((ex) => {
                // Dont worth about fail for screenshare
                //me.screenLocalMedia.getVideoSourceInputs().then((v) => {
                //    if (v != null && v[1] != null) {
                //        me.screenLocalMedia.setVideoSourceInput(v[1]);
                //        me.screenLocalMedia.start().then((o) => {
                //            if (me.layoutManager != null) {
                //                me.layoutManager.setLocalView(o.getView());
                //            }
                //        });
                //    }
                //    else {
                console.log(ex.name + ": " + ex.message);
                //        }
                //    });
            });
            resolve();
        }));
        return promise;
    }
    startLocalCameraMedia() {
        var me = this;
        let promise = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            //await this.wait(0);
            //if (me.cameraLocalMedia != null) {
            //    throw new Error("Local media has already been Started");
            //}
            // assume we want audio and video // forget about simulcast
            var pluginConfig = new fm.liveswitch.PluginConfig();
            //pluginConfig.setActiveXPath("./FM.LiveSwitch.ActiveX.cab"); // ignore IE for now
            if (!fm.liveswitch.Plugin.isReady(true)) {
                // Check if this browser is supported without local media.
                if (fm.liveswitch.Plugin.isReady()) {
                    throw new Error('This browser supports WebRTC, but does not support media capture.\nTry receive-only mode!');
                }
                else {
                    throw new Error('This browser does not support WebRTC, and no plugin could be found.'); // if IE likely
                }
            }
            if (!me.cameraLocalMedia) {
                me.cameraLocalMedia = new fm.liveswitch.LocalMedia(me._needAudio, me._localCameraVideo, false);
            }
            me.cameraLocalMedia.start().then((o) => {
                var _a, _b;
                for (let session of me._Sessions.values()) {
                    //session.deviceStreams.forEach((ss) => {
                    //    if (ss.video.isEnabled) {
                    //        addTolayout = true;
                    //    }
                    //})
                    {
                        (_a = me._SessionLayouts.get(session.id)) === null || _a === void 0 ? void 0 : _a.unsetLocalView();
                        (_b = me._SessionLayouts.get(session.id)) === null || _b === void 0 ? void 0 : _b.setLocalView(o.getView());
                    }
                }
            }).fail((ex) => {
                // let fail condition alone for now
                //me.cameraLocalMedia.getVideoSourceInputs().then((v) => {
                //    if (v != null && v[1] != null) {
                //        me.cameraLocalMedia.setVideoSourceInput(v[1]);
                //        me.cameraLocalMedia.getAudioInputs().then((a) => {
                //            if (a != null && a[1] != null) {
                //                me.cameraLocalMedia.setAudioSourceInput(a[1]);
                //                me.cameraLocalMedia.start().then((o) => {
                //                    if (me.layoutManager != null) {
                //                        me.layoutManager.setLocalView(o.getView());
                //                    }
                //                });
                //            }
                //            else {
                console.log(ex.name + ": " + ex.message);
                //        }
                //    });
                //}
                //else {
                //    console.log(ex.name + ": " + ex.message);
                //}
                //});
            });
            resolve();
        }));
        return promise;
    }
}

class Device {
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

class Sink {
    constructor(deviceType, mute, unMute) {
        let device = new Device(fm.liveswitch.Guid.newGuid().toString(), deviceType.toString(), deviceType);
        this.sinkDevice = device;
        this.muteSink = mute;
        this.unMuteSink = unMute;
        // now need to something about start/stop.... make sense if 
    }
    mute() {
        this.muteSink();
    }
    ;
    unmute() {
        this.unMuteSink();
    }
    ;
}

var SubStreamState;
(function (SubStreamState) {
    SubStreamState[SubStreamState["New"] = 1] = "New";
    SubStreamState[SubStreamState["Enabled"] = 2] = "Enabled";
    SubStreamState[SubStreamState["Disabled"] = 3] = "Disabled";
})(SubStreamState || (SubStreamState = {}));

class SubStream {
    // Either a Incoming Stream.. or outgoing stream
    // need to populate either sinks or sources
    // its one or the other
    constructor(id, enableSubStream, type, sink) {
        this.isEnabled = true;
        this._id = id;
        this.substreamType = type;
        this._enableSubStream = enableSubStream;
        // can substream without a sink or source
        //this._sink = sink;
    }
    set id(id) {
        this._id = id;
    }
    get id() {
        return this._id;
    }
    set tag(tag) {
        this._tag = tag;
    }
    get tag() {
        return this._tag;
    }
    enable() {
        if (this.isDisabled) {
            this.isEnabled = true;
            this._enableSubStream(true);
        }
    }
    disable() {
        if (this.isEnabled) {
            this.isEnabled = false;
            this._enableSubStream(false);
        }
    }
    play(sink) {
        if (sink) {
            throw new Error("What do you you want me do with this sink?");
        }
        this.enable();
        // there is no way for them to know sinks currently
        // play to sink if enabled?
        // is this same thing as enable?
        // are there multiple sinks?
    }
    get isNew() {
        if (this.state == SubStreamState.New) {
            return true;
        }
        return false;
    }
    get isDisabled() {
        return !this.isEnabled;
    }
    set isDisabled(disable) {
        this.isEnabled = !disable;
    }
    enabled() {
        var me = this;
        let promise = new Promise((resolve, reject) => {
            if (me.isEnabled) {
                resolve(me);
            }
            else {
                reject(me);
            }
        });
        return promise;
    }
    disabled() {
        var me = this;
        let promise = new Promise((resolve, reject) => {
            if (me.isDisabled) {
                resolve(me);
            }
            else {
                reject(me);
            }
        });
        return promise;
    }
}

class DeviceSubStream extends SubStream {
    constructor(id, enableSubStream, type, sink, source, isSource, remoteMedia) {
        super(id, enableSubStream, type);
        this._isSource = false;
        this._remoteMedia = null;
        if (isSource) {
            this._isSource = isSource;
        }
        if (remoteMedia) {
            this._remoteMedia = remoteMedia;
        }
        this.source = source;
        this.sink = sink;
    }
    get deviceId() {
        //if (this.source && this.source.sourceDevice) {
        //    return this.source.sourceDevice.id;
        //}
        //return null;
        if (this._isSource) {
            if (this.substreamType == SubStreamType.Video) {
                return SharedObjects.Instance().GetCameraVideoDevice();
            }
            else if (this.substreamType == SubStreamType.Audio) {
                return SharedObjects.Instance().GetCameraAudioDevice();
            }
        }
        //else if (this._streamType == StreamType.Screen) {
        //    if (this.substreamType == SubStreamType.Video) {
        //        return SharedObjects.Instance().GetScreenVideoDevice();
        //    } else if (this.substreamType == SubStreamType.Audio) {
        //        // only one system audio.
        //    }
        //}
        return null;
    }
    set deviceId(newDeviceId) {
        if (this._isSource) {
            if (this.substreamType == SubStreamType.Video) {
                SharedObjects.Instance().switchToCameraVideoDevice(newDeviceId);
            }
            else if (this.substreamType == SubStreamType.Audio) {
                SharedObjects.Instance().switchToCameraAudioDevice(newDeviceId);
            }
        }
        else {
            if (this._remoteMedia) {
                if (this.substreamType == SubStreamType.Audio) {
                    this._remoteMedia.changeAudioSinkOutput(new fm.liveswitch.SinkOutput(newDeviceId, ""));
                }
            }
        }
        //else if (this._streamType == StreamType.Screen) {
        //    if (this.substreamType == SubStreamType.Video) {
        //        SharedObjects.Instance().switchToScreenVideoDevice(newDeviceId);
        //    } else if (this.substreamType == SubStreamType.Audio) {
        //        // only one system audio.
        //    }
        //}
        // implementThis
    }
}

var SourceDisplaySurfaceType;
(function (SourceDisplaySurfaceType) {
    //https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackSettings/displaySurface
    SourceDisplaySurfaceType[SourceDisplaySurfaceType["Application"] = 1] = "Application";
    SourceDisplaySurfaceType[SourceDisplaySurfaceType["Browser"] = 2] = "Browser";
    SourceDisplaySurfaceType[SourceDisplaySurfaceType["Monitor"] = 3] = "Monitor";
    SourceDisplaySurfaceType[SourceDisplaySurfaceType["Window"] = 4] = "Window";
})(SourceDisplaySurfaceType || (SourceDisplaySurfaceType = {}));

class DisplaySubStream extends SubStream {
    get sourceDisplaySurface() {
        return SourceDisplaySurfaceType.Monitor;
    }
    set sourceDisplaySurface(SourceDisplaySurfaceType) {
        // later
    }
    constructor(id, enableSubStream, type, sink) {
        super(id, enableSubStream, type);
    }
}

var __awaiter$1 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//namespace ls is fm.liveswitch;
class Session {
    //private videoContainer: HTMLElement | null = null;
    constructor(channel, liveSwitchClient, notifyLeave, args, videoContainer) {
        this.state = SessionState.New;
        this.sendMessage = (args) => {
            var _a;
            if (this.canSendMessages) {
                let sendStatus = new SendStatus(); // need to get the whole participants things sorted out.
                let future = (_a = this.messageDataChannel) === null || _a === void 0 ? void 0 : _a.sendDataString(args.stringMessage);
                future === null || future === void 0 ? void 0 : future.then((result) => {
                    if (args === null || args === void 0 ? void 0 : args.onSent) {
                        args === null || args === void 0 ? void 0 : args.onSent(args);
                    }
                }).fail((ex) => {
                    if (args === null || args === void 0 ? void 0 : args.onFailed) {
                        args === null || args === void 0 ? void 0 : args.onFailed(args, new Error(ex.name + ": " + ex.message));
                    }
                });
                return sendStatus;
            }
            return new SendStatus();
        };
        this.autoplayDeviceCameraStreams = true;
        this.autoplayDeviceMicrophoneStreams = true;
        this.autoplayStreams = true;
        // Need to do
        this.participants = new Array(); // in Progress
        this.autoplayScreenDisplayStreams = true;
        this.defaultConfig = DefaultConfig.Instance();
        // private _invitation?: fm.liveswitch.ChannelInvitation;
        this.gotInvitation = false;
        this.sfuUpstreamConnection = {};
        //private sfuUpstreamConnectionsForCamera: { [id: string]: fm.liveswitch.SfuUpstreamConnection } = {};
        //private sfuUpstreamConnectionsForScreen: { [id: string]: fm.liveswitch.SfuUpstreamConnection } = {};
        this.sfuDownstreamConnections = {};
        this.dataChannelConnection = null;
        this.canSendMessages = false;
        //invite(peerId: string): IInvite {
        //    let responseFuture = this.liveSwitchChannel.invite(peerId, "");
        //    var invite = new Invite();
        //    responseFuture.then((invitation) => {
        //        invite.addInvitation(invitation);
        //    }).fail((ex) => {
        //        console.log(ex.name + ": " + ex.message);
        //    });
        //    return invite;
        //}
        //accept(arg?: any): any {
        //    if (arguments.length == 0) {
        //        return this.acceptWithAll();
        //    }
        //    else if (arguments.length == 1) { //Device ID
        //        return this.acceptWithSpecifc(arguments[0])
        //    }
        //    else if (arguments.length > 2) {
        //        let sourceTypes = new Array<SourceType>();
        //        //let sourceTypes: Array<SourceType> = Array.prototype.slice.call(arguments);
        //        for (let i = 0; i < arguments.length; i++) {
        //            if (arguments[i] instanceof Array) {
        //                for (let j = 0; j < arguments[i].length; j++) {
        //                    sourceTypes.push(arguments[i][j]);
        //                }
        //            }
        //            else {
        //                sourceTypes.push(arguments[i]);
        //            }
        //        }
        //        return this.acceptionWithMultiple(sourceTypes);
        //    }
        //};
        //private acceptWithAll = (): IStream[] => {
        //    throw new Error("Hi");
        //};
        //private acceptWithSpecifc = (sourceType: SourceType): IStream => {
        //    throw new Error("Hi");
        //};
        //private acceptionWithMultiple = (sourceTypes: SourceType[]): IStream[] => {
        //    throw new Error("Hi");
        //};
        //reject(arg?: any): any {
        //    if (arguments.length == 0) {
        //        return this.rejectWithNoReason();
        //    } else if (arguments.length == 1) {
        //        return this.rejectWithReason(arguments[0]);
        //    }
        //};
        //private rejectWithNoReason() {}
        //private rejectWithReason(reason: SessionInviteRejectReason) {}
        this.upstreamState = SessionState.New;
        this.downstreamState = SessionState.New;
        // Not doing
        this.autoplayScreenSystemAudioStreams = true;
        // constructor(channel: string, liveSwitchClient: fm.liveswitch.Client, notifyLeave: IAction0, args: IJoinConferenceArgs, videoContainer?: HTMLElement, invitation?: fm.liveswitch.ChannelInvitation) {
        this.notifyLeave = notifyLeave;
        this.participants.push(new Participant(liveSwitchClient.getId(), true));
        LogDebug("Session constructor was called");
        var me = this;
        this._LiveSwitchClient = liveSwitchClient;
        if (videoContainer) {
            this._videoContainer = videoContainer;
        }
        //if (invitation) {
        //    me._invitation = invitation;
        //    me.gotInvitation = true;
        //    me.needLocalVideo = false;
        //    me.needLocalAudio = false;
        //    me.acceptWithSpecifc = (sourceType: SourceType) => {
        //        let remoteStream!: Stream;// = new RemoteStream();
        //        if (sourceType == SourceType.Microphone) {
        //            remoteStream = (new Stream(DeviceType.Microphone, ""));
        //            me.needLocalAudio = true;
        //        }
        //        else if (sourceType == SourceType.Camera || sourceType == SourceType.Screen) {
        //            remoteStream = (new Stream(DeviceType.Camera, ""));
        //            me.needLocalVideo = true;
        //        }
        //        me.OnClientJoinInAChannel(me._invitation?.accept().getResult());
        //        return remoteStream;
        //    };
        //    me.acceptWithAll = () => {
        //        let remoteStreams = new Array<Stream>();
        //        remoteStreams.push(new Stream(DeviceType.Camera, ""));
        //        remoteStreams.push(new Stream(DeviceType.Microphone, ""));
        //        me.needLocalAudio = true; me.enableRemoteAudio = true;
        //        me.OnClientJoinInAChannel(me._invitation?.accept().getResult());
        //        return remoteStreams;
        //    };
        //    me.acceptionWithMultiple = (SourceTypes: SourceType[]) => {
        //        let remoteStreams = new Array<Stream>();
        //        SourceTypes.forEach((source) => {
        //            if (source == SourceType.Microphone) {
        //                remoteStreams.push(new Stream(DeviceType.Microphone, ""));
        //                me.needLocalVideo = true;
        //            }
        //            else if (source == SourceType.Camera || source == SourceType.Screen) {
        //                remoteStreams.push(new Stream(DeviceType.Camera, ""));
        //                me.needLocalVideo = true;
        //            }
        //        });
        //        me.OnClientJoinInAChannel(me._invitation?.accept().getResult());
        //        return remoteStreams;
        //    }
        //    me.rejectWithNoReason = () => {
        //        me._invitation?.reject(); // this ojbect now does nothing
        //    }
        //    me.rejectWithReason = (reason: SessionInviteRejectReason) => {
        //        me._invitation?.reject(reason.toString()); // this ojbect now does nothing
        //    }
        //}
        //else {
        /// join a channel
        let channelClaim = new fm.liveswitch.ChannelClaim(channel);
        //channelClaim.setAction(fm.liveswitch.ClaimAction.Claim);
        let token = fm.liveswitch.Token.generateClientJoinToken(this.defaultConfig.DefaultAppId, this.defaultConfig.DefaultUserId, this.defaultConfig.DefaultDevice, this.defaultConfig.ClientId, channelClaim, this.defaultConfig.DefaultSharedSecret);
        this._LiveSwitchClient.join(channel, token).then((channel) => __awaiter$1(this, void 0, void 0, function* () {
            me.OnClientJoinAChannel(channel, args);
        })).fail((ex) => {
            throw ex;
        });
        //}
    }
    leave() {
        for (let connectionId in this.sfuDownstreamConnections) {
            let connection = this.sfuDownstreamConnections[connectionId];
            connection.close();
        }
        for (let connectionId in this.sfuUpstreamConnection) {
            let connection = this.sfuUpstreamConnection[connectionId];
            connection.close();
        }
        this.sfuDownstreamConnections = {};
        this.sfuUpstreamConnection = {};
        if (this.dataChannelConnection != null) {
            this.dataChannelConnection.close();
            this.dataChannelConnection = null;
        }
        //this.participants.forEach((particpant) => {
        //    particpant.deviceStreams.forEach(stream)
        //});
        SharedObjects.Instance().onSessionLeave(this);
        this.notifyLeave();
        // I guess this object is now useless, to create join this session, they have to back to the client.
    }
    get me() {
        let returnParticipant;
        this.participants.forEach((participant) => {
            if (participant.isMe) {
                returnParticipant = participant;
            }
        });
        if (returnParticipant) {
            return returnParticipant;
        }
        return null;
    }
    get screenStream() {
        if (this.screenStreams.length == 0) {
            return null;
        }
        return this.screenStreams[0];
    }
    get screenStreams() {
        let screens = new Array();
        this.participants.forEach((participant) => {
            participant.screenStreams.forEach((screen) => {
                screens.push(screen);
            });
        });
        return screens;
    }
    get deviceStream() {
        if (this.deviceStreams.length == 0) {
            return null;
        }
        return this.deviceStreams[0];
    }
    get deviceStreams() {
        let devices = new Array();
        this.participants.forEach((participant) => {
            participant.deviceStreams.forEach((device) => {
                devices.push(device);
            });
        });
        return devices;
    }
    //First
    startScreenStream(args) {
        var me = this;
        let promise = new Promise((resolve, reject) => {
            if (!me.me.screenStream) {
                SharedObjects.Instance().createScreenStream(me, true, false).then((localMedia) => {
                    me.openSfuUpstreamConnection(me.liveSwitchChannel, localMedia, true, true, false);
                    if (!me.me || !me.me.screenStream) {
                        reject();
                    }
                    else {
                        resolve(me.me.screenStream);
                    }
                });
            }
            else {
                if (me.me.screenStream) {
                    me.me.screenStream.start();
                }
                resolve(me.me.screenStream);
            }
        });
        return promise;
    }
    //2nd
    startDeviceStream(args) {
        var me = this;
        let promise = new Promise((resolve, reject) => {
            if (!me.me || !me.me.deviceStream) {
                SharedObjects.Instance().createCameraStream(me, null, true, true).then((localMedia) => {
                    me.openSfuUpstreamConnection(me.liveSwitchChannel, localMedia, true, true, true);
                    if (!me.me || !me.me.deviceStream) {
                        reject();
                    }
                    else {
                        resolve(me.me.deviceStream);
                    }
                });
            }
            if (args) {
                if (args.camera) {
                    me.me.deviceStream.camera.enable();
                }
                if (args.microphone) {
                    me.me.deviceStream.microphone.enable();
                }
            }
            else {
                me.me.deviceStream.start();
            }
            resolve(me.me.deviceStream);
        });
        return promise;
    }
    playStreams() { } // not implemented
    playScreenStreams(args) { } // not implemented
    playDeviceStreams(args) { } // not implemented
    hold() {
        throw new Error("Method not implemented.");
    }
    resume() {
        throw new Error("Method not implemented.");
    }
    //private sfuDownstreamConnectionsForScreen: fm.liveswitch.Hash<string, fm.liveswitch.SfuDownstreamConnection> = {};
    OnClientJoinAChannel(channel, args) {
        if (!channel) {
            return;
        }
        var me = this;
        me.id = channel.getId();
        this.liveSwitchChannel = channel;
        /// let open a datachannel on mcu
        // let leave messageing alone
        this.openMcuConnectionForDataChannel(channel);
        //if (this._videoContainer) {
        if (args.playLocalScreenshare) {
            SharedObjects.Instance().createScreenStream(this, true, false, this._videoContainer).then((localMedia) => {
                this.openSfuUpstreamConnection(channel, localMedia, true, args.playLocalScreenshare, false);
            });
        }
        if (args.playLocalMicrophone || args.playLocalCamera) {
            SharedObjects.Instance().createCameraStream(this, this._videoContainer, true, true).then((localMedia) => {
                this.openSfuUpstreamConnection(channel, localMedia, false, args.playLocalCamera, args.playLocalMicrophone);
            });
        }
        // channel.addOnRemoteClientJoin((client) => {
        channel.addOnRemoteUpstreamConnectionUpdate((connectioninfo) => {
            me.participants.forEach((participant) => {
                if (participant.id === connectioninfo.getClientId()) {
                    if (connectioninfo.getTag() == Session.cameraAndMircophoneConnectionTag) {
                        //Fix here: need to see what we updated before we replace the new connectionInfo
                        // not anymore
                        CentralConnections.Instance().remoteConnectionInfoForCamera.set(connectioninfo.getClientId(), connectioninfo);
                    }
                    if (connectioninfo.getTag() == Session.screenAndSystemAudioConnectionTag) {
                        //Fix here: need to see what we updated before we replace the new connectionInfo
                        CentralConnections.Instance().remoteConnectionInfoForScreen.set(connectioninfo.getClientId(), connectioninfo);
                    }
                }
            });
        });
        channel.addOnRemoteClientLeave((clientInfo) => {
            for (let i = 0; i < me.participants.length; i++) {
                let participant = me.participants[i];
                if (participant.id == clientInfo.getId()) {
                    delete me.participants[i];
                    CentralConnections.Instance().remoteConnectionInfoForScreen.delete(clientInfo.getId());
                    CentralConnections.Instance().remoteConnectionInfoForCamera.delete(clientInfo.getId());
                }
            }
        });
        channel.addOnRemoteUpstreamConnectionOpen((remoteConnectionInfo) => {
            let participantForThisConnectionInfo = null;
            let createPartipant = true;
            me.participants.forEach((participant) => {
                if (participant.id == remoteConnectionInfo.getClientId()) {
                    createPartipant = false;
                    participantForThisConnectionInfo = participant;
                }
            });
            if (createPartipant) {
                participantForThisConnectionInfo = new Participant(remoteConnectionInfo.getClientId(), false);
                me.participants.push(participantForThisConnectionInfo);
            }
            if (remoteConnectionInfo.getTag() == Session.cameraAndMircophoneConnectionTag) {
                CentralConnections.Instance().remoteConnectionInfoForCamera.set(remoteConnectionInfo.getClientId(), remoteConnectionInfo);
            }
            if (remoteConnectionInfo.getTag() == Session.screenAndSystemAudioConnectionTag) {
                CentralConnections.Instance().remoteConnectionInfoForScreen.set(remoteConnectionInfo.getClientId(), remoteConnectionInfo);
            }
            if (remoteConnectionInfo.getTag() == Session.cameraAndMircophoneConnectionTag) {
                me.openSfuDownstreamConnection(remoteConnectionInfo, channel, false, participantForThisConnectionInfo, args);
            }
            if (remoteConnectionInfo.getTag() == Session.screenAndSystemAudioConnectionTag) {
                me.openSfuDownstreamConnection(remoteConnectionInfo, channel, true, participantForThisConnectionInfo, args);
            }
        });
        // wont even have time to turn the autoplay for those in session so don't worty about it for now
        channel.getRemoteUpstreamConnectionInfos().forEach(function (remoteConnectionInfo) {
            let participantForThisConnectionInfo = null;
            let createPartipant = true;
            me.participants.forEach((participant) => {
                if (participant.id != remoteConnectionInfo.getId()) {
                    createPartipant = false;
                    participantForThisConnectionInfo = participant;
                }
            });
            if (createPartipant) {
                participantForThisConnectionInfo = new Participant(remoteConnectionInfo.getId(), false);
                me.participants.push(participantForThisConnectionInfo);
            }
            if (remoteConnectionInfo.getTag() == Session.cameraAndMircophoneConnectionTag) {
                CentralConnections.Instance().remoteConnectionInfoForCamera.set(remoteConnectionInfo.getClientId(), remoteConnectionInfo);
            }
            if (remoteConnectionInfo.getTag() == Session.screenAndSystemAudioConnectionTag) {
                CentralConnections.Instance().remoteConnectionInfoForScreen.set(remoteConnectionInfo.getClientId(), remoteConnectionInfo);
            }
            if (remoteConnectionInfo.getTag() == Session.cameraAndMircophoneConnectionTag) {
                me.openSfuDownstreamConnection(remoteConnectionInfo, channel, false, participantForThisConnectionInfo, args); // added downstream someone joins automatically
            }
            if (remoteConnectionInfo.getTag() == Session.screenAndSystemAudioConnectionTag) {
                me.openSfuDownstreamConnection(remoteConnectionInfo, channel, true, participantForThisConnectionInfo, args); // added downstream someone joins automatically
            }
        });
    }
    //    let messageDataStream
    openMcuConnectionForDataChannel(channel) {
        var me = this;
        me.messageDataChannel = new fm.liveswitch.DataChannel("fm.liveswitch.message", true, "Message"); // need for sending messages
        me.messageDataChannel.addOnStateChange((dataChannel) => {
            if (dataChannel.getState() == fm.liveswitch.DataChannelState.Connected) {
                me.canSendMessages = true;
            }
            else {
                me.canSendMessages = false;
            }
        });
        // can now receive messages
        let onReceive = (dataChannelReceiveArgs) => {
            if (dataChannelReceiveArgs.getDataString != null) {
                //onIncomingMessage: IAction2<ISession, IMessageArgs & IReceiveArgs>;
                if (me.onIncomingMessage != null) {
                    let result = {};
                    //let message: StringMessageArgs = new StringMessageArgs(dataChannelReceiveArgs.getDataString());
                    //let sender: ReceiveArgs = new ReceiveArgs(dataChannelReceiveArgs.getRemoteConnectionInfo().getUserAlias());
                    //(result as StringMessageArgs) = message;
                    //(result as ReceiveArgs) = sender;
                    result.stringMessage = dataChannelReceiveArgs.getDataString();
                    result.senderId = dataChannelReceiveArgs.getRemoteConnectionInfo().getUserAlias();
                    me.onIncomingMessage(this, result);
                }
            }
        };
        me.messageDataChannel.setOnReceive(onReceive);
        let dataStream = new fm.liveswitch.DataStream(me.messageDataChannel);
        let connection = channel.createMcuConnection(dataStream);
        this.dataChannelConnection = connection;
        connection.setDisableAutomaticIceServers(false);
        connection.addOnStateChange((something) => {
            if (something.getState() == fm.liveswitch.ConnectionState.Failed) {
                this.openMcuConnectionForDataChannel(channel);
            }
        });
        connection.open();
        // hopefully it was succesfull 
    }
    //wait = (ms: number) => new Promise(res => setTimeout(res, ms));
    //private async prepareLocalMedia(): Promise<void> {
    _Direction(streamDirection) {
        return fm.liveswitch.StreamDirectionHelper.directionToString(streamDirection);
    }
    openSfuDownstreamConnection(remoteConnectionInfo, channel, screenStream, participant, args) {
        var _a;
        let videoSink = null;
        let audioSink = null;
        var me = this;
        let remoteMedia = new fm.liveswitch.RemoteMedia();
        //if (screenStream) {
        //    CentralConnections.Instance().remoteStreamsForScreen.set(remoteConnectionInfo.getClientId(), remoteMedia);
        //}
        //else {
        //    CentralConnections.Instance().remoteStreamsForCamera.set(remoteConnectionInfo.getClientId(), remoteMedia);
        //}
        if (remoteMedia.getView()) {
            remoteMedia.getView().id = 'remoteView_' + remoteMedia.getId();
        }
        let connection;
        let audioStream;
        let videoStream;
        let audioDeviceType = DeviceType.Microphone;
        if (screenStream) {
            // this doesn't make sense
            audioDeviceType = DeviceType.Microphone;
        }
        audioStream = new fm.liveswitch.AudioStream(remoteMedia);
        // not sure if made a mistake here
        //audioStream.changeDirection(fm.liveswitch.StreamDirection.Inactive);
        if (!screenStream && args.streamRemoteMicrophone) {
            audioStream.setLocalDirection(fm.liveswitch.StreamDirection.ReceiveOnly);
        }
        audioSink = new Sink(audioDeviceType, () => {
            if (remoteMedia.getAudioTrack()) {
                remoteMedia.getAudioTrack().setMuted(true);
            }
        }, () => {
            if (remoteMedia.getAudioTrack()) {
                remoteMedia.getAudioTrack().setMuted(false);
            }
        });
        let autoPlayAudio = this.autoplayDeviceMicrophoneStreams;
        if (screenStream) {
            autoPlayAudio = this.autoplayScreenSystemAudioStreams;
        }
        if (!remoteConnectionInfo.getHasAudio() || !this.autoplayStreams || !autoPlayAudio || !args.streamRemoteMicrophone) {
            audioStream.changeDirection(fm.liveswitch.StreamDirection.Inactive);
        }
        videoStream = new fm.liveswitch.VideoStream(remoteMedia);
        let videoDeviceSink = DeviceType.Camera;
        if (screenStream) {
            videoDeviceSink = DeviceType.Screen;
        }
        videoSink = new Sink(videoDeviceSink, () => {
            if (remoteMedia.getVideoTrack()) {
                remoteMedia.getVideoTrack().setMuted(true);
            }
        }, () => {
            if (remoteMedia.getVideoTrack()) {
                remoteMedia.getVideoTrack().setMuted(false);
            }
        });
        let autoPlayVideo = this.autoplayDeviceCameraStreams;
        if (screenStream) {
            autoPlayVideo = this.autoplayScreenDisplayStreams;
        }
        if (!remoteConnectionInfo.getHasVideo() || !this.autoplayStreams || !autoPlayVideo || (!screenStream && !args.streamRemoteCamera) || (screenStream && !args.streamRemoteScreenshare)) {
            videoStream.changeDirection(fm.liveswitch.StreamDirection.Inactive);
        }
        else {
            (_a = SharedObjects.Instance().getLayoutManagerBySession(me)) === null || _a === void 0 ? void 0 : _a.addRemoteView(remoteMedia.getId(), remoteMedia.getView());
        }
        let updateConnectionForVideo = (enableVideo) => {
            var _a, _b, _c;
            let connectionConfig = connection.getConfig();
            let layoutHasRemoteView = false;
            (_a = SharedObjects.Instance().getLayoutManagerBySession(me)) === null || _a === void 0 ? void 0 : _a.getRemoteViewIds().forEach((id) => {
                if (id == remoteMedia.getId()) {
                    layoutHasRemoteView = true;
                }
            });
            if (enableVideo) {
                let hasVideo = false;
                if (screenStream) {
                    hasVideo = CentralConnections.Instance().remoteConnectionInfoForScreen.get(remoteConnectionInfo.getClientId()).getHasVideo();
                }
                else {
                    hasVideo = CentralConnections.Instance().remoteConnectionInfoForCamera.get(remoteConnectionInfo.getClientId()).getHasVideo();
                }
                if (hasVideo) {
                    connectionConfig.setVideoDirection(me._Direction(fm.liveswitch.StreamDirection.ReceiveOnly));
                    if (!layoutHasRemoteView) {
                        (_b = SharedObjects.Instance().getLayoutManagerBySession(me)) === null || _b === void 0 ? void 0 : _b.addRemoteView(remoteMedia.getId(), remoteMedia.getView());
                    }
                }
            }
            else {
                if (layoutHasRemoteView) {
                    (_c = SharedObjects.Instance().getLayoutManagerBySession(me)) === null || _c === void 0 ? void 0 : _c.removeRemoteView(remoteMedia.getId());
                }
                connectionConfig.setVideoDirection(me._Direction(fm.liveswitch.StreamDirection.Inactive));
            }
            connection.update(connectionConfig);
        };
        let updateConnectionForAudio = (enableAudio) => {
            let connectionConfig = connection.getConfig();
            let hasAudio = CentralConnections.Instance().remoteConnectionInfoForCamera.get(remoteConnectionInfo.getClientId()).getHasAudio();
            if (screenStream) {
                hasAudio = CentralConnections.Instance().remoteConnectionInfoForScreen.get(remoteConnectionInfo.getClientId()).getHasAudio();
            }
            if (enableAudio && hasAudio) {
                connectionConfig.setAudioDirection(me._Direction(fm.liveswitch.StreamDirection.ReceiveOnly));
            }
            else {
                connectionConfig.setAudioDirection(me._Direction(fm.liveswitch.StreamDirection.Inactive));
            }
            connection.update(connectionConfig);
        };
        connection = channel.createSfuDownstreamConnection(remoteConnectionInfo, audioStream, videoStream);
        let onStateChangeOnStream = null; // need this
        if (screenStream) {
            let videoSubStream = new DisplaySubStream(videoStream.getId(), updateConnectionForVideo, SubStreamType.Video, videoSink); // need to create this
            let audioSubStream = new SubStream(audioStream.getId(), updateConnectionForAudio, SubStreamType.Audio, audioSink); // need to create this
            participant.screenStreams.push(new ScreenStream(false, onStateChangeOnStream, videoSubStream, audioSubStream));
        }
        else {
            let videoSubStream = new DeviceSubStream(videoStream.getId(), updateConnectionForVideo, SubStreamType.Video, videoSink); // need to create this
            let audioSubStream = new DeviceSubStream(audioStream.getId(), updateConnectionForAudio, SubStreamType.Audio, audioSink, null, false, remoteMedia); // need to create this
            participant.deviceStreams.push(new DeviceStream(false, onStateChangeOnStream, videoSubStream, audioSubStream));
        }
        //this.prepareConnection(connection); /// don't think I need this right now
        if (screenStream) {
            connection.setTag(Session.screenAndSystemAudioConnectionTag);
        }
        else {
            connection.setTag(Session.cameraAndMircophoneConnectionTag);
        }
        this.sfuDownstreamConnections[connection.getId()] = connection;
        connection.setDisableAutomaticIceServers(false); // fine for now
        // Monitor the connection state changes.
        connection.addOnStateChange((connection) => {
            var _a;
            fm.liveswitch.Log.info(connection.getId() + ': SFU downstream connection state is ' +
                new fm.liveswitch.ConnectionStateWrapper(connection.getState()).toString() + '.');
            // Cleanup if the connection closes or fails.
            if (connection.getState() == fm.liveswitch.ConnectionState.Closing ||
                connection.getState() == fm.liveswitch.ConnectionState.Failing) {
                if (connection.getRemoteClosed()) {
                    fm.liveswitch.Log.info(connection.getId() + ': Media server closed the connection.');
                }
                // Remove the remote view from the layout.
                (_a = SharedObjects.Instance().getLayoutManagerBySession(this)) === null || _a === void 0 ? void 0 : _a.removeRemoteView(remoteMedia.getId());
                remoteMedia.destroy();
                delete this.sfuDownstreamConnections[connection.getId()];
            }
            else if (connection.getState() == fm.liveswitch.ConnectionState.Failed) {
                // Note: no need to close the connection as it's done for us.
                me.updateDownstreamState(SessionState.Terminated);
                this.openSfuDownstreamConnection(remoteConnectionInfo, channel, screenStream, participant, args);
            }
            else if (connection.getState() == fm.liveswitch.ConnectionState.Connected) {
                LogDebug("SFU Downstream connected");
                me.updateDownstreamState(SessionState.Connected);
            }
            else if (connection.getState() == fm.liveswitch.ConnectionState.Failed || connection.getState() == fm.liveswitch.ConnectionState.Closed) {
                me.updateDownstreamState(SessionState.Terminated);
            }
            else if (connection.getState() == fm.liveswitch.ConnectionState.Closed) {
                me.updateDownstreamState(SessionState.Terminated);
            }
            else if (connection.getState() == fm.liveswitch.ConnectionState.Connecting) {
                me.updateDownstreamState(SessionState.Connecting);
            }
        });
        // Open the connection.
        connection.open();
        return connection;
    }
    openSfuUpstreamConnection(channel, localMedia, screen, video, audio) {
        var me = this;
        // incorrect order... localmedia is seperate now
        // need to callback for stuff
        //let videoSubStream = new SubStream("", SubStreamType.Video, undefined, new Source(new Device("", "", DeviceType.Camera), true));
        //me.me.deviceStreams.push(new DeviceStream(null));
        //let localMedia = SharedObjects.Instance().cameraLocalMedia;
        let connection;
        let audioStream = null;
        let videoStream = null;
        if (localMedia != null && localMedia.getAudioTrack() != null) { // need to add setting from user
            audioStream = new fm.liveswitch.AudioStream(localMedia);
        }
        if (localMedia != null && localMedia.getVideoTrack() != null) { // need to insert setting form user
            videoStream = new fm.liveswitch.VideoStream(localMedia);
        }
        if (!audio && audioStream) {
            audioStream.setLocalDirection(fm.liveswitch.StreamDirection.Inactive);
        }
        if (!video && videoStream) {
            videoStream.setLocalDirection(fm.liveswitch.StreamDirection.Inactive);
        }
        connection = channel.createSfuUpstreamConnection(audioStream, videoStream);
        if (screen) {
            connection.setTag(Session.screenAndSystemAudioConnectionTag);
        }
        else {
            connection.setTag(Session.cameraAndMircophoneConnectionTag);
        }
        let updateConnectionForVideo = (enableVideo) => {
            var _a, _b;
            let connectionConfig = connection.getConfig();
            if (enableVideo) {
                if (screen) {
                    localMedia.start();
                }
                else {
                    localMedia.getVideoTrack().setMuted(false);
                }
                connectionConfig.setVideoDirection(me._Direction(fm.liveswitch.StreamDirection.SendOnly));
                (_a = SharedObjects.Instance().getLayoutManagerBySessionId(me.id)) === null || _a === void 0 ? void 0 : _a.setLocalView(localMedia.getView());
            }
            else {
                if (screen) {
                    localMedia.stop();
                }
                else {
                    localMedia.getVideoTrack().setMuted(true);
                }
                (_b = SharedObjects.Instance().getLayoutManagerBySessionId(me.id)) === null || _b === void 0 ? void 0 : _b.unsetLocalView();
                connectionConfig.setVideoDirection(me._Direction(fm.liveswitch.StreamDirection.Inactive));
            }
            connection.update(connectionConfig);
        };
        let updateConnectionForAudio = (enableAudio) => {
            let connectionConfig = connection.getConfig();
            if (enableAudio) {
                localMedia.getAudioTrack().setMuted(false);
                connectionConfig.setAudioDirection(me._Direction(fm.liveswitch.StreamDirection.SendOnly));
            }
            else {
                localMedia.getAudioTrack().setMuted(true);
                connectionConfig.setAudioDirection(me._Direction(fm.liveswitch.StreamDirection.Inactive));
            }
            connection.update(connectionConfig);
        };
        let onStateChangeOnStream = null; // need this
        //update the substream state
        if (screen) {
            let videoSubStream = new DisplaySubStream(videoStream.getId(), updateConnectionForVideo, SubStreamType.Video); // need to create this
            me.me.screenStreams.push(new ScreenStream(true, onStateChangeOnStream, videoSubStream, null));
        }
        else {
            let videoSubStream = new DeviceSubStream(videoStream.getId(), updateConnectionForVideo, SubStreamType.Video, null, null, true); // need to create this
            let audioSubStream = new DeviceSubStream(audioStream.getId(), updateConnectionForAudio, SubStreamType.Audio, null, null, true); // need to create this
            me.me.deviceStreams.push(new DeviceStream(true, onStateChangeOnStream, videoSubStream, audioSubStream));
        }
        this.sfuUpstreamConnection[connection.getId()] = connection;
        connection.setDisableAutomaticIceServers(false); // just with auto turn for now
        connection.addOnStateChange((connection) => {
            LogDebug(connection.getId() + ': SFU upstream connection state is ' +
                new fm.liveswitch.ConnectionStateWrapper(connection.getState()).toString() + '.');
            if (connection.getState() == fm.liveswitch.ConnectionState.Closing ||
                connection.getState() == fm.liveswitch.ConnectionState.Failing) {
                if (connection.getRemoteClosed()) {
                    LogDebug(connection.getId() + ': Media server closed the connection.');
                }
            }
            else if (connection.getState() == fm.liveswitch.ConnectionState.Failed) {
                // Note: no need to close the connection as it's done for us.
                this.openSfuUpstreamConnection(channel, localMedia, screen);
                me.updateUpstreamState(SessionState.Terminated);
            }
            else if (connection.getState() == fm.liveswitch.ConnectionState.Connected) {
                me.updateUpstreamState(SessionState.Connected);
            }
            else if (connection.getState() == fm.liveswitch.ConnectionState.Closed) {
                me.updateUpstreamState(SessionState.Terminated);
            }
            else if (connection.getState() == fm.liveswitch.ConnectionState.Connecting) {
                me.updateUpstreamState(SessionState.Connecting);
            }
        });
        // Open the connection.
        connection.open();
        return connection;
    }
    updateUpstreamState(upstreamState) {
        let newState = this.state;
        this.upstreamState = upstreamState;
        if (upstreamState == SessionState.Terminated) {
            newState = upstreamState;
        }
        if (upstreamState == SessionState.Connecting) {
            newState = upstreamState;
        }
        if (upstreamState == SessionState.Connected) {
            newState = upstreamState;
        }
        if (newState != this.state) {
            this.state = newState;
            if (this.onStateChange != null) {
                this.onStateChange(this, this.state);
            }
        }
    }
    updateDownstreamState(downstreamState) {
        let newState = this.state;
        this.downstreamState = downstreamState;
        if (downstreamState == SessionState.Terminated) {
            newState = downstreamState;
        }
        if (downstreamState == SessionState.Connecting) {
            newState = downstreamState;
        }
        if (downstreamState == SessionState.Connected) {
            newState = downstreamState;
        }
        if (newState != this.state) {
            this.state = newState;
            if (this.onStateChange != null) {
                this.onStateChange(this, this.state);
            }
        }
    }
    notifyTyping() {
        throw new Error("Method not implemented.");
    }
    playFileStreams(args) { } // not implemented
    sendFile(args) {
        throw new Error("not implemented");
        //return new SendStatus();
    }
    ;
    startFileStream(args) {
        throw new Error("Method not implemented.");
    }
    inviteUser(userId) {
        throw new Error("not implemented");
    }
    inviteClient(clientId) {
        throw new Error("not implemented");
    }
    invitePhone(phoneNumber) {
        throw new Error("not implemented");
    }
    stopRecording() {
        throw new Error("Method not implemented.");
    }
    kickParticipant(participantId, reason) {
        throw new Error("not implmented");
    }
    startRecording() {
        throw new Error("Method not implemented.");
    }
    connecting() {
        throw new Error("Method not implemented.");
    }
    connected() {
        throw new Error("Method not implemented.");
    }
    terminated() {
        throw new Error("Method not implemented.");
    }
}
// internal
Session.cameraAndMircophoneConnectionTag = "ca";
Session.screenAndSystemAudioConnectionTag = "sa";

class Conference extends Session {
    constructor(channel, liveSwitchClient, notifyLeave, args, videoContainer) {
        super(channel, liveSwitchClient, notifyLeave, args, videoContainer);
    }
}

class MicrophoneSource extends Source {
    constructor(sourceDevice, autoPreview) {
        super(sourceDevice, autoPreview);
    }
}

class ScreenSource extends Source {
    constructor(display, sourceDevice) {
        super(sourceDevice);
        this.display = display;
    }
}

var __awaiter$2 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Client {
    constructor(userId, token) {
        this.isNew = true;
        this.isConnecting = false;
        this.isConnected = false;
        this.isDisconnected = false;
        this.notifyConferenceLeaving = {};
        this.conferences = new Array();
        this.heldConferences = new Array();
        this.defaultConfig = DefaultConfig.Instance();
        this._Channels = new Array();
        // Assume the token if valid
        // for now we create our own token
        //if (videoContainer) {
        //    //SharedObjects.Instance(videoContainer);
        //}
        let defaultConfig = this.defaultConfig;
        if (userId) {
            defaultConfig.DefaultUserId = userId;
        }
        defaultConfig.ClientId = userId;
        let channel = defaultConfig.DefaultChannel;
        let appId = defaultConfig.DefaultAppId;
        let sharedSecret = defaultConfig.DefaultSharedSecret;
        this._LiveSwitchClient = new fm.liveswitch.Client(defaultConfig.DefaultGatewayUrl, defaultConfig.DefaultAppId, defaultConfig.DefaultUserId, defaultConfig.DefaultDevice, defaultConfig.ClientId);
        this._LiveSwitchClient.setUserAlias(defaultConfig.DefaultUserId);
        //this._LiveSwitchClient.addOnInvitationReceived((invitation) => {
        //   // invitation.
        //    if (this.onconferenceinvite != undefined || this.onconferenceinvite != null) {
        //        this.onconferenceinvite(new Conference(invitation.getChannelId(), this._LiveSwitchClient, invitation));
        //    }
        //});
        if (typeof token != "string") {
            //let claims = [new fm.liveswitch.ChannelClaim(channel)];
            let claims = new Array();
            for (let i = 0; i < defaultConfig.DefaultChannels.length; i++) {
                claims[i] = new fm.liveswitch.ChannelClaim(defaultConfig.DefaultChannels[i]);
            }
            let clientRoles = null;
            //token = fm.liveswitch.Token.generateClientRegisterToken(appId, defaultConfig.DefaultAppId, defaultConfig.DefaultDevice, defaultConfig.ClientId, clientRoles, claims, sharedSecret);
            // don't need to know the channel before hand
            token = fm.liveswitch.Token.generateClientRegisterToken(appId, defaultConfig.DefaultUserId, defaultConfig.DefaultDevice, defaultConfig.ClientId, clientRoles, new Array(), sharedSecret);
        }
        this._Token = token; /// assume 
        // don't think I need the following line
        //this.getinformationfromlocalmedia(); // let this happen ... who cares... it will populated.
    }
    connect() {
        return __awaiter$2(this, void 0, void 0, function* () {
            var me = this;
            this.onstatechange = ((client, state) => {
                LogDebug(state.toString());
            });
            let promise = new Promise((resolve, reject) => {
                // need to backoff .. maybe later
                this._LiveSwitchClient.addOnStateChange((state) => {
                    if (state.getState() == fm.liveswitch.ClientState.New) {
                        me.changeStateTo(ClientState.New);
                    }
                    else if (state.getState() == fm.liveswitch.ClientState.Registering) {
                        me.changeStateTo(ClientState.Connecting);
                    }
                    else if (state.getState() == fm.liveswitch.ClientState.Registered) {
                        me.changeStateTo(ClientState.Connected);
                    }
                    else if (state.getState() == fm.liveswitch.ClientState.Unregistered)
                        me.changeStateTo(ClientState.Disconnected);
                });
                this._LiveSwitchClient.register(this._Token).then((o) => {
                    if (o != null) {
                        this._Channels = o;
                    }
                    LogDebug("Client is registered");
                    // Do
                    resolve();
                }).fail((o) => {
                    LogDebug(o.name + ": " + o.message + "\n" + o.stack);
                    reject();
                });
            });
            return promise;
        });
    }
    //private notifyLeave: IAction1<IConference>;
    //join(conferenceId: string): IConference {
    //    this.notifyConferenceLeaving[conferenceId] = () => {
    //        for (let i = 0; i < this.conferences.length; i++) {
    //            if (this.conferences[i].id == conferenceId) {
    //                delete this.conferences[i];
    //            }
    //        }
    //    };
    //    let conference = new Conference(conferenceId, this._LiveSwitchClient, this.notifyConferenceLeaving[conferenceId]);
    //    this.conferences.push(conference);
    //    return conference;
    //}
    join(args) {
        let container = null;
        // need to take care of all the args
        if (args.playLocalScreenshare && typeof args.playLocalCamera == "undefined") {
            args.playLocalCamera = false;
        }
        if (typeof args.playLocalMicrophone == "undefined") {
            args.playLocalMicrophone = true;
        }
        if (typeof args.playLocalCamera == "undefined") {
            args.playLocalCamera = true;
        }
        if (typeof args.playLocalScreenshare == "undefined") {
            args.playLocalScreenshare = false;
        }
        if (typeof args.streamRemoteCamera == "undefined") {
            args.streamRemoteCamera = true;
        }
        if (typeof args.streamRemoteMicrophone == "undefined") {
            args.streamRemoteMicrophone = true;
        }
        if (typeof args.streamRemoteScreenshare == "undefined") {
            args.streamRemoteScreenshare = true;
        }
        let needContainer = false;
        if (args.playLocalCamera != false || args.playLocalScreenshare != false || args.streamRemoteCamera != false || args.streamRemoteScreenshare != false) {
            needContainer = true;
        }
        if (args.videoSinkElementId) {
            container = document.getElementById(args.videoSinkElementId);
        }
        else if (needContainer) {
            throw new Error("Please provide videoSinkElementId (HTMLElement)");
        }
        // conferenceId: string, container ?: HTMLElement
        if (needContainer && container == null) {
            throw new Error("Could not find HTML with id: " + args.videoSinkElementId);
        }
        // need for calls
        this.notifyConferenceLeaving[args.conferenceId] = () => {
            for (let i = 0; i < this.conferences.length; i++) {
                if (this.conferences[i].id == args.conferenceId) {
                    delete this.conferences[i];
                }
            }
        };
        let conference = new Conference(args.conferenceId, this._LiveSwitchClient, this.notifyConferenceLeaving[args.conferenceId], args, container);
        this.conferences.push(conference);
        return conference;
    }
    // Need to do
    get camera() {
        let promise = new Promise((resolve, reject) => __awaiter$2(this, void 0, void 0, function* () {
            this.cameras.then((inputs) => {
                if (inputs.length > 0) {
                    resolve(inputs[0]);
                }
                else {
                    resolve(null);
                }
            }).catch((ex) => {
                reject(ex);
            });
        }));
        return promise;
    }
    get microphone() {
        let promise = new Promise((resolve, reject) => __awaiter$2(this, void 0, void 0, function* () {
            this.microphones.then((inputs) => {
                if (inputs.length > 0) {
                    resolve(inputs[0]);
                }
                else {
                    resolve(null);
                }
            }).catch((ex) => {
                reject(ex);
            });
        }));
        return promise;
    }
    get screen() {
        let promise = new Promise((resolve, reject) => __awaiter$2(this, void 0, void 0, function* () {
            this.screens.then((inputs) => {
                if (inputs.length > 0) {
                    resolve(inputs[0]);
                }
                else {
                    resolve(null);
                }
            }).catch((ex) => {
                reject(ex);
            });
        }));
        return promise;
    }
    // currently not being updated after once being populated.
    get cameras() {
        let promise = new Promise((resolve, reject) => __awaiter$2(this, void 0, void 0, function* () {
            let cameraSourrces = new Array(); //
            let localmedia = new fm.liveswitch.LocalMedia(false, true);
            localmedia.getVideoSourceInputs().then((inputs) => {
                inputs.forEach((input) => {
                    let device = new Device(input.getId(), input.getName(), DeviceType.Camera, input);
                    cameraSourrces.push(new CameraSource(device));
                    resolve(cameraSourrces);
                });
            }).fail((ex) => {
                reject(ex);
            });
        }));
        return promise;
    }
    get microphones() {
        let promise = new Promise((resolve, reject) => __awaiter$2(this, void 0, void 0, function* () {
            let micSourrces = new Array(); //
            let localmedia = new fm.liveswitch.LocalMedia(true, false);
            localmedia.getAudioSourceInputs().then((inputs) => {
                inputs.forEach((input) => {
                    let device = new Device(input.getId(), input.getName(), DeviceType.Microphone, input);
                    micSourrces.push(new MicrophoneSource(device));
                    resolve(micSourrces);
                });
            }).fail((ex) => {
                reject(ex);
            });
        }));
        return promise;
    }
    get screens() {
        let promise = new Promise((resolve, reject) => __awaiter$2(this, void 0, void 0, function* () {
            let screenSourrces = new Array(); //
            let localmedia = new fm.liveswitch.LocalMedia(false, false, true);
            localmedia.getVideoSourceInputs().then((inputs) => {
                let i = 1;
                inputs.forEach((input) => {
                    let device = new Device(input.getId(), input.getName(), DeviceType.Microphone, input);
                    screenSourrces.push(new ScreenSource(i, device));
                    i++;
                    resolve(screenSourrces);
                });
            }).fail((ex) => {
                reject(ex);
            });
        }));
        return promise;
    }
    // Internal
    changeStateTo(state) {
        if (this.onstatechange) {
            this.onstatechange(this, state);
        }
        this.isNew = false;
        this.isConnecting = false;
        this.isConnected = false;
        this.isDisconnected = false;
        if (state == ClientState.New) {
            this.isNew = true;
        }
        else if (state == ClientState.Connecting) {
            this.isConnecting = true;
        }
        else if (state == ClientState.Connected) {
            this.isConnected = true;
        }
        else if (state == ClientState.Disconnected) {
            this.isDisconnected = true;
        }
    }
    record(audioOnly) {
        throw new Error("Method not implemented.");
    }
    notifyTyping(peerId) {
        throw new Error("Method not implemented.");
    }
    blockIncomingCalls(userId) {
        throw new Error("Method not implemented.");
    }
    unblockIncomingCalls(userId) {
        throw new Error("Method not implemented.");
    }
    getBlockedUserIds() {
        throw new Error("Method not implemented.");
    }
    audioMessage(sendArgs) { } // not implemented
    videoMessage(sendArgs) { } // not implemented
    call(args) {
        throw new Error("call not supported yet");
    }
}

var DeviceKind;
(function (DeviceKind) {
    DeviceKind[DeviceKind["VideoInput"] = 1] = "VideoInput";
    DeviceKind[DeviceKind["AudioInput"] = 2] = "AudioInput";
    DeviceKind[DeviceKind["AudioOutput"] = 3] = "AudioOutput";
})(DeviceKind || (DeviceKind = {}));

class DeviceManager {
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
            localmedia === null || localmedia === void 0 ? void 0 : localmedia.getVideoSourceInputs().then((inputs) => {
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
            localmedia === null || localmedia === void 0 ? void 0 : localmedia.getAudioSourceInputs().then((inputs) => {
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
class DeviceInfo {
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

// ignore this class for now... don't need to worry about autoplay
class SessionInvite {
}

class OutboundSessionInvite extends SessionInvite {
    accepted() {
        throw new Error("Method not implemented.");
    }
    rejected() {
        throw new Error("Method not implemented.");
    }
    cancel() {
        throw new Error("Method not implemented.");
    }
    startScreenStream(args) {
        throw new Error("Method not implemented.");
    }
    startFileStream(args) {
        throw new Error("Method not implemented.");
    }
    startDeviceStream(args) {
        throw new Error("Method not implemented.");
    }
}

class InbountSesssionInvite extends SessionInvite {
    playStreams() {
        throw new Error("Method not implemented.");
    }
    playScreenStreams(args) {
        throw new Error("Method not implemented.");
    }
    playFileStreams(args) {
        throw new Error("Method not implemented.");
    }
    playDeviceStreams(args) {
        throw new Error("Method not implemented.");
    }
    accept(args) {
        throw new Error("Method not implemented.");
    }
    acceptWithDeviceStream(args) {
        throw new Error("Method not implemented.");
    }
    acceptWithScreenStream(args) {
        throw new Error("Method not implemented.");
    }
    acceptWithFileStream(args) {
        throw new Error("Method not implemented.");
    }
    reject(reason) {
        throw new Error("Method not implemented.");
    }
}

class SendArgs {
    constructor(onsent, ondelivered, onprogress, onfailed, onviewed) {
        if (onsent) {
            this.onSent = onsent;
        }
        if (ondelivered) {
            this.onDelivered = ondelivered;
        }
        if (onprogress) {
            this.onProgress = onprogress;
        }
        if (onfailed) {
            this.onFailed = onfailed;
        }
        if (onviewed) {
            this.onViewed = onviewed;
        }
    }
}

class PlayArgs {
    constructor(audioSink, videoSink) {
        this.audioSink = audioSink;
        this.videoSink = videoSink;
    }
}
class DevicePlayArgs extends PlayArgs {
    constructor(microphone, camera, audioOutputDeviceId, videoSinkElementId, audioSink, videoSink) {
        super(audioSink, videoSink);
        this.audioOutputDeviceId = audioOutputDeviceId;
        this.videoSinkElementId = videoSinkElementId;
        this.microphone = microphone;
        this.camera = camera;
    }
}

var SessionInviteRejectReason;
(function (SessionInviteRejectReason) {
    SessionInviteRejectReason[SessionInviteRejectReason["Busy"] = 0] = "Busy";
    SessionInviteRejectReason[SessionInviteRejectReason["Incompatible"] = 1] = "Incompatible";
    SessionInviteRejectReason[SessionInviteRejectReason["None"] = 2] = "None";
})(SessionInviteRejectReason || (SessionInviteRejectReason = {}));

var SourceType;
(function (SourceType) {
    SourceType[SourceType["Camera"] = 0] = "Camera";
    SourceType[SourceType["Screen"] = 1] = "Screen";
    SourceType[SourceType["Microphone"] = 2] = "Microphone";
    SourceType[SourceType["File"] = 3] = "File";
})(SourceType || (SourceType = {}));

class MessageArgs {
    constructor(message) {
        this.stringMessage = message;
    }
}

// old
class StringMessageArgs {
    constructor(message) {
        this.message = message;
    }
}
class ChatArgs {
    constructor() { }
}

export { CameraSource, ChatArgs, Client, Conference, Device, DeviceManager, DevicePlayArgs, DeviceType, InbountSesssionInvite, MessageArgs, OutboundSessionInvite, Participant, SendArgs, Session, SessionInvite, SessionInviteRejectReason, SessionState, SourceType, Stream, StreamType, StringMessageArgs, SubStream, SubStreamType };
//# sourceMappingURL=bundle.js.map
