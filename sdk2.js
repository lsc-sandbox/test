var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
System.register("scripts/interfaces/PrototypeImplementation/Consumables/EntryPoint", [], function (exports_1, context_1) {
    "use strict";
    var EntryPoint;
    var __moduleName = context_1 && context_1.id;
    function LogDebug(logMessage) {
        fm.liveswitch.Log.debug(logMessage);
    }
    exports_1("LogDebug", LogDebug);
    return {
        setters: [],
        execute: function () {
            EntryPoint = class EntryPoint {
                constructor() {
                    fm.liveswitch.Log.registerProvider(new fm.liveswitch.ConsoleLogProvider(fm.liveswitch.LogLevel.Debug));
                }
                static Instance() {
                    if (typeof EntryPoint._Instance == "undefined") {
                        EntryPoint._Instance = new EntryPoint();
                    }
                    return EntryPoint._Instance;
                }
            };
            exports_1("EntryPoint", EntryPoint);
        }
    };
});
System.register("scripts/interfaces/PrototypeImplementation/Consumables/DefaultConfig", ["scripts/interfaces/PrototypeImplementation/Consumables/EntryPoint"], function (exports_2, context_2) {
    "use strict";
    var EntryPoint_js_1, DefaultConfig;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [
            function (EntryPoint_js_1_1) {
                EntryPoint_js_1 = EntryPoint_js_1_1;
            }
        ],
        execute: function () {
            DefaultConfig = class DefaultConfig {
                constructor() {
                    this.DefaultAppId = "my-app-id";
                    this.DefaultGatewayUrl = "https://demo.liveswitch.fm:8443/sync";
                    this.DefaultSharedSecret = "--replaceThisWithYourOwnSharedSecret--";
                    this.DefaultChannel = "YouWillNeverFindMe";
                    this.DefaultDevice = "Device";
                    this.DefaultUserId = "User";
                    this.ClientId = "ClientId";
                    // Make Sure Entrypoint Exists.. this stupid.. fix it later
                    EntryPoint_js_1.EntryPoint.Instance();
                    this.DefaultChannels = new Array();
                    for (let i = 0; i < 10; i++) {
                        this.DefaultChannels[i] = "conference/" + Math.floor(Math.random() * 9999999).toString();
                        EntryPoint_js_1.LogDebug("Pre-generated conference Id: " + this.DefaultChannels[i]);
                    }
                    fm.liveswitch.Log.debug("DefaultConfig class is created ");
                }
                static Instance() {
                    if (typeof DefaultConfig._Instance == "undefined") {
                        DefaultConfig._Instance = new DefaultConfig();
                    }
                    return DefaultConfig._Instance;
                }
            };
            exports_2("DefaultConfig", DefaultConfig);
        }
    };
});
System.register("scripts/interfaces/PrototypeImplementation/Consumables/CentralConnections", [], function (exports_3, context_3) {
    "use strict";
    var CentralConnections;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [],
        execute: function () {
            CentralConnections = class CentralConnections {
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
            };
            exports_3("CentralConnections", CentralConnections);
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
        }
    };
});
System.register("scripts/interfaces/PrototypeImplementation/Consumables/SharedObjects", [], function (exports_4, context_4) {
    "use strict";
    var SharedObjects;
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [],
        execute: function () {
            SharedObjects = class SharedObjects {
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
                    return me.updateLocaLMedias();
                }
                updateLocaLMedias(nowNeedCameraVideo, nowNeedCameraAudio, nowNeedScreenVideo, nowNeedScreenAudio) {
                    let needCameraAudio = false;
                    let needCameraVideo = false;
                    let needScreenAudio = false;
                    let needScreenVideo = false;
                    if (nowNeedCameraVideo) {
                        needCameraVideo = true;
                    }
                    if (nowNeedCameraAudio) {
                        needCameraAudio = true;
                    }
                    if (nowNeedScreenVideo) {
                        needScreenVideo = true;
                    }
                    if (nowNeedScreenAudio) {
                        needScreenAudio = true;
                    }
                    for (let sessionValue of this._Sessions.values()) {
                        if (sessionValue.me.deviceStreams) {
                            sessionValue.me.deviceStreams.forEach((deviceStream) => {
                                if (deviceStream.audio.isEnabled) {
                                    needCameraAudio = true;
                                }
                                if (deviceStream.video.isEnabled) {
                                    needCameraVideo = true;
                                }
                            });
                        }
                        if (sessionValue.me.screenStreams) {
                            sessionValue.me.screenStreams.forEach((screenStream) => {
                                if (screenStream.video.isEnabled) {
                                    needScreenVideo = true;
                                }
                                if (screenStream.audio.isEnabled) {
                                    needCameraVideo = true;
                                }
                            });
                        }
                    }
                    let updateRequiredToScreenMedia = false;
                    let updateRequiredToCameraMedia = false;
                    if (needCameraVideo != this._localCameraVideo) {
                        updateRequiredToCameraMedia = true;
                        this._localCameraVideo = needCameraVideo;
                    }
                    if (needScreenVideo != this._localScreenVideo) {
                        updateRequiredToScreenMedia = true;
                        this._localScreenVideo = needScreenVideo;
                    }
                    if (needCameraAudio != this._needAudio) {
                        updateRequiredToCameraMedia = true; // camera media contains audio
                    }
                    this._localCameraAudio = needCameraAudio;
                    this._localScreenAudio = needScreenAudio;
                    // Do updates
                    let promise = new Promise((resolve, reject) => {
                        var me = this;
                        if (updateRequiredToCameraMedia) {
                            me.stopCameraLocalMedia().then(() => {
                                me.startLocalCameraMedia().then(() => {
                                    me.updatePromiseResolve(true, undefined).then(() => {
                                        resolve();
                                    });
                                });
                            });
                        }
                        else {
                            me.updatePromiseResolve(true, undefined).then(() => {
                                resolve();
                            });
                        }
                        if (updateRequiredToScreenMedia) {
                            me.stopScreenLocalMedia().then(() => {
                                me.startLocalScreenMedia().then(() => {
                                    me.updatePromiseResolve(undefined, true).then(() => {
                                        resolve();
                                    });
                                });
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
                    return this._SessionLayouts.get(sessionId);
                }
                getLayoutManager(seesion) {
                    return this._SessionLayouts.get(seesion.id);
                }
                removeLocalLayouts(layout) {
                    var me = this;
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
                        if (me.screenLocalMedia) {
                            me.screenLocalMedia = new fm.liveswitch.LocalMedia(false, me._localScreenVideo, true);
                        }
                        me.screenLocalMedia.start().then((o) => {
                            for (let session of me._Sessions.values()) {
                                let addTolayout = true;
                                //session.screenStreams.forEach((ss) => {
                                //    if (ss.video.isEnabled) {
                                //        addTolayout = true;
                                //    }
                                //})
                                if (addTolayout) {
                                    me._SessionLayouts.get(session.id).unsetLocalView();
                                    me._SessionLayouts.get(session.id).setLocalView(o.getView());
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
                            for (let session of me._Sessions.values()) {
                                let addTolayout = true;
                                //session.deviceStreams.forEach((ss) => {
                                //    if (ss.video.isEnabled) {
                                //        addTolayout = true;
                                //    }
                                //})
                                if (addTolayout) {
                                    me._SessionLayouts.get(session.id).unsetLocalView();
                                    me._SessionLayouts.get(session.id).setLocalView(o.getView());
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
            };
            exports_4("SharedObjects", SharedObjects);
        }
    };
});
System.register("scripts/interfaces/PrototypeImplementation/Consumables/Device", [], function (exports_5, context_5) {
    "use strict";
    var Device;
    var __moduleName = context_5 && context_5.id;
    return {
        setters: [],
        execute: function () {
            Device = class Device {
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
            };
            exports_5("Device", Device);
        }
    };
});
System.register("scripts/interfaces/PrototypeImplementation/Consumables/Sink", ["scripts/interfaces/PrototypeImplementation/Consumables/Device"], function (exports_6, context_6) {
    "use strict";
    var Device_js_1, Sink;
    var __moduleName = context_6 && context_6.id;
    return {
        setters: [
            function (Device_js_1_1) {
                Device_js_1 = Device_js_1_1;
            }
        ],
        execute: function () {
            Sink = class Sink {
                constructor(deviceType, mute, unMute) {
                    let device = new Device_js_1.Device(fm.liveswitch.Guid.newGuid().toString(), deviceType.toString(), deviceType);
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
            };
            exports_6("Sink", Sink);
        }
    };
});
System.register("scripts/interfaces/PrototypeImplementation/Consumables/Source", [], function (exports_7, context_7) {
    "use strict";
    var Source;
    var __moduleName = context_7 && context_7.id;
    return {
        setters: [],
        execute: function () {
            Source = class Source {
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
            };
            exports_7("Source", Source);
        }
    };
});
System.register("scripts/interfaces/PrototypeImplementation/Consumables/SubStream", ["../../Interfaces/ISubStream.js"], function (exports_8, context_8) {
    "use strict";
    var ISubStream_js_1, SubStream;
    var __moduleName = context_8 && context_8.id;
    return {
        setters: [
            function (ISubStream_js_1_1) {
                ISubStream_js_1 = ISubStream_js_1_1;
            }
        ],
        execute: function () {
            SubStream = class SubStream {
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
                    if (this.state == ISubStream_js_1.SubStreamState.New) {
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
            };
            exports_8("SubStream", SubStream);
        }
    };
});
System.register("scripts/interfaces/PrototypeImplementation/Consumables/Stream", [], function (exports_9, context_9) {
    "use strict";
    var Stream;
    var __moduleName = context_9 && context_9.id;
    return {
        setters: [],
        execute: function () {
            Stream = class Stream {
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
            };
            exports_9("Stream", Stream);
        }
    };
});
System.register("scripts/interfaces/PrototypeImplementation/Consumables/DevicePlayArgs", [], function (exports_10, context_10) {
    "use strict";
    var PlayArgs, DevicePlayArgs;
    var __moduleName = context_10 && context_10.id;
    return {
        setters: [],
        execute: function () {
            PlayArgs = class PlayArgs {
                constructor(audioSink, videoSink) {
                    this.audioSink = audioSink;
                    this.videoSink = videoSink;
                }
            };
            exports_10("PlayArgs", PlayArgs);
            DevicePlayArgs = class DevicePlayArgs extends PlayArgs {
                constructor(microphone, camera, audioOutputDeviceId, videoSinkElementId, audioSink, videoSink) {
                    super(audioSink, videoSink);
                    this.audioOutputDeviceId = audioOutputDeviceId;
                    this.videoSinkElementId = videoSinkElementId;
                    this.microphone = microphone;
                    this.camera = camera;
                }
            };
            exports_10("DevicePlayArgs", DevicePlayArgs);
        }
    };
});
System.register("scripts/interfaces/PrototypeImplementation/Consumables/DeviceSubStream", ["scripts/interfaces/PrototypeImplementation/Consumables/SubStream", "../../Interfaces/SubStreamType.js", "scripts/interfaces/PrototypeImplementation/Consumables/SharedObjects"], function (exports_11, context_11) {
    "use strict";
    var SubStream_js_1, SubStreamType_js_1, SharedObjects_js_1, DeviceSubStream;
    var __moduleName = context_11 && context_11.id;
    return {
        setters: [
            function (SubStream_js_1_1) {
                SubStream_js_1 = SubStream_js_1_1;
            },
            function (SubStreamType_js_1_1) {
                SubStreamType_js_1 = SubStreamType_js_1_1;
            },
            function (SharedObjects_js_1_1) {
                SharedObjects_js_1 = SharedObjects_js_1_1;
            }
        ],
        execute: function () {
            DeviceSubStream = class DeviceSubStream extends SubStream_js_1.SubStream {
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
                        if (this.substreamType == SubStreamType_js_1.SubStreamType.Video) {
                            return SharedObjects_js_1.SharedObjects.Instance().GetCameraVideoDevice();
                        }
                        else if (this.substreamType == SubStreamType_js_1.SubStreamType.Audio) {
                            return SharedObjects_js_1.SharedObjects.Instance().GetCameraAudioDevice();
                        }
                    }
                    else {
                        // get audio sink id if can.
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
                        if (this.substreamType == SubStreamType_js_1.SubStreamType.Video) {
                            SharedObjects_js_1.SharedObjects.Instance().switchToCameraVideoDevice(newDeviceId);
                        }
                        else if (this.substreamType == SubStreamType_js_1.SubStreamType.Audio) {
                            SharedObjects_js_1.SharedObjects.Instance().switchToCameraAudioDevice(newDeviceId);
                        }
                    }
                    else {
                        if (this._remoteMedia) {
                            if (this.substreamType == SubStreamType_js_1.SubStreamType.Audio) {
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
            };
            exports_11("DeviceSubStream", DeviceSubStream);
        }
    };
});
System.register("scripts/interfaces/PrototypeImplementation/Consumables/DeviceStream", ["scripts/interfaces/PrototypeImplementation/Consumables/Stream", "../../Interfaces/StreamType.js"], function (exports_12, context_12) {
    "use strict";
    var Stream_js_1, StreamType_js_1, DeviceStream;
    var __moduleName = context_12 && context_12.id;
    return {
        setters: [
            function (Stream_js_1_1) {
                Stream_js_1 = Stream_js_1_1;
            },
            function (StreamType_js_1_1) {
                StreamType_js_1 = StreamType_js_1_1;
            }
        ],
        execute: function () {
            DeviceStream = class DeviceStream extends Stream_js_1.Stream {
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
                    super(isMine, onStateChange, StreamType_js_1.StreamType.Device, camera, microphone);
                }
            };
            exports_12("DeviceStream", DeviceStream);
        }
    };
});
System.register("scripts/interfaces/PrototypeImplementation/Consumables/MessageArgs", [], function (exports_13, context_13) {
    "use strict";
    var MessageArgs;
    var __moduleName = context_13 && context_13.id;
    return {
        setters: [],
        execute: function () {
            MessageArgs = class MessageArgs {
                constructor(message) {
                    this.stringMessage = message;
                }
            };
            exports_13("MessageArgs", MessageArgs);
        }
    };
});
System.register("scripts/interfaces/PrototypeImplementation/Consumables/ScreenStream", ["scripts/interfaces/PrototypeImplementation/Consumables/Stream", "../../Interfaces/StreamType.js"], function (exports_14, context_14) {
    "use strict";
    var Stream_js_2, StreamType_js_2, ScreenStream;
    var __moduleName = context_14 && context_14.id;
    return {
        setters: [
            function (Stream_js_2_1) {
                Stream_js_2 = Stream_js_2_1;
            },
            function (StreamType_js_2_1) {
                StreamType_js_2 = StreamType_js_2_1;
            }
        ],
        execute: function () {
            ScreenStream = class ScreenStream extends Stream_js_2.Stream {
                constructor(isMine, onStateChange, screenVideo, systemAudio) {
                    super(isMine, onStateChange, StreamType_js_2.StreamType.Device, screenVideo, systemAudio);
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
            };
            exports_14("ScreenStream", ScreenStream);
        }
    };
});
System.register("scripts/interfaces/PrototypeImplementation/Consumables/Participant", [], function (exports_15, context_15) {
    "use strict";
    var Participant;
    var __moduleName = context_15 && context_15.id;
    return {
        setters: [],
        execute: function () {
            Participant = class Participant {
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
            };
            exports_15("Participant", Participant);
        }
    };
});
System.register("scripts/interfaces/PrototypeImplementation/Consumables/ReceiveArgs", [], function (exports_16, context_16) {
    "use strict";
    var ReceiveArgs;
    var __moduleName = context_16 && context_16.id;
    return {
        setters: [],
        execute: function () {
            ReceiveArgs = class ReceiveArgs {
                constructor(senderId) {
                    this.senderId = senderId;
                }
            };
            exports_16("ReceiveArgs", ReceiveArgs);
        }
    };
});
System.register("scripts/interfaces/PrototypeImplementation/Consumables/SendArgs", [], function (exports_17, context_17) {
    "use strict";
    var SendArgs;
    var __moduleName = context_17 && context_17.id;
    return {
        setters: [],
        execute: function () {
            SendArgs = class SendArgs {
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
            };
            exports_17("SendArgs", SendArgs);
        }
    };
});
System.register("scripts/interfaces/PrototypeImplementation/Consumables/SendStatus", ["../../Interfaces/ISendStatus.js"], function (exports_18, context_18) {
    "use strict";
    var ISendStatus_js_1, SendStatus;
    var __moduleName = context_18 && context_18.id;
    return {
        setters: [
            function (ISendStatus_js_1_1) {
                ISendStatus_js_1 = ISendStatus_js_1_1;
            }
        ],
        execute: function () {
            SendStatus = class SendStatus {
                constructor() {
                    this.state = ISendStatus_js_1.SendState.New; // need to come back to this
                    this.deliveredToParticipants = Array(); // need to come back to this
                    this.viewedByParticipants = Array(); // need to come back to this
                }
            };
            exports_18("SendStatus", SendStatus);
        }
    };
});
System.register("scripts/interfaces/PrototypeImplementation/Consumables/StringMessageArgs", [], function (exports_19, context_19) {
    "use strict";
    var StringMessageArgs;
    var __moduleName = context_19 && context_19.id;
    return {
        setters: [],
        execute: function () {
            // old
            StringMessageArgs = class StringMessageArgs {
                constructor(message) {
                    this.message = message;
                }
            };
            exports_19("StringMessageArgs", StringMessageArgs);
        }
    };
});
System.register("scripts/interfaces/PrototypeImplementation/Consumables/DisplaySubStream", ["scripts/interfaces/PrototypeImplementation/Consumables/SubStream", "../../Interfaces/IScreenSubStream.js"], function (exports_20, context_20) {
    "use strict";
    var SubStream_js_2, IScreenSubStream_js_1, DisplaySubStream;
    var __moduleName = context_20 && context_20.id;
    return {
        setters: [
            function (SubStream_js_2_1) {
                SubStream_js_2 = SubStream_js_2_1;
            },
            function (IScreenSubStream_js_1_1) {
                IScreenSubStream_js_1 = IScreenSubStream_js_1_1;
            }
        ],
        execute: function () {
            DisplaySubStream = class DisplaySubStream extends SubStream_js_2.SubStream {
                get sourceDisplaySurface() {
                    return IScreenSubStream_js_1.SourceDisplaySurfaceType.Monitor;
                }
                set sourceDisplaySurface(SourceDisplaySurfaceType) {
                    // later
                }
                constructor(id, enableSubStream, type, sink) {
                    super(id, enableSubStream, type);
                }
            };
            exports_20("DisplaySubStream", DisplaySubStream);
        }
    };
});
System.register("scripts/interfaces/PrototypeImplementation/Consumables/Session", ["../../Interfaces/DeviceType.js", "../../Interfaces/ISession.js", "../../Interfaces/IStream.js", "../../Interfaces/SubStreamType.js", "scripts/interfaces/PrototypeImplementation/Consumables/CentralConnections", "scripts/interfaces/PrototypeImplementation/Consumables/DefaultConfig", "scripts/interfaces/PrototypeImplementation/Consumables/DeviceStream", "scripts/interfaces/PrototypeImplementation/Consumables/EntryPoint", "scripts/interfaces/PrototypeImplementation/Consumables/Participant", "scripts/interfaces/PrototypeImplementation/Consumables/ReceiveArgs", "scripts/interfaces/PrototypeImplementation/Consumables/ScreenStream", "scripts/interfaces/PrototypeImplementation/Consumables/SendStatus", "scripts/interfaces/PrototypeImplementation/Consumables/SharedObjects", "scripts/interfaces/PrototypeImplementation/Consumables/Sink", "scripts/interfaces/PrototypeImplementation/Consumables/StringMessageArgs", "scripts/interfaces/PrototypeImplementation/Consumables/SubStream", "scripts/interfaces/PrototypeImplementation/Consumables/DeviceSubStream", "scripts/interfaces/PrototypeImplementation/Consumables/DisplaySubStream"], function (exports_21, context_21) {
    "use strict";
    var DeviceType_js_1, ISession_js_1, IStream_js_1, SubStreamType_js_2, CentralConnections_js_1, DefaultConfig_js_1, DeviceStream_js_1, EntryPoint_js_2, Participant_js_1, ReceiveArgs_js_1, ScreenStream_js_1, SendStatus_js_1, SharedObjects_js_2, Sink_js_1, StringMessageArgs_js_1, SubStream_js_3, DeviceSubStream_js_1, DisplaySubStream_js_1, Session;
    var __moduleName = context_21 && context_21.id;
    return {
        setters: [
            function (DeviceType_js_1_1) {
                DeviceType_js_1 = DeviceType_js_1_1;
            },
            function (ISession_js_1_1) {
                ISession_js_1 = ISession_js_1_1;
            },
            function (IStream_js_1_1) {
                IStream_js_1 = IStream_js_1_1;
            },
            function (SubStreamType_js_2_1) {
                SubStreamType_js_2 = SubStreamType_js_2_1;
            },
            function (CentralConnections_js_1_1) {
                CentralConnections_js_1 = CentralConnections_js_1_1;
            },
            function (DefaultConfig_js_1_1) {
                DefaultConfig_js_1 = DefaultConfig_js_1_1;
            },
            function (DeviceStream_js_1_1) {
                DeviceStream_js_1 = DeviceStream_js_1_1;
            },
            function (EntryPoint_js_2_1) {
                EntryPoint_js_2 = EntryPoint_js_2_1;
            },
            function (Participant_js_1_1) {
                Participant_js_1 = Participant_js_1_1;
            },
            function (ReceiveArgs_js_1_1) {
                ReceiveArgs_js_1 = ReceiveArgs_js_1_1;
            },
            function (ScreenStream_js_1_1) {
                ScreenStream_js_1 = ScreenStream_js_1_1;
            },
            function (SendStatus_js_1_1) {
                SendStatus_js_1 = SendStatus_js_1_1;
            },
            function (SharedObjects_js_2_1) {
                SharedObjects_js_2 = SharedObjects_js_2_1;
            },
            function (Sink_js_1_1) {
                Sink_js_1 = Sink_js_1_1;
            },
            function (StringMessageArgs_js_1_1) {
                StringMessageArgs_js_1 = StringMessageArgs_js_1_1;
            },
            function (SubStream_js_3_1) {
                SubStream_js_3 = SubStream_js_3_1;
            },
            function (DeviceSubStream_js_1_1) {
                DeviceSubStream_js_1 = DeviceSubStream_js_1_1;
            },
            function (DisplaySubStream_js_1_1) {
                DisplaySubStream_js_1 = DisplaySubStream_js_1_1;
            }
        ],
        execute: function () {
            //namespace ls is fm.liveswitch;
            Session = class Session {
                //private videoContainer: HTMLElement | null = null;
                constructor(channel, liveSwitchClient, notifyLeave, videoContainer, invitation) {
                    this.state = ISession_js_1.SessionState.New;
                    this.sendMessage = (args) => {
                        var _a;
                        if (this.canSendMessages) {
                            let sendStatus = new SendStatus_js_1.SendStatus(); // need to get the whole participants things sorted out.
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
                        return new SendStatus_js_1.SendStatus();
                    };
                    this.autoplayDeviceCameraStreams = true;
                    this.autoplayDeviceMicrophoneStreams = true;
                    this.autoplayStreams = true;
                    // Need to do
                    this.participants = new Array(); // in Progress
                    this.autoplayScreenDisplayStreams = true;
                    this.defaultConfig = DefaultConfig_js_1.DefaultConfig.Instance();
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
                    this.upstreamState = ISession_js_1.SessionState.New;
                    this.downstreamState = ISession_js_1.SessionState.New;
                    // Not doing
                    this.autoplayScreenSystemAudioStreams = true;
                    this.notifyLeave = notifyLeave;
                    this.participants.push(new Participant_js_1.Participant(liveSwitchClient.getId(), true));
                    EntryPoint_js_2.LogDebug("Session constructor was called");
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
                    this._LiveSwitchClient.join(channel, token).then((channel) => __awaiter(this, void 0, void 0, function* () {
                        me.OnClientJoinInAChannel(channel);
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
                    SharedObjects_js_2.SharedObjects.Instance().onSessionLeave(this);
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
                    if (args) {
                        // we ignore system audio for now, do now do anything for now
                        //args.systemAudio;
                    }
                    let promise = new Promise((resolve, reject) => {
                        if (!me.me.screenStream) {
                            SharedObjects_js_2.SharedObjects.Instance().createScreenStream(me, true, false).then((localMedia) => {
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
                            SharedObjects_js_2.SharedObjects.Instance().createCameraStream(me, null, true, true).then((localMedia) => {
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
                OnClientJoinInAChannel(channel) {
                    if (!channel) {
                        return;
                    }
                    var me = this;
                    me.id = channel.getId();
                    this.liveSwitchChannel = channel;
                    /// let open a datachannel on mcu
                    // let leave messageing alone
                    this.openMcuConnectionForDataChannel(channel);
                    SharedObjects_js_2.SharedObjects.Instance().createCameraStream(this, this._videoContainer, true, true).then((localMedia) => {
                        this.openSfuUpstreamConnection(channel, localMedia, false, true, true);
                        // channel.addOnRemoteClientJoin((client) => {
                        channel.addOnRemoteUpstreamConnectionUpdate((connectioninfo) => {
                            me.participants.forEach((participant) => {
                                if (participant.id === connectioninfo.getClientId()) {
                                    if (connectioninfo.getTag() == Session.cameraAndMircophoneConnectionTag) {
                                        //Fix here: need to see what we updated before we replace the new connectionInfo
                                        // not anymore
                                        CentralConnections_js_1.CentralConnections.Instance().remoteConnectionInfoForCamera.set(connectioninfo.getClientId(), connectioninfo);
                                    }
                                    if (connectioninfo.getTag() == Session.screenAndSystemAudioConnectionTag) {
                                        //Fix here: need to see what we updated before we replace the new connectionInfo
                                        CentralConnections_js_1.CentralConnections.Instance().remoteConnectionInfoForScreen.set(connectioninfo.getClientId(), connectioninfo);
                                    }
                                }
                            });
                        });
                        channel.addOnRemoteClientLeave((clientInfo) => {
                            for (let i = 0; i < me.participants.length; i++) {
                                let participant = me.participants[i];
                                if (participant.id == clientInfo.getId()) {
                                    delete me.participants[i];
                                    CentralConnections_js_1.CentralConnections.Instance().remoteConnectionInfoForScreen.delete(clientInfo.getId());
                                    CentralConnections_js_1.CentralConnections.Instance().remoteConnectionInfoForCamera.delete(clientInfo.getId());
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
                                participantForThisConnectionInfo = new Participant_js_1.Participant(remoteConnectionInfo.getClientId(), false);
                                me.participants.push(participantForThisConnectionInfo);
                            }
                            if (remoteConnectionInfo.getTag() == Session.cameraAndMircophoneConnectionTag) {
                                CentralConnections_js_1.CentralConnections.Instance().remoteConnectionInfoForCamera.set(remoteConnectionInfo.getClientId(), remoteConnectionInfo);
                            }
                            if (remoteConnectionInfo.getTag() == Session.screenAndSystemAudioConnectionTag) {
                                CentralConnections_js_1.CentralConnections.Instance().remoteConnectionInfoForScreen.set(remoteConnectionInfo.getClientId(), remoteConnectionInfo);
                            }
                            if (remoteConnectionInfo.getTag() == Session.cameraAndMircophoneConnectionTag) {
                                me.openSfuDownstreamConnection(remoteConnectionInfo, channel, false, participantForThisConnectionInfo);
                            }
                            if (remoteConnectionInfo.getTag() == Session.screenAndSystemAudioConnectionTag) {
                                me.openSfuDownstreamConnection(remoteConnectionInfo, channel, true, participantForThisConnectionInfo);
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
                                participantForThisConnectionInfo = new Participant_js_1.Participant(remoteConnectionInfo.getId(), false);
                                me.participants.push(participantForThisConnectionInfo);
                            }
                            if (remoteConnectionInfo.getTag() == Session.cameraAndMircophoneConnectionTag) {
                                CentralConnections_js_1.CentralConnections.Instance().remoteConnectionInfoForCamera.set(remoteConnectionInfo.getClientId(), remoteConnectionInfo);
                            }
                            if (remoteConnectionInfo.getTag() == Session.screenAndSystemAudioConnectionTag) {
                                CentralConnections_js_1.CentralConnections.Instance().remoteConnectionInfoForScreen.set(remoteConnectionInfo.getClientId(), remoteConnectionInfo);
                            }
                            if (remoteConnectionInfo.getTag() == Session.cameraAndMircophoneConnectionTag) {
                                me.openSfuDownstreamConnection(remoteConnectionInfo, channel, false, participantForThisConnectionInfo); // added downstream someone joins automatically
                            }
                            if (remoteConnectionInfo.getTag() == Session.screenAndSystemAudioConnectionTag) {
                                me.openSfuDownstreamConnection(remoteConnectionInfo, channel, true, participantForThisConnectionInfo); // added downstream someone joins automatically
                            }
                        });
                    });
                    //});
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
                                let message = new StringMessageArgs_js_1.StringMessageArgs(dataChannelReceiveArgs.getDataString());
                                let sender = new ReceiveArgs_js_1.ReceiveArgs(dataChannelReceiveArgs.getRemoteConnectionInfo().getUserAlias());
                                //(result as StringMessageArgs) = message;
                                //(result as ReceiveArgs) = sender;
                                result.message = dataChannelReceiveArgs.getDataString();
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
                openSfuDownstreamConnection(remoteConnectionInfo, channel, screenStream, participant) {
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
                    let audioDeviceType = DeviceType_js_1.DeviceType.Microphone;
                    if (screenStream) {
                        // this doesn't make sense
                        audioDeviceType = DeviceType_js_1.DeviceType.Microphone;
                    }
                    audioStream = new fm.liveswitch.AudioStream(remoteMedia);
                    // not sure if made a mistake here
                    //audioStream.changeDirection(fm.liveswitch.StreamDirection.Inactive);
                    if (!screenStream) {
                        audioStream.setLocalDirection(fm.liveswitch.StreamDirection.ReceiveOnly);
                    }
                    audioSink = new Sink_js_1.Sink(audioDeviceType, () => {
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
                    if (!remoteConnectionInfo.getHasAudio() || !this.autoplayStreams || !autoPlayAudio) {
                        audioStream.changeDirection(fm.liveswitch.StreamDirection.Inactive);
                    }
                    videoStream = new fm.liveswitch.VideoStream(remoteMedia);
                    videoStream.getInfo();
                    let videoDeviceSink = DeviceType_js_1.DeviceType.Camera;
                    if (screenStream) {
                        videoDeviceSink = DeviceType_js_1.DeviceType.Screen;
                    }
                    videoSink = new Sink_js_1.Sink(videoDeviceSink, () => {
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
                    if (!remoteConnectionInfo.getHasVideo() || !this.autoplayStreams || !autoPlayVideo) {
                        videoStream.changeDirection(fm.liveswitch.StreamDirection.Inactive);
                    }
                    else {
                        SharedObjects_js_2.SharedObjects.Instance().getLayoutManager(me).addRemoteView(remoteMedia.getId(), remoteMedia.getView());
                    }
                    let updateConnectionForVideo = (enableVideo) => {
                        let connectionConfig = connection.getConfig();
                        let layoutHasRemoteView = false;
                        SharedObjects_js_2.SharedObjects.Instance().getLayoutManager(me).getRemoteViewIds().forEach((id) => {
                            if (id == remoteMedia.getId()) {
                                layoutHasRemoteView = true;
                            }
                        });
                        if (enableVideo) {
                            let hasVideo = false;
                            if (screenStream) {
                                hasVideo = CentralConnections_js_1.CentralConnections.Instance().remoteConnectionInfoForScreen.get(remoteConnectionInfo.getClientId()).getHasVideo();
                            }
                            else {
                                hasVideo = CentralConnections_js_1.CentralConnections.Instance().remoteConnectionInfoForCamera.get(remoteConnectionInfo.getClientId()).getHasVideo();
                            }
                            if (hasVideo) {
                                connectionConfig.setVideoDirection(me._Direction(fm.liveswitch.StreamDirection.ReceiveOnly));
                                if (!layoutHasRemoteView) {
                                    SharedObjects_js_2.SharedObjects.Instance().getLayoutManager(me).addRemoteView(remoteMedia.getId(), remoteMedia.getView());
                                }
                            }
                        }
                        else {
                            if (layoutHasRemoteView) {
                                SharedObjects_js_2.SharedObjects.Instance().getLayoutManager(me).removeRemoteView(remoteMedia.getId());
                            }
                            connectionConfig.setVideoDirection(me._Direction(fm.liveswitch.StreamDirection.Inactive));
                        }
                        connection.update(connectionConfig);
                    };
                    let updateConnectionForAudio = (enableAudio) => {
                        let connectionConfig = connection.getConfig();
                        let hasAudio = CentralConnections_js_1.CentralConnections.Instance().remoteConnectionInfoForCamera.get(remoteConnectionInfo.getClientId()).getHasAudio();
                        if (screenStream) {
                            hasAudio = CentralConnections_js_1.CentralConnections.Instance().remoteConnectionInfoForScreen.get(remoteConnectionInfo.getClientId()).getHasAudio();
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
                        let videoSubStream = new DisplaySubStream_js_1.DisplaySubStream(videoStream.getId(), updateConnectionForVideo, SubStreamType_js_2.SubStreamType.Video, videoSink); // need to create this
                        let audioSubStream = new SubStream_js_3.SubStream(audioStream.getId(), updateConnectionForAudio, SubStreamType_js_2.SubStreamType.Audio, audioSink); // need to create this
                        participant.screenStreams.push(new ScreenStream_js_1.ScreenStream(false, onStateChangeOnStream, videoSubStream, audioSubStream));
                    }
                    else {
                        let videoSubStream = new DeviceSubStream_js_1.DeviceSubStream(videoStream.getId(), updateConnectionForVideo, SubStreamType_js_2.SubStreamType.Video, videoSink); // need to create this
                        let audioSubStream = new DeviceSubStream_js_1.DeviceSubStream(audioStream.getId(), updateConnectionForAudio, SubStreamType_js_2.SubStreamType.Audio, audioSink, null, false, remoteMedia); // need to create this
                        participant.deviceStreams.push(new DeviceStream_js_1.DeviceStream(false, onStateChangeOnStream, videoSubStream, audioSubStream));
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
                        fm.liveswitch.Log.info(connection.getId() + ': SFU downstream connection state is ' +
                            new fm.liveswitch.ConnectionStateWrapper(connection.getState()).toString() + '.');
                        // Cleanup if the connection closes or fails.
                        if (connection.getState() == fm.liveswitch.ConnectionState.Closing ||
                            connection.getState() == fm.liveswitch.ConnectionState.Failing) {
                            if (connection.getRemoteClosed()) {
                                fm.liveswitch.Log.info(connection.getId() + ': Media server closed the connection.');
                            }
                            // Remove the remote view from the layout.
                            SharedObjects_js_2.SharedObjects.Instance().getLayoutManager(this).removeRemoteView(remoteMedia.getId());
                            remoteMedia.destroy();
                            delete this.sfuDownstreamConnections[connection.getId()];
                        }
                        else if (connection.getState() == fm.liveswitch.ConnectionState.Failed) {
                            // Note: no need to close the connection as it's done for us.
                            me.updateDownstreamState(ISession_js_1.SessionState.Terminated);
                            if (onStateChangeOnStream) {
                                onStateChangeOnStream(IStream_js_1.StreamState.Disconnected);
                            }
                            this.openSfuDownstreamConnection(remoteConnectionInfo, channel, screenStream, participant);
                        }
                        else if (connection.getState() == fm.liveswitch.ConnectionState.Connected) {
                            EntryPoint_js_2.LogDebug("SFU Downstream connected");
                            me.updateDownstreamState(ISession_js_1.SessionState.Connected);
                            if (onStateChangeOnStream) {
                                onStateChangeOnStream(IStream_js_1.StreamState.Connected);
                            }
                        }
                        else if (connection.getState() == fm.liveswitch.ConnectionState.Failed || connection.getState() == fm.liveswitch.ConnectionState.Closed) {
                            me.updateDownstreamState(ISession_js_1.SessionState.Terminated);
                            if (onStateChangeOnStream) {
                                onStateChangeOnStream(IStream_js_1.StreamState.Disconnected);
                            }
                        }
                        else if (connection.getState() == fm.liveswitch.ConnectionState.Closed) {
                            me.updateDownstreamState(ISession_js_1.SessionState.Terminated);
                        }
                        else if (connection.getState() == fm.liveswitch.ConnectionState.Connecting) {
                            me.updateDownstreamState(ISession_js_1.SessionState.Connecting);
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
                        let connectionConfig = connection.getConfig();
                        let layoutHasRemoteView = false;
                        if (enableVideo) {
                            connectionConfig.setVideoDirection(me._Direction(fm.liveswitch.StreamDirection.SendOnly));
                        }
                        else {
                            connectionConfig.setVideoDirection(me._Direction(fm.liveswitch.StreamDirection.Inactive));
                        }
                        connection.update(connectionConfig);
                    };
                    let updateConnectionForAudio = (enableAudio) => {
                        let connectionConfig = connection.getConfig();
                        if (enableAudio) {
                            connectionConfig.setAudioDirection(me._Direction(fm.liveswitch.StreamDirection.SendOnly));
                        }
                        else {
                            connectionConfig.setAudioDirection(me._Direction(fm.liveswitch.StreamDirection.Inactive));
                        }
                        connection.update(connectionConfig);
                    };
                    if (screen) {
                    }
                    else {
                    }
                    let onStateChangeOnStream = null; // need this
                    //update the substream state
                    if (screen) {
                        let videoSubStream = new DisplaySubStream_js_1.DisplaySubStream(videoStream.getId(), updateConnectionForVideo, SubStreamType_js_2.SubStreamType.Video); // need to create this
                        me.me.screenStreams.push(new ScreenStream_js_1.ScreenStream(true, onStateChangeOnStream, videoSubStream, null));
                    }
                    else {
                        let videoSubStream = new DeviceSubStream_js_1.DeviceSubStream(videoStream.getId(), updateConnectionForVideo, SubStreamType_js_2.SubStreamType.Video, null, null, true); // need to create this
                        let audioSubStream = new DeviceSubStream_js_1.DeviceSubStream(audioStream.getId(), updateConnectionForAudio, SubStreamType_js_2.SubStreamType.Audio, null, null, true); // need to create this
                        me.me.deviceStreams.push(new DeviceStream_js_1.DeviceStream(true, onStateChangeOnStream, videoSubStream, audioSubStream));
                    }
                    this.sfuUpstreamConnection[connection.getId()] = connection;
                    connection.setDisableAutomaticIceServers(false); // just with auto turn for now
                    connection.addOnStateChange((connection) => {
                        EntryPoint_js_2.LogDebug(connection.getId() + ': SFU upstream connection state is ' +
                            new fm.liveswitch.ConnectionStateWrapper(connection.getState()).toString() + '.');
                        if (connection.getState() == fm.liveswitch.ConnectionState.Closing ||
                            connection.getState() == fm.liveswitch.ConnectionState.Failing) {
                            if (connection.getRemoteClosed()) {
                                EntryPoint_js_2.LogDebug(connection.getId() + ': Media server closed the connection.');
                            }
                        }
                        else if (connection.getState() == fm.liveswitch.ConnectionState.Failed) {
                            // Note: no need to close the connection as it's done for us.
                            this.openSfuUpstreamConnection(channel, localMedia, screen);
                            me.updateUpstreamState(ISession_js_1.SessionState.Terminated);
                            if (onStateChangeOnStream) {
                                onStateChangeOnStream(IStream_js_1.StreamState.Disconnected);
                            }
                        }
                        else if (connection.getState() == fm.liveswitch.ConnectionState.Connected) {
                            me.updateUpstreamState(ISession_js_1.SessionState.Connected);
                            if (onStateChangeOnStream) {
                                onStateChangeOnStream(IStream_js_1.StreamState.Connected);
                            }
                        }
                        else if (connection.getState() == fm.liveswitch.ConnectionState.Closed) {
                            me.updateUpstreamState(ISession_js_1.SessionState.Terminated);
                            if (onStateChangeOnStream) {
                                onStateChangeOnStream(IStream_js_1.StreamState.Disconnected);
                            }
                        }
                        else if (connection.getState() == fm.liveswitch.ConnectionState.Connecting) {
                            me.updateUpstreamState(ISession_js_1.SessionState.Connecting);
                        }
                    });
                    // Open the connection.
                    connection.open();
                    return connection;
                }
                updateUpstreamState(upstreamState) {
                    let newState = this.state;
                    this.upstreamState = upstreamState;
                    if (upstreamState == ISession_js_1.SessionState.Terminated) {
                        newState = upstreamState;
                    }
                    if (upstreamState == ISession_js_1.SessionState.Connecting) {
                        newState = upstreamState;
                    }
                    if (upstreamState == ISession_js_1.SessionState.Connected) {
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
                    if (downstreamState == ISession_js_1.SessionState.Terminated) {
                        newState = downstreamState;
                    }
                    if (downstreamState == ISession_js_1.SessionState.Connecting) {
                        newState = downstreamState;
                    }
                    if (downstreamState == ISession_js_1.SessionState.Connected) {
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
            };
            exports_21("Session", Session);
            // internal
            Session.cameraAndMircophoneConnectionTag = "ca";
            Session.screenAndSystemAudioConnectionTag = "sa";
        }
    };
});
System.register("scripts/interfaces/PrototypeImplementation/Consumables/Conference", ["scripts/interfaces/PrototypeImplementation/Consumables/Session"], function (exports_22, context_22) {
    "use strict";
    var Session_js_1, Conference;
    var __moduleName = context_22 && context_22.id;
    return {
        setters: [
            function (Session_js_1_1) {
                Session_js_1 = Session_js_1_1;
            }
        ],
        execute: function () {
            Conference = class Conference extends Session_js_1.Session {
                constructor(channel, liveSwitchClient, notifyLeave, videoContainer, invitation) {
                    super(channel, liveSwitchClient, notifyLeave, videoContainer, invitation);
                }
            };
            exports_22("Conference", Conference);
        }
    };
});
System.register("scripts/interfaces/PrototypeImplementation/Consumables/CameraSource", ["scripts/interfaces/PrototypeImplementation/Consumables/Source"], function (exports_23, context_23) {
    "use strict";
    var Source_js_1, CameraSource, preview;
    var __moduleName = context_23 && context_23.id;
    return {
        setters: [
            function (Source_js_1_1) {
                Source_js_1 = Source_js_1_1;
            }
        ],
        execute: function () {
            CameraSource = class CameraSource extends Source_js_1.Source {
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
            };
            exports_23("CameraSource", CameraSource);
            preview = class preview {
                constructor(localMedia, layoutManager) {
                    this.layoutManager = layoutManager;
                }
            };
            exports_23("preview", preview);
        }
    };
});
System.register("scripts/interfaces/PrototypeImplementation/Consumables/MicrophoneSource", ["scripts/interfaces/PrototypeImplementation/Consumables/Source"], function (exports_24, context_24) {
    "use strict";
    var Source_js_2, MicrophoneSource;
    var __moduleName = context_24 && context_24.id;
    return {
        setters: [
            function (Source_js_2_1) {
                Source_js_2 = Source_js_2_1;
            }
        ],
        execute: function () {
            MicrophoneSource = class MicrophoneSource extends Source_js_2.Source {
                constructor(sourceDevice, autoPreview) {
                    super(sourceDevice, autoPreview);
                }
            };
            exports_24("MicrophoneSource", MicrophoneSource);
        }
    };
});
System.register("scripts/interfaces/PrototypeImplementation/Consumables/ScreenSource", ["scripts/interfaces/PrototypeImplementation/Consumables/Source"], function (exports_25, context_25) {
    "use strict";
    var Source_js_3, ScreenSource;
    var __moduleName = context_25 && context_25.id;
    return {
        setters: [
            function (Source_js_3_1) {
                Source_js_3 = Source_js_3_1;
            }
        ],
        execute: function () {
            ScreenSource = class ScreenSource extends Source_js_3.Source {
                constructor(display, sourceDevice) {
                    super(sourceDevice);
                    this.display = display;
                }
            };
            exports_25("ScreenSource", ScreenSource);
        }
    };
});
System.register("scripts/interfaces/PrototypeImplementation/Consumables/Client", ["../../Interfaces/IClient.js", "scripts/interfaces/PrototypeImplementation/Consumables/DefaultConfig", "scripts/interfaces/PrototypeImplementation/Consumables/EntryPoint", "scripts/interfaces/PrototypeImplementation/Consumables/Conference", "scripts/interfaces/PrototypeImplementation/Consumables/CameraSource", "scripts/interfaces/PrototypeImplementation/Consumables/Device", "../../Interfaces/DeviceType.js", "scripts/interfaces/PrototypeImplementation/Consumables/MicrophoneSource", "scripts/interfaces/PrototypeImplementation/Consumables/ScreenSource"], function (exports_26, context_26) {
    "use strict";
    var IClient_js_1, DefaultConfig_js_2, EntryPoint_js_3, Conference_js_1, CameraSource_js_1, Device_js_2, DeviceType_js_2, MicrophoneSource_js_1, ScreenSource_js_1, Client;
    var __moduleName = context_26 && context_26.id;
    return {
        setters: [
            function (IClient_js_1_1) {
                IClient_js_1 = IClient_js_1_1;
            },
            function (DefaultConfig_js_2_1) {
                DefaultConfig_js_2 = DefaultConfig_js_2_1;
            },
            function (EntryPoint_js_3_1) {
                EntryPoint_js_3 = EntryPoint_js_3_1;
            },
            function (Conference_js_1_1) {
                Conference_js_1 = Conference_js_1_1;
            },
            function (CameraSource_js_1_1) {
                CameraSource_js_1 = CameraSource_js_1_1;
            },
            function (Device_js_2_1) {
                Device_js_2 = Device_js_2_1;
            },
            function (DeviceType_js_2_1) {
                DeviceType_js_2 = DeviceType_js_2_1;
            },
            function (MicrophoneSource_js_1_1) {
                MicrophoneSource_js_1 = MicrophoneSource_js_1_1;
            },
            function (ScreenSource_js_1_1) {
                ScreenSource_js_1 = ScreenSource_js_1_1;
            }
        ],
        execute: function () {
            Client = class Client {
                constructor(userId, token) {
                    this.isNew = true;
                    this.isConnecting = false;
                    this.isConnected = false;
                    this.isDisconnected = false;
                    this.notifyConferenceLeaving = {};
                    this.conferences = new Array();
                    this.heldConferences = new Array();
                    this.defaultConfig = DefaultConfig_js_2.DefaultConfig.Instance();
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
                    return __awaiter(this, void 0, void 0, function* () {
                        var me = this;
                        this.onstatechange = ((client, state) => {
                            EntryPoint_js_3.LogDebug(state.toString());
                        });
                        let promise = new Promise((resolve, reject) => {
                            // need to backoff .. maybe later
                            this._LiveSwitchClient.addOnStateChange((state) => {
                                if (state.getState() == fm.liveswitch.ClientState.New) {
                                    me.changeStateTo(IClient_js_1.ClientState.New);
                                }
                                else if (state.getState() == fm.liveswitch.ClientState.Registering) {
                                    me.changeStateTo(IClient_js_1.ClientState.Connecting);
                                }
                                else if (state.getState() == fm.liveswitch.ClientState.Registered) {
                                    me.changeStateTo(IClient_js_1.ClientState.Connected);
                                }
                                else if (state.getState() == fm.liveswitch.ClientState.Unregistered)
                                    me.changeStateTo(IClient_js_1.ClientState.Disconnected);
                                {
                                }
                            });
                            this._LiveSwitchClient.register(this._Token).then((o) => {
                                if (o != null) {
                                    this._Channels = o;
                                }
                                EntryPoint_js_3.LogDebug("Client is registered");
                                // Do
                                resolve();
                            }).fail((o) => {
                                EntryPoint_js_3.LogDebug(o.name + ": " + o.message + "\n" + o.stack);
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
                    if (args.videoSinkElementId) {
                        container = document.getElementById(args.videoSinkElementId);
                    }
                    else {
                        throw new Error("Please provide videoSinkElementId (HTMLElement)");
                    }
                    // conferenceId: string, container ?: HTMLElement
                    if (container == null) {
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
                    let conference = new Conference_js_1.Conference(args.conferenceId, this._LiveSwitchClient, this.notifyConferenceLeaving[args.conferenceId], container);
                    this.conferences.push(conference);
                    return conference;
                }
                // Need to do
                get camera() {
                    let promise = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
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
                    let promise = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
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
                    let promise = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
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
                    let promise = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                        let cameraSourrces = new Array(); //
                        let localmedia = new fm.liveswitch.LocalMedia(false, true);
                        localmedia === null || localmedia === void 0 ? void 0 : localmedia.getVideoSourceInputs().then((inputs) => {
                            inputs.forEach((input) => {
                                let device = new Device_js_2.Device(input.getId(), input.getName(), DeviceType_js_2.DeviceType.Camera, input);
                                cameraSourrces.push(new CameraSource_js_1.CameraSource(device));
                                resolve(cameraSourrces);
                            });
                        }).fail((ex) => {
                            reject(ex);
                        });
                    }));
                    return promise;
                }
                get microphones() {
                    let promise = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                        let micSourrces = new Array(); //
                        let localmedia = new fm.liveswitch.LocalMedia(true, false);
                        localmedia === null || localmedia === void 0 ? void 0 : localmedia.getAudioSourceInputs().then((inputs) => {
                            inputs.forEach((input) => {
                                let device = new Device_js_2.Device(input.getId(), input.getName(), DeviceType_js_2.DeviceType.Microphone, input);
                                micSourrces.push(new MicrophoneSource_js_1.MicrophoneSource(device));
                                resolve(micSourrces);
                            });
                        }).fail((ex) => {
                            reject(ex);
                        });
                    }));
                    return promise;
                }
                get screens() {
                    let promise = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                        let screenSourrces = new Array(); //
                        let localmedia = new fm.liveswitch.LocalMedia(false, false, true);
                        localmedia === null || localmedia === void 0 ? void 0 : localmedia.getVideoSourceInputs().then((inputs) => {
                            let i = 1;
                            inputs.forEach((input) => {
                                let device = new Device_js_2.Device(input.getId(), input.getName(), DeviceType_js_2.DeviceType.Microphone, input);
                                screenSourrces.push(new ScreenSource_js_1.ScreenSource(i, device));
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
                    if (state == IClient_js_1.ClientState.New) {
                        this.isNew = true;
                    }
                    else if (state == IClient_js_1.ClientState.Connecting) {
                        this.isConnecting = true;
                    }
                    else if (state == IClient_js_1.ClientState.Connected) {
                        this.isConnected = true;
                    }
                    else if (state == IClient_js_1.ClientState.Disconnected) {
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
            };
            exports_26("Client", Client);
        }
    };
});
System.register("scripts/AudioOnly", ["scripts/interfaces/PrototypeImplementation/Consumables/Client"], function (exports_27, context_27) {
    "use strict";
    var Client_js_1, audioOnly, demo;
    var __moduleName = context_27 && context_27.id;
    return {
        setters: [
            function (Client_js_1_1) {
                Client_js_1 = Client_js_1_1;
            }
        ],
        execute: function () {
            audioOnly = class audioOnly {
                constructor() {
                    /// Find elements in html page.
                    audioOnly.clientJoinButton = document.getElementById('clientJoin');
                    audioOnly.clientJoinButton.addEventListener("click", this.joinConfererence);
                    audioOnly.leaveConferenceButton = document.getElementById('leaveConference');
                    audioOnly.leaveConferenceButton.addEventListener("click", this.conferenceLeave);
                    audioOnly.leaveConferenceButton.disabled = true;
                }
                joinConfererence() {
                    let client = new Client_js_1.Client();
                    client.connect().then(() => {
                        audioOnly.conference = client.join({ conferenceId: "123123", camera: false });
                        audioOnly.leaveConferenceButton.disabled = false;
                    });
                }
                conferenceLeave() {
                    audioOnly.conference.leave();
                    audioOnly.conference = null;
                }
            };
            exports_27("audioOnly", audioOnly);
            audioOnly.leaveConferenceButton = null;
            audioOnly.clientJoinButton = null;
            audioOnly.conference = null;
            demo = new audioOnly();
        }
    };
});
System.register("scripts/HelloWorld", ["scripts/interfaces/PrototypeImplementation/Consumables/Client"], function (exports_28, context_28) {
    "use strict";
    var Client_js_2, helloWorld, demo;
    var __moduleName = context_28 && context_28.id;
    return {
        setters: [
            function (Client_js_2_1) {
                Client_js_2 = Client_js_2_1;
            }
        ],
        execute: function () {
            helloWorld = class helloWorld {
                constructor() {
                    /// Find elements in html page.
                    helloWorld.video = document.getElementById('video');
                    helloWorld.video.style.display = 'block';
                    helloWorld.clientJoinButton = document.getElementById('clientJoin');
                    helloWorld.clientJoinButton.addEventListener("click", this.joinConfererence);
                    helloWorld.userId = document.getElementById('userName');
                    helloWorld.leaveConferenceButton = document.getElementById('leaveConference');
                    helloWorld.leaveConferenceButton.addEventListener("click", this.conferenceLeave);
                    helloWorld.leaveConferenceButton.disabled = true;
                }
                joinConfererence() {
                    let client = new Client_js_2.Client(helloWorld.userId.value);
                    client.connect().then(() => {
                        helloWorld.conference = client.join({ conferenceId: "123123", videoSinkElementId: helloWorld.video.id });
                        helloWorld.leaveConferenceButton.disabled = false;
                    });
                }
                conferenceLeave() {
                    helloWorld.conference.leave();
                    helloWorld.conference = null;
                }
            };
            exports_28("helloWorld", helloWorld);
            helloWorld.leaveConferenceButton = null;
            helloWorld.clientJoinButton = null;
            helloWorld.video = null;
            helloWorld.userId = null;
            helloWorld.conference = null;
            demo = new helloWorld();
        }
    };
});
System.register("scripts/interfaces/PrototypeImplementation/Consumables/DeviceManager", ["../../Interfaces/IDeviceManager.js"], function (exports_29, context_29) {
    "use strict";
    var IDeviceManager_js_1, DeviceManager, DeviceInfo;
    var __moduleName = context_29 && context_29.id;
    return {
        setters: [
            function (IDeviceManager_js_1_1) {
                IDeviceManager_js_1 = IDeviceManager_js_1_1;
            }
        ],
        execute: function () {
            DeviceManager = class DeviceManager {
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
                                let device = new DeviceInfo(input.getId(), input.getName(), IDeviceManager_js_1.DeviceKind.VideoInput);
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
                                let device = new DeviceInfo(input.getId(), input.getName(), IDeviceManager_js_1.DeviceKind.AudioInput);
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
                                let device = new DeviceInfo(audioOutput.getId(), audioOutput.getName(), IDeviceManager_js_1.DeviceKind.AudioOutput);
                                devices.push(device);
                            });
                            resolve(devices);
                        }).fail((ex) => {
                            reject(ex);
                        });
                    });
                    return promise;
                }
            };
            exports_29("DeviceManager", DeviceManager);
            DeviceInfo = class DeviceInfo {
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
            };
            exports_29("DeviceInfo", DeviceInfo);
        }
    };
});
System.register("scripts/app", ["scripts/interfaces/PrototypeImplementation/Consumables/Client", "scripts/interfaces/PrototypeImplementation/Consumables/MessageArgs", "./interfaces/Interfaces/ISession.js", "scripts/interfaces/PrototypeImplementation/Consumables/DeviceManager"], function (exports_30, context_30) {
    "use strict";
    var Client_js_3, MessageArgs_js_1, ISession_js_2, DeviceManager_js_1, App, demo;
    var __moduleName = context_30 && context_30.id;
    return {
        setters: [
            function (Client_js_3_1) {
                Client_js_3 = Client_js_3_1;
            },
            function (MessageArgs_js_1_1) {
                MessageArgs_js_1 = MessageArgs_js_1_1;
            },
            function (ISession_js_2_1) {
                ISession_js_2 = ISession_js_2_1;
            },
            function (DeviceManager_js_1_1) {
                DeviceManager_js_1 = DeviceManager_js_1_1;
            }
        ],
        execute: function () {
            App = class App {
                constructor() {
                    this.sendMessage = () => {
                        let text = App.inputText.value;
                        if (App.conference != null) {
                            App.conference.sendMessage(new MessageArgs_js_1.MessageArgs(text));
                        }
                        App.inputText.value = "";
                        App.writeMessage("Me: " + text);
                    };
                    this.CameraMuted = false;
                    this.AudioMuted = false;
                    App.video = document.getElementById('video');
                    App.video.style.display = 'block';
                    App.text = document.getElementById('eventLog');
                    App.inputText = document.getElementById('sendInput');
                    App.sendButton = document.getElementById('sendButton');
                    App.sendButton.addEventListener("click", this.sendMessage);
                    App.clientJoinButton = document.getElementById('clientJoin');
                    App.clientJoinButton.addEventListener("click", this.joinConfererence); // modify       
                    App.userId = document.getElementById('userName');
                    App.switchToScreenShare = document.getElementById('switchScreenShare');
                    App.switchToScreenShare.addEventListener("click", this.switchMode); // modify        
                    App.switchToScreenShare.disabled = true;
                    App.leaveConferenceButton = document.getElementById('leaveConference');
                    App.leaveConferenceButton.addEventListener("click", this.conferenceLeave); // modify    
                    App.leaveConferenceButton.disabled = true;
                    App.toggleAudioButton = document.getElementById('toggleAudioMute');
                    App.toggleAudioButton.addEventListener("click", this.toggleAudio); // modify    
                    App.toggleAudioButton.disabled = true;
                    App.toggleVideoButton = document.getElementById('toggleVideoMute');
                    App.toggleVideoButton.addEventListener("click", this.toggleVideo); // modify    
                    App.toggleVideoButton.disabled = true;
                }
                joinConfererence() {
                    App.client = new Client_js_3.Client(App.userId.value);
                    App.client.connect().then(() => {
                        App.conference = App.client.join({ conferenceId: "123123", videoSinkElementId: App.video.id });
                        App.conference.onIncomingMessage = (_session, message) => {
                            App.writeMessage(message.senderId + ": " + message.stringMessage);
                        };
                        App.isCameraOn = true;
                        App.leaveConferenceButton.disabled = false;
                        App.switchToScreenShare.disabled = false;
                        App.toggleAudioButton.value = "Mute Audio";
                        App.toggleVideoButton.value = "Mute Video";
                        App.toggleAudioButton.disabled = false;
                        App.toggleVideoButton.disabled = false;
                        let audioDeviceList = document.getElementById('audioDeviceList');
                        if (audioDeviceList) {
                            audioDeviceList.options.length = 0;
                        }
                        let videoDeviceList = document.getElementById('videoDeviceList');
                        if (videoDeviceList) {
                            videoDeviceList.options.length = 0;
                        }
                        App.conference.onStateChange = (_session, state) => {
                            if (state == ISession_js_2.SessionState.Connected) {
                                let deviceManager = new DeviceManager_js_1.DeviceManager();
                                deviceManager.getAudioInputDevices().then((devices) => {
                                    let currentVideoId = App.conference.me.deviceStream.microphone.deviceId;
                                    devices.forEach((device) => {
                                        var option = document.createElement('option');
                                        option.value = device.deviceId;
                                        option.text = device.label;
                                        option.selected = (currentVideoId == device.deviceId);
                                        audioDeviceList.add(option);
                                    });
                                });
                                deviceManager.getVideoInputDevices().then((devices) => {
                                    let currentVideoId = App.conference.me.deviceStream.camera.deviceId;
                                    devices.forEach((device) => {
                                        var option = document.createElement('option');
                                        option.value = device.deviceId;
                                        option.text = device.label;
                                        option.selected = (currentVideoId == device.deviceId);
                                        videoDeviceList.add(option);
                                    });
                                });
                                fm.liveswitch.Util.observe(audioDeviceList, 'change', function (evt) {
                                    let option = audioDeviceList.options[audioDeviceList.selectedIndex];
                                    App.conference.me.deviceStream.microphone.deviceId = option.value;
                                });
                                fm.liveswitch.Util.observe(videoDeviceList, 'change', function (evt) {
                                    let option = videoDeviceList.options[videoDeviceList.selectedIndex];
                                    App.conference.me.deviceStream.camera.deviceId = option.value;
                                });
                                App.conference.onStateChange = null;
                            }
                        };
                    });
                }
                switchMode() {
                    if (App.isCameraOn && App.isScreenOn) {
                        App.conference.me.screenStream.stop();
                        App.isScreenOn = false;
                    }
                    else if (App.isCameraOn) {
                        App.conference.me.deviceStream.camera.disable();
                        //App.conference.startScreenStream();
                        App.isCameraOn = false;
                        App.isScreenOn = true;
                    }
                    else if (App.isScreenOn) {
                        App.conference.me.deviceStream.camera.enable();
                        //App.conference.me.screenStream.stop();
                        //App.conference.startDeviceStream();
                        App.isCameraOn = true;
                        App.isScreenOn = false;
                    }
                }
                conferenceLeave() {
                    App.conference.leave();
                    App.conference = null;
                }
                toggleAudio() {
                    if (!this.AudioMuted) {
                        App.conference.participants.forEach((participant) => {
                            participant.deviceStream.microphone.disable();
                        });
                        App.toggleAudioButton.value = "Unmute Audio";
                        this.AudioMuted = true;
                    }
                    else {
                        App.conference.participants.forEach((participant) => {
                            participant.deviceStream.microphone.enable();
                        });
                        App.toggleAudioButton.value = "Mute Audio";
                        this.AudioMuted = false;
                    }
                }
                toggleVideo() {
                    if (App.isCameraOn) {
                        if (!this.CameraMuted) {
                            App.conference.participants.forEach((participant) => {
                                participant.deviceStream.camera.disable();
                            });
                            this.CameraMuted = true;
                            App.toggleVideoButton.value = "Unmute Video";
                        }
                        else {
                            App.conference.participants.forEach((participant) => {
                                participant.deviceStream.camera.enable();
                            });
                            this.CameraMuted = false;
                            App.toggleVideoButton.value = "Mute Video";
                        }
                    }
                }
            };
            exports_30("App", App);
            App.isScreenOn = false;
            App.isCameraOn = false;
            App.writeMessage = (msg) => {
                var content = document.createElement('p');
                content.innerHTML = msg;
                if (App.text != null) {
                    App.text.appendChild(content);
                    App.text.scrollTop = App.text.scrollHeight;
                }
            };
            App.video = null;
            App.text = null;
            App.inputText = null;
            App.switchToScreenShare = null;
            App.leaveConferenceButton = null;
            App.userId = null;
            App.sendButton = null;
            App.inviteButton = null;
            App.clientConnectButton = null;
            App.clientJoinButton = null;
            App.toggleAudioButton = null;
            App.toggleVideoButton = null;
            App.client = null;
            App.conference = null;
            demo = new App();
            //App.inviteUserId = document.getElementById('invitePerson') as HTMLInputElement;
            //App.inviteButton = document.getElementById('invite') as HTMLButtonElement;
            //App.inviteButton.addEventListener("click", this.invite); // modify  
            //static inviteUserId?: HTMLInputElement = null;
            //invite() {
            //    var inviteSend = App.conference.invite(App.inviteUserId.value);
            //    inviteSend.oninviteaccepted =() => {
            //        //  cool I guess.
            //    };
            //    inviteSend.oninviterejected = (args) => {
            //        // why did you do this.
            //       let reason =  args.toString();
            //    };
            //}
        }
    };
});
System.register("scripts/device_switching", ["scripts/interfaces/PrototypeImplementation/Consumables/Client", "./interfaces/Interfaces/ISession.js", "scripts/interfaces/PrototypeImplementation/Consumables/DeviceManager"], function (exports_31, context_31) {
    "use strict";
    var Client_js_4, ISession_js_3, DeviceManager_js_2, DeviceSwitching, demo;
    var __moduleName = context_31 && context_31.id;
    return {
        setters: [
            function (Client_js_4_1) {
                Client_js_4 = Client_js_4_1;
            },
            function (ISession_js_3_1) {
                ISession_js_3 = ISession_js_3_1;
            },
            function (DeviceManager_js_2_1) {
                DeviceManager_js_2 = DeviceManager_js_2_1;
            }
        ],
        execute: function () {
            DeviceSwitching = class DeviceSwitching {
                constructor() {
                    DeviceSwitching.video = document.getElementById('video');
                    DeviceSwitching.video.style.display = 'block';
                    DeviceSwitching.clientJoinButton = document.getElementById('clientJoin');
                    DeviceSwitching.clientJoinButton.addEventListener("click", this.joinConfererence); // modify       
                    DeviceSwitching.leaveConferenceButton = document.getElementById('leaveConference');
                    DeviceSwitching.leaveConferenceButton.addEventListener("click", this.conferenceLeave); // modify    
                    DeviceSwitching.leaveConferenceButton.disabled = true;
                }
                joinConfererence() {
                    let client = new Client_js_4.Client();
                    client.connect().then(() => {
                        DeviceSwitching.conference = client.join({ conferenceId: "123123", videoSinkElementId: DeviceSwitching.video.id });
                        DeviceSwitching.leaveConferenceButton.disabled = false;
                        let audioDeviceList = document.getElementById('audioDeviceList');
                        if (audioDeviceList) {
                            audioDeviceList.options.length = 0;
                        }
                        let videoDeviceList = document.getElementById('videoDeviceList');
                        if (videoDeviceList) {
                            videoDeviceList.options.length = 0;
                        }
                        DeviceSwitching.conference.onStateChange = (_session, state) => {
                            if (state == ISession_js_3.SessionState.Connected) {
                                let deviceManager = new DeviceManager_js_2.DeviceManager();
                                deviceManager.getAudioInputDevices().then((devices) => {
                                    let currentVideoId = DeviceSwitching.conference.me.deviceStream.microphone.deviceId;
                                    devices.forEach((device) => {
                                        var option = document.createElement('option');
                                        option.value = device.deviceId;
                                        option.text = device.label;
                                        option.selected = (currentVideoId == device.deviceId);
                                        audioDeviceList.add(option);
                                    });
                                });
                                deviceManager.getVideoInputDevices().then((devices) => {
                                    let currentVideoId = DeviceSwitching.conference.me.deviceStream.camera.deviceId;
                                    devices.forEach((device) => {
                                        var option = document.createElement('option');
                                        option.value = device.deviceId;
                                        option.text = device.label;
                                        option.selected = (currentVideoId == device.deviceId);
                                        videoDeviceList.add(option);
                                    });
                                });
                                fm.liveswitch.Util.observe(audioDeviceList, 'change', function (evt) {
                                    let option = audioDeviceList.options[audioDeviceList.selectedIndex];
                                    DeviceSwitching.conference.me.deviceStream.microphone.deviceId = option.value;
                                });
                                fm.liveswitch.Util.observe(videoDeviceList, 'change', function (evt) {
                                    let option = videoDeviceList.options[videoDeviceList.selectedIndex];
                                    DeviceSwitching.conference.me.deviceStream.camera.deviceId = option.value;
                                });
                                DeviceSwitching.conference.onStateChange = null;
                            }
                        };
                    });
                }
                conferenceLeave() {
                    DeviceSwitching.conference.leave();
                    DeviceSwitching.conference = null;
                }
            };
            exports_31("DeviceSwitching", DeviceSwitching);
            DeviceSwitching.video = null;
            DeviceSwitching.leaveConferenceButton = null;
            DeviceSwitching.clientJoinButton = null;
            DeviceSwitching.conference = null;
            demo = new DeviceSwitching();
        }
    };
});
System.register("scripts/index", ["scripts/app"], function (exports_32, context_32) {
    "use strict";
    var app_js_1, app;
    var __moduleName = context_32 && context_32.id;
    return {
        setters: [
            function (app_js_1_1) {
                app_js_1 = app_js_1_1;
            }
        ],
        execute: function () {
            //function hello() {
            //    console.log("creating app");
            //    let app = new App();
            //}
            //document.getElementById('createClient').addEventListener('click', hello);
            //console.log("on button click event attached");
            app = new app_js_1.App();
        }
    };
});
System.register("scripts/muting", ["scripts/interfaces/PrototypeImplementation/Consumables/Client"], function (exports_33, context_33) {
    "use strict";
    var Client_js_5, Muting, demo;
    var __moduleName = context_33 && context_33.id;
    return {
        setters: [
            function (Client_js_5_1) {
                Client_js_5 = Client_js_5_1;
            }
        ],
        execute: function () {
            Muting = class Muting {
                constructor() {
                    Muting.video = document.getElementById('video');
                    Muting.video.style.display = 'block';
                    Muting.clientJoinButton = document.getElementById('clientJoin');
                    Muting.clientJoinButton.addEventListener("click", this.joinConfererence); // modify       
                    Muting.clientJoinButton.disabled = true;
                    Muting.leaveConferenceButton = document.getElementById('leaveConference');
                    Muting.leaveConferenceButton.addEventListener("click", this.conferenceLeave); // modify    
                    Muting.leaveConferenceButton.disabled = true;
                    Muting.toggleAudioButton = document.getElementById('toggleAudioMute');
                    Muting.toggleAudioButton.addEventListener("click", this.toggleAudio); // modify    
                    Muting.toggleAudioButton.disabled = true;
                    Muting.toggleVideoButton = document.getElementById('toggleVideoMute');
                    Muting.toggleVideoButton.addEventListener("click", this.toggleVideo); // modify    
                    Muting.toggleVideoButton.disabled = true;
                }
                joinConfererence() {
                    let client = new Client_js_5.Client();
                    client.connect().then(() => {
                        Muting.clientJoinButton.disabled = false;
                        Muting.conference = client.join({ conferenceId: "123123", videoSinkElementId: Muting.video.id });
                        Muting.leaveConferenceButton.disabled = false;
                        Muting.toggleAudioButton.value = "Mute Audio";
                        Muting.toggleVideoButton.value = "Mute Video";
                        Muting.toggleAudioButton.disabled = false;
                        Muting.toggleVideoButton.disabled = false;
                    });
                }
                conferenceLeave() {
                    Muting.conference.leave();
                    Muting.conference = null;
                }
                toggleAudio() {
                    if (Muting.conference.me.deviceStream.microphone.enabled) {
                        Muting.conference.me.deviceStream.microphone.disable();
                        Muting.toggleAudioButton.value = "Unmute Audio";
                    }
                    if (Muting.conference.me.deviceStream.microphone.disabled) {
                        Muting.conference.me.deviceStream.microphone.enable();
                        Muting.toggleAudioButton.value = "Mute Audio";
                    }
                }
                toggleVideo() {
                    if (Muting.conference.me.deviceStream.camera.enabled) {
                        Muting.conference.me.deviceStream.camera.disable();
                        Muting.toggleAudioButton.value = "Unmute Video";
                    }
                    if (Muting.conference.me.deviceStream.camera.disabled) {
                        Muting.conference.me.deviceStream.camera.enable();
                        Muting.toggleAudioButton.value = "Mute Video";
                    }
                }
            };
            exports_33("Muting", Muting);
            Muting.video = null;
            Muting.leaveConferenceButton = null;
            Muting.clientJoinButton = null;
            Muting.toggleAudioButton = null;
            Muting.toggleVideoButton = null;
            Muting.conference = null;
            demo = new Muting();
        }
    };
});
System.register("scripts/screenShare", ["scripts/interfaces/PrototypeImplementation/Consumables/Client"], function (exports_34, context_34) {
    "use strict";
    var Client_js_6, screenShare, demo;
    var __moduleName = context_34 && context_34.id;
    return {
        setters: [
            function (Client_js_6_1) {
                Client_js_6 = Client_js_6_1;
            }
        ],
        execute: function () {
            screenShare = class screenShare {
                constructor() {
                    screenShare.video = document.getElementById('video');
                    screenShare.video.style.display = 'block';
                    screenShare.clientJoinButton = document.getElementById('clientJoin');
                    screenShare.clientJoinButton.addEventListener("click", this.joinConfererence); // modify       
                    screenShare.switchToScreenShareButton = document.getElementById('switchScreenShare');
                    screenShare.switchToScreenShareButton.addEventListener("click", this.switch); // modify        
                    screenShare.switchToScreenShareButton.disabled = true;
                    screenShare.cameraAndScreenButton = document.getElementById('enableCameraAndScreen');
                    screenShare.cameraAndScreenButton.addEventListener("click", this.screenAndCamera); // modify        
                    screenShare.cameraAndScreenButton.disabled = true;
                    screenShare.leaveConferenceButton = document.getElementById('leaveConference');
                    screenShare.leaveConferenceButton.addEventListener("click", this.conferenceLeave); // modify    
                    screenShare.leaveConferenceButton.disabled = true;
                }
                joinConfererence() {
                    let client = new Client_js_6.Client();
                    client.connect().then(() => {
                        screenShare.clientJoinButton.disabled = false;
                        screenShare.conference = client.join({ conferenceId: "123123", videoSinkElementId: screenShare.video.id, screenshare: true });
                        screenShare.isScreenOn = true;
                        screenShare.leaveConferenceButton.disabled = false;
                        screenShare.switchToScreenShareButton.disabled = false;
                        screenShare.cameraAndScreenButton.disabled = false;
                    });
                }
                conferenceLeave() {
                    screenShare.conference.leave();
                    screenShare.conference = null;
                }
                switch() {
                    if (screenShare.isCameraOn && screenShare.isScreenOn) {
                        screenShare.conference.me.screenStream.stop();
                        screenShare.isScreenOn = false;
                    }
                    else if (screenShare.isCameraOn) {
                        screenShare.conference.me.deviceStream.stop();
                        if (screenShare.conference.me.screenStream) {
                            screenShare.conference.me.screenStream.start();
                        }
                        else {
                            screenShare.conference.startScreenStream();
                        }
                        screenShare.isCameraOn = false;
                        screenShare.isScreenOn = true;
                    }
                    else if (screenShare.isScreenOn) {
                        screenShare.conference.me.screenStream.stop();
                        if (screenShare.conference.me.deviceStream) {
                            screenShare.conference.me.deviceStream.start();
                        }
                        else {
                            screenShare.conference.startDeviceStream();
                        }
                        screenShare.isCameraOn = true;
                        screenShare.isScreenOn = false;
                    }
                }
                screenAndCamera() {
                    if (!screenShare.isCameraOn) {
                        if (screenShare.conference.me.deviceStream) {
                            screenShare.conference.me.deviceStream.start();
                        }
                        else {
                            screenShare.conference.startDeviceStream();
                        }
                        screenShare.isCameraOn = true;
                    }
                    if (!screenShare.isScreenOn) {
                        if (screenShare.conference.me.screenStream) {
                            screenShare.conference.me.screenStream.start();
                        }
                        else {
                            screenShare.conference.startScreenStream();
                        }
                        screenShare.isScreenOn = true;
                    }
                }
            };
            exports_34("screenShare", screenShare);
            screenShare.isScreenOn = false;
            screenShare.isCameraOn = false;
            screenShare.video = null;
            screenShare.switchToScreenShareButton = null;
            screenShare.cameraAndScreenButton = null;
            screenShare.leaveConferenceButton = null;
            screenShare.clientJoinButton = null;
            screenShare.conference = null;
            demo = new screenShare();
        }
    };
});
System.register("scripts/textchat", ["scripts/interfaces/PrototypeImplementation/Consumables/Client", "scripts/interfaces/PrototypeImplementation/Consumables/MessageArgs"], function (exports_35, context_35) {
    "use strict";
    var Client_js_7, MessageArgs_js_2, TextChat;
    var __moduleName = context_35 && context_35.id;
    return {
        setters: [
            function (Client_js_7_1) {
                Client_js_7 = Client_js_7_1;
            },
            function (MessageArgs_js_2_1) {
                MessageArgs_js_2 = MessageArgs_js_2_1;
            }
        ],
        execute: function () {
            TextChat = class TextChat {
                constructor() {
                    this.sendMessage = () => {
                        let text = TextChat.inputText.value;
                        if (TextChat.conference != null) {
                            TextChat.conference.sendMessage(new MessageArgs_js_2.MessageArgs(text));
                        }
                        TextChat.inputText.value = "";
                        TextChat.writeMessage("Me: " + text);
                    };
                    TextChat.text = document.getElementById('eventLog');
                    TextChat.inputText = document.getElementById('sendInput');
                    TextChat.sendButton = document.getElementById('sendButton');
                    TextChat.sendButton.addEventListener("click", this.sendMessage);
                    TextChat.clientJoinButton = document.getElementById('clientJoin');
                    TextChat.clientJoinButton.addEventListener("click", this.joinConfererence); // modify       
                    TextChat.userId = document.getElementById('userName');
                    TextChat.clientJoinButton.disabled = true;
                    TextChat.leaveConferenceButton = document.getElementById('leaveConference');
                    TextChat.leaveConferenceButton.addEventListener("click", this.conferenceLeave); // modify    
                    TextChat.leaveConferenceButton.disabled = true;
                }
                joinConfererence() {
                    let client = new Client_js_7.Client(TextChat.userId.value);
                    client.connect().then(() => {
                        TextChat.conference = client.join({ conferenceId: "123123", camera: false, microphone: false });
                        TextChat.conference.onIncomingMessage = (session, message) => {
                            TextChat.writeMessage(message.senderId + ": " + message.stringMessage);
                        };
                        TextChat.leaveConferenceButton.disabled = false;
                    });
                }
                conferenceLeave() {
                    TextChat.conference.leave();
                    TextChat.conference = null;
                }
            };
            exports_35("TextChat", TextChat);
            TextChat.writeMessage = (msg) => {
                var content = document.createElement('p');
                content.innerHTML = msg;
                if (TextChat.text != null) {
                    TextChat.text.appendChild(content);
                    TextChat.text.scrollTop = TextChat.text.scrollHeight;
                }
            };
            TextChat.sendButton = null;
            TextChat.text = null;
            TextChat.inputText = null;
            TextChat.userId = null;
            TextChat.clientJoinButton = null;
            TextChat.conference = null;
            TextChat.leaveConferenceButton = null;
        }
    };
});
System.register("scripts/interfaces/Interfaces/DeviceType", [], function (exports_36, context_36) {
    "use strict";
    var DeviceType;
    var __moduleName = context_36 && context_36.id;
    return {
        setters: [],
        execute: function () {
            (function (DeviceType) {
                DeviceType[DeviceType["Camera"] = 1] = "Camera";
                DeviceType[DeviceType["Microphone"] = 2] = "Microphone";
                DeviceType[DeviceType["Screen"] = 3] = "Screen";
                DeviceType[DeviceType["Speaker"] = 4] = "Speaker";
                DeviceType[DeviceType["Headphones"] = 5] = "Headphones";
            })(DeviceType || (exports_36("DeviceType", DeviceType = {})));
        }
    };
});
System.register("scripts/interfaces/Interfaces/IClient", [], function (exports_37, context_37) {
    "use strict";
    var ClientState;
    var __moduleName = context_37 && context_37.id;
    return {
        setters: [],
        execute: function () {
            (function (ClientState) {
                ClientState[ClientState["New"] = 1] = "New";
                ClientState[ClientState["Connecting"] = 2] = "Connecting";
                ClientState[ClientState["Connected"] = 3] = "Connected";
                ClientState[ClientState["Disconnected"] = 4] = "Disconnected";
            })(ClientState || (exports_37("ClientState", ClientState = {})));
        }
    };
});
System.register("scripts/interfaces/Interfaces/IDevice", [], function (exports_38, context_38) {
    "use strict";
    var DeviceState;
    var __moduleName = context_38 && context_38.id;
    return {
        setters: [],
        execute: function () {
            (function (DeviceState) {
                DeviceState[DeviceState["New"] = 1] = "New";
                DeviceState[DeviceState["Started"] = 2] = "Started";
                DeviceState[DeviceState["Stopped"] = 3] = "Stopped";
            })(DeviceState || (exports_38("DeviceState", DeviceState = {})));
        }
    };
});
System.register("scripts/interfaces/Interfaces/IDeviceManager", [], function (exports_39, context_39) {
    "use strict";
    var DeviceKind;
    var __moduleName = context_39 && context_39.id;
    return {
        setters: [],
        execute: function () {
            (function (DeviceKind) {
                DeviceKind[DeviceKind["VideoInput"] = 1] = "VideoInput";
                DeviceKind[DeviceKind["AudioInput"] = 2] = "AudioInput";
                DeviceKind[DeviceKind["AudioOutput"] = 3] = "AudioOutput";
            })(DeviceKind || (exports_39("DeviceKind", DeviceKind = {})));
        }
    };
});
System.register("scripts/interfaces/Interfaces/IInboundSessionInvite", [], function (exports_40, context_40) {
    "use strict";
    var InboundSessionInviteState;
    var __moduleName = context_40 && context_40.id;
    return {
        setters: [],
        execute: function () {
            (function (InboundSessionInviteState) {
                InboundSessionInviteState[InboundSessionInviteState["New"] = 1] = "New";
                InboundSessionInviteState[InboundSessionInviteState["Accepted"] = 2] = "Accepted";
                InboundSessionInviteState[InboundSessionInviteState["Rejected"] = 3] = "Rejected";
            })(InboundSessionInviteState || (exports_40("InboundSessionInviteState", InboundSessionInviteState = {})));
        }
    };
});
System.register("scripts/interfaces/Interfaces/ILayout", [], function (exports_41, context_41) {
    "use strict";
    var Rectangle, Size, Point, LayoutMode, Color;
    var __moduleName = context_41 && context_41.id;
    return {
        setters: [],
        execute: function () {
            Rectangle = class Rectangle {
            };
            exports_41("Rectangle", Rectangle);
            Size = class Size {
            };
            exports_41("Size", Size);
            Point = class Point {
            };
            exports_41("Point", Point);
            (function (LayoutMode) {
                LayoutMode[LayoutMode["HorizontalFill"] = 0] = "HorizontalFill";
                LayoutMode[LayoutMode["VerticalFill"] = 1] = "VerticalFill";
                LayoutMode[LayoutMode["ProminentBottomFill"] = 2] = "ProminentBottomFill";
                LayoutMode[LayoutMode["ProminentRightFill"] = 3] = "ProminentRightFill";
                LayoutMode[LayoutMode["Custom"] = 4] = "Custom";
            })(LayoutMode || (exports_41("LayoutMode", LayoutMode = {})));
            (function (Color) {
                Color[Color["Black"] = 0] = "Black";
                Color[Color["Red"] = 1] = "Red";
                Color[Color["Green"] = 2] = "Green";
                Color[Color["Blue"] = 3] = "Blue";
                Color[Color["White"] = 4] = "White";
            })(Color || (exports_41("Color", Color = {})));
        }
    };
});
System.register("scripts/interfaces/Interfaces/IScreenSubStream", [], function (exports_42, context_42) {
    "use strict";
    var SourceDisplaySurfaceType;
    var __moduleName = context_42 && context_42.id;
    return {
        setters: [],
        execute: function () {
            (function (SourceDisplaySurfaceType) {
                //https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackSettings/displaySurface
                SourceDisplaySurfaceType[SourceDisplaySurfaceType["Application"] = 1] = "Application";
                SourceDisplaySurfaceType[SourceDisplaySurfaceType["Browser"] = 2] = "Browser";
                SourceDisplaySurfaceType[SourceDisplaySurfaceType["Monitor"] = 3] = "Monitor";
                SourceDisplaySurfaceType[SourceDisplaySurfaceType["Window"] = 4] = "Window";
            })(SourceDisplaySurfaceType || (exports_42("SourceDisplaySurfaceType", SourceDisplaySurfaceType = {})));
        }
    };
});
System.register("scripts/interfaces/Interfaces/ISendStatus", [], function (exports_43, context_43) {
    "use strict";
    var SendState;
    var __moduleName = context_43 && context_43.id;
    return {
        setters: [],
        execute: function () {
            (function (SendState) {
                SendState[SendState["New"] = 1] = "New";
                SendState[SendState["Sent"] = 2] = "Sent";
                SendState[SendState["Delivered"] = 3] = "Delivered";
                SendState[SendState["Viewed"] = 4] = "Viewed";
            })(SendState || (exports_43("SendState", SendState = {})));
        }
    };
});
System.register("scripts/interfaces/Interfaces/ISession", [], function (exports_44, context_44) {
    "use strict";
    var SessionState;
    var __moduleName = context_44 && context_44.id;
    return {
        setters: [],
        execute: function () {
            (function (SessionState) {
                SessionState[SessionState["New"] = 0] = "New";
                SessionState[SessionState["Connecting"] = 1] = "Connecting";
                SessionState[SessionState["Connected"] = 2] = "Connected";
                SessionState[SessionState["Terminated"] = 3] = "Terminated";
            })(SessionState || (exports_44("SessionState", SessionState = {})));
        }
    };
});
System.register("scripts/interfaces/Interfaces/ISource", [], function (exports_45, context_45) {
    "use strict";
    var SwitchDevicePolicy;
    var __moduleName = context_45 && context_45.id;
    return {
        setters: [],
        execute: function () {
            (function (SwitchDevicePolicy) {
                SwitchDevicePolicy[SwitchDevicePolicy["DontSwitch"] = 1] = "DontSwitch";
                SwitchDevicePolicy[SwitchDevicePolicy["SwitchAndSwitchBack"] = 2] = "SwitchAndSwitchBack";
                //and then switch back if the original device becomes available. NEEDED?.
                SwitchDevicePolicy[SwitchDevicePolicy["SwitchAndDontSwitchBack"] = 3] = "SwitchAndDontSwitchBack"; //Switch to another available device of the same type when the current source device is unplugged 
                //and then switch back if the original device becomes available. NEEDED?.
            })(SwitchDevicePolicy || (exports_45("SwitchDevicePolicy", SwitchDevicePolicy = {})));
        }
    };
});
System.register("scripts/interfaces/Interfaces/IStream", [], function (exports_46, context_46) {
    "use strict";
    var StreamState;
    var __moduleName = context_46 && context_46.id;
    return {
        setters: [],
        execute: function () {
            (function (StreamState) {
                StreamState[StreamState["New"] = 1] = "New";
                StreamState[StreamState["Connected"] = 2] = "Connected";
                StreamState[StreamState["Disconnected"] = 3] = "Disconnected";
            })(StreamState || (exports_46("StreamState", StreamState = {})));
        }
    };
});
System.register("scripts/interfaces/Interfaces/ISubStream", [], function (exports_47, context_47) {
    "use strict";
    var SubStreamState;
    var __moduleName = context_47 && context_47.id;
    return {
        setters: [],
        execute: function () {
            (function (SubStreamState) {
                SubStreamState[SubStreamState["New"] = 1] = "New";
                SubStreamState[SubStreamState["Enabled"] = 2] = "Enabled";
                SubStreamState[SubStreamState["Disabled"] = 3] = "Disabled";
            })(SubStreamState || (exports_47("SubStreamState", SubStreamState = {})));
        }
    };
});
System.register("scripts/interfaces/Interfaces/SessionInviteRejectReason", [], function (exports_48, context_48) {
    "use strict";
    var SessionInviteRejectReason;
    var __moduleName = context_48 && context_48.id;
    return {
        setters: [],
        execute: function () {
            (function (SessionInviteRejectReason) {
                SessionInviteRejectReason[SessionInviteRejectReason["Busy"] = 0] = "Busy";
                SessionInviteRejectReason[SessionInviteRejectReason["Incompatible"] = 1] = "Incompatible";
                SessionInviteRejectReason[SessionInviteRejectReason["None"] = 2] = "None";
            })(SessionInviteRejectReason || (exports_48("SessionInviteRejectReason", SessionInviteRejectReason = {})));
        }
    };
});
System.register("scripts/interfaces/Interfaces/SourceType", [], function (exports_49, context_49) {
    "use strict";
    var SourceType;
    var __moduleName = context_49 && context_49.id;
    return {
        setters: [],
        execute: function () {
            (function (SourceType) {
                SourceType[SourceType["Camera"] = 0] = "Camera";
                SourceType[SourceType["Screen"] = 1] = "Screen";
                SourceType[SourceType["Microphone"] = 2] = "Microphone";
                SourceType[SourceType["File"] = 3] = "File";
            })(SourceType || (exports_49("SourceType", SourceType = {})));
        }
    };
});
System.register("scripts/interfaces/Interfaces/StreamType", [], function (exports_50, context_50) {
    "use strict";
    var StreamType;
    var __moduleName = context_50 && context_50.id;
    return {
        setters: [],
        execute: function () {
            (function (StreamType) {
                StreamType[StreamType["Device"] = 0] = "Device";
                StreamType[StreamType["File"] = 1] = "File";
                StreamType[StreamType["Screen"] = 2] = "Screen";
            })(StreamType || (exports_50("StreamType", StreamType = {})));
        }
    };
});
System.register("scripts/interfaces/Interfaces/SubStreamType", [], function (exports_51, context_51) {
    "use strict";
    var SubStreamType;
    var __moduleName = context_51 && context_51.id;
    return {
        setters: [],
        execute: function () {
            (function (SubStreamType) {
                SubStreamType[SubStreamType["Audio"] = 0] = "Audio";
                SubStreamType[SubStreamType["Video"] = 1] = "Video";
                SubStreamType[SubStreamType["Data"] = 2] = "Data";
            })(SubStreamType || (exports_51("SubStreamType", SubStreamType = {})));
        }
    };
});
System.register("scripts/interfaces/PrototypeImplementation/Consumables/Invite", ["../../Interfaces/SessionInviteRejectReason.js"], function (exports_52, context_52) {
    "use strict";
    var SessionInviteRejectReason_js_1, Invite;
    var __moduleName = context_52 && context_52.id;
    return {
        setters: [
            function (SessionInviteRejectReason_js_1_1) {
                SessionInviteRejectReason_js_1 = SessionInviteRejectReason_js_1_1;
            }
        ],
        execute: function () {
            Invite = class Invite {
                constructor(invitation) {
                    this.invitation = null;
                    if (invitation != null) {
                        this.invitation = invitation;
                        invitation.addOnStateChanging((invite) => {
                            if (invite.getState() == fm.liveswitch.InvitationState.Accepted) {
                                if (this.oninviteaccepted != null) {
                                    this.oninviteaccepted();
                                }
                            }
                            else if (invite.getState() == fm.liveswitch.InvitationState.Rejected) {
                                if (this.oninviteaccepted != null) {
                                    invite.getReason(); /// will have to set
                                    this.oninviterejected(SessionInviteRejectReason_js_1.SessionInviteRejectReason.None);
                                }
                            }
                        });
                    }
                }
                addInvitation(invitation) {
                    if (this.invitation) {
                        // cannot add more than once invitation
                        return;
                    }
                    this.invitation = invitation;
                    invitation.addOnStateChanging((invite) => {
                        if (invite.getState() == fm.liveswitch.InvitationState.Accepted) {
                            if (this.oninviteaccepted != null) {
                                this.oninviteaccepted();
                            }
                        }
                        else if (invite.getState() == fm.liveswitch.InvitationState.Rejected) {
                            if (this.oninviteaccepted != null) {
                                invite.getReason(); /// will have to set
                                this.oninviterejected(SessionInviteRejectReason_js_1.SessionInviteRejectReason.None);
                            }
                        }
                    });
                }
                cancel() {
                    var _a;
                    (_a = this.invitation) === null || _a === void 0 ? void 0 : _a.cancel();
                }
            };
            exports_52("Invite", Invite);
        }
    };
});
