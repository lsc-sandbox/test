var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class SharedObjects {
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
}
