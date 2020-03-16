import { ISession } from "../../Interfaces/ISession.js";

export class SharedObjects {
    GetCameraVideoDevice(): string {
        if (this.cameraLocalMedia && this.cameraLocalMedia?.getVideoInput()) {
            return this.cameraLocalMedia?.getVideoInput().getId();
        }
        return null;
    }
    GetScreenVideoDevice(): string {
        if (this.screenLocalMedia && this.screenLocalMedia?.getVideoInput()) {
            return this.cameraLocalMedia?.getVideoInput().getId();
        }
        return null;
    }
    GetCameraAudioDevice(): string {
        if (this.cameraLocalMedia && this.cameraLocalMedia?.getAudioInput()) {
            return this.cameraLocalMedia?.getAudioInput().getId();
        }
        return null;
    }
    switchToScreenVideoDevice(newDeviceId: string) {
        this.screenLocalMedia.changeVideoSourceInput(new fm.liveswitch.SourceInput(newDeviceId, ""));
    }
    switchToCameraAudioDevice(newDeviceId: string) {
        this.cameraLocalMedia.changeAudioSourceInput(new fm.liveswitch.SourceInput(newDeviceId, ""));
    }
    switchToCameraVideoDevice(newDeviceId: string) {
        this.cameraLocalMedia.changeVideoSourceInput(new fm.liveswitch.SourceInput(newDeviceId, ""));
    }
    /// these can be returned during in promise of start screen stream and session stream.
    //GetAudioTrackForCamera(): fm.liveswitch.AudioTrack {
    //    return this.cameraLocalMedia.getAudioTrack();
    //}
    //GetVideoTrackForCamera(): fm.liveswitch.VideoTrack {
    //    return this.cameraLocalMedia.getVideoTrack();
    //}
    //GetVideoTrackForScreen(): fm.liveswitch.VideoTrack {
    //    return this.screenLocalMedia.getVideoTrack();
    //}
    private static _Instance: SharedObjects;
    // need to be made private
    private cameraLocalMedia: fm.liveswitch.LocalMedia | null = null;
    private screenLocalMedia: fm.liveswitch.LocalMedia | null = null;
    // have one audio stream with camera and none with screen
    private _isLocalMediaStarted: boolean = false;
    private _localCameraAudio: boolean = false;
    private _localCameraVideo: boolean = false;
    private _localScreenVideo: boolean = false;
    private _localScreenAudio: boolean = false;
    // use _localAudio to if you need audio... as audio will only be a connection with camera.
    private get _needAudio(): boolean {
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
    private StopCamera() {

        // need to do for IStream
    }
    // don't need this now
    private StopScreen() {
        // need to do for IStream
    }
    private constructor() {
        //this.videoContainer = videoContainer;
        //this.layoutManager = new fm.liveswitch.DomLayoutManager(videoContainer);
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

    public static Instance(): SharedObjects {
        if (typeof SharedObjects._Instance == "undefined") {
            SharedObjects._Instance = new SharedObjects();
        }
        return SharedObjects._Instance;
    }

    // Need to disable localmedia with all session have left.
    // Create a new layout for each session....
    //private _Sessions: { [id: string]: ISession }= {};
    private _Sessions = new Map<string, ISession>();
    private _SessionLayouts = new Map<string, fm.liveswitch.DomLayoutManager>();
    public onSessionUpdate(): Promise<void> {
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
    public createScreenStream(session: ISession, screenVideo?: boolean, screenAudio?: boolean, container?: HTMLElement,): Promise<fm.liveswitch.LocalMedia> {
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
        let promise: Promise<fm.liveswitch.LocalMedia> = new Promise((resolve, reject) => {
            me.updateLocaLMedias(undefined, undefined, screenVideo, screenAudio).then(() => {
                resolve(me.screenLocalMedia);
            }).catch((ex) => {
                reject(ex)
            });
        });
        return promise;
    }
    public createCameraStream(session: ISession, container?: HTMLElement, cameraVideo?: boolean, cameraAudio?: boolean): Promise<fm.liveswitch.LocalMedia> {
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
        let promise: Promise<fm.liveswitch.LocalMedia> = new Promise((resolve, reject) => {
            me.updateLocaLMedias(cameraVideo, cameraAudio).then(() => {
                resolve(me.cameraLocalMedia);
            }).catch((ex) => {
                reject(ex)
            });
        });
        return promise;
    }
    public onSessionLeave(session: ISession): Promise<void> {
        var me = this;
        if (this._Sessions.has(session.id)) {
            this.removeLocalLayouts(this._SessionLayouts.get(session.id)).then(() => {
                me._SessionLayouts.delete(session.id);
            });
            this._Sessions.delete(session.id);
        }
        return me.updateLocaLMedias();
    }
    private updateLocaLMedias(nowNeedCameraVideo?: boolean, nowNeedCameraAudio?: boolean, nowNeedScreenVideo?: boolean, nowNeedScreenAudio?: boolean): Promise<void> {//needCameraVideo: boolean, needCameraAudio: boolean, needScreenVideo: boolean, needScreenAudio: boolean) {
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
        let promise: Promise<void> = new Promise((resolve, reject) => {
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
            } else {
                me.updatePromiseResolve(undefined, true).then(() => {
                    resolve();
                });
            }
        });
        return promise;
    }
    private cameraResolved?: boolean = false;
    private screenResolved?: boolean = false;
    private updatePromiseResolve(cameraPromise?: boolean, screenPromise?: boolean): Promise<void> {
        var me = this;
        if (cameraPromise) {
            me.cameraResolved = cameraPromise;
        }
        if (screenPromise) {
            me.screenResolved = screenPromise;
        }
        let promise: Promise<void> = new Promise((resolve, reject) => {
            if (me.cameraResolved && me.screenResolved) {
                me.cameraResolved = false;
                me.screenResolved = false;
                resolve();
            }
        });
        return promise;
    }
    public getLayoutManagerBySessionId(sessionId: string): fm.liveswitch.DomLayoutManager {
        return this._SessionLayouts.get(sessionId);
    }
    public getLayoutManager(seesion: ISession): fm.liveswitch.DomLayoutManager {
        return this._SessionLayouts.get(seesion.id);
    }
    private removeLocalLayouts(layout: fm.liveswitch.DomLayoutManager): Promise<void> {
        var me = this;
        let promise: Promise<void> = new Promise((resolve, reject) => {
            if (layout != null) {
                layout?.removeRemoteViews();
                layout?.unsetLocalView();
                layout = null;
            }
            resolve();
        });
        return promise;
    }

    private stopScreenLocalMedia(): Promise<void> {
        var me = this;
        let promise: Promise<void> = new Promise((resolve, reject) => {
            if (me.screenLocalMedia != null) {
                me.screenLocalMedia.stop().then((o) => {
                    //me.screenLocalMedia?.destroy();
                    //me.screenLocalMedia = null;
                    resolve();
                })
            } else {
                resolve();
            }
        });
        return promise;
    }

    private stopCameraLocalMedia(): Promise<void> {
        var me = this;
        let promise: Promise<void> = new Promise((resolve, reject) => {

            if (me.cameraLocalMedia != null) {
                me.cameraLocalMedia.stop().then((o) => {
                    //me.cameraLocalMedia?.destroy();
                    //me.cameraLocalMedia = null;
                    resolve();
                })
            } else {
                resolve();
            }
        });
        return promise;
    }
    private startLocalScreenMedia(): Promise<void> {
        var me = this;
        let promise: Promise<void> = new Promise(async (resolve, reject) => {

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
                } else {
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
        });
        return promise;
    }
    private startLocalCameraMedia(): Promise<void> {
        var me = this;

        let promise: Promise<void> = new Promise(async (resolve, reject) => {

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
                } else {
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
        });
        return promise;
    }
}