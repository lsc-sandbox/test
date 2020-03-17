var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define("scripts/interfaces/PrototypeImplementation/Consumables/EntryPoint", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var EntryPoint = /** @class */ (function () {
        function EntryPoint() {
            fm.liveswitch.Log.registerProvider(new fm.liveswitch.ConsoleLogProvider(fm.liveswitch.LogLevel.Debug));
        }
        EntryPoint.Instance = function () {
            if (typeof EntryPoint._Instance == "undefined") {
                EntryPoint._Instance = new EntryPoint();
            }
            return EntryPoint._Instance;
        };
        return EntryPoint;
    }());
    exports.EntryPoint = EntryPoint;
    function LogDebug(logMessage) {
        fm.liveswitch.Log.debug(logMessage);
    }
    exports.LogDebug = LogDebug;
});
define("scripts/interfaces/PrototypeImplementation/Consumables/DefaultConfig", ["require", "exports", "scripts/interfaces/PrototypeImplementation/Consumables/EntryPoint"], function (require, exports, EntryPoint_js_1) {
    "use strict";
    exports.__esModule = true;
    var DefaultConfig = /** @class */ (function () {
        function DefaultConfig() {
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
            for (var i = 0; i < 10; i++) {
                this.DefaultChannels[i] = "conference/" + Math.floor(Math.random() * 9999999).toString();
                EntryPoint_js_1.LogDebug("Pre-generated conference Id: " + this.DefaultChannels[i]);
            }
            fm.liveswitch.Log.debug("DefaultConfig class is created ");
        }
        DefaultConfig.Instance = function () {
            if (typeof DefaultConfig._Instance == "undefined") {
                DefaultConfig._Instance = new DefaultConfig();
            }
            return DefaultConfig._Instance;
        };
        return DefaultConfig;
    }());
    exports.DefaultConfig = DefaultConfig;
});
define("scripts/interfaces/PrototypeImplementation/Consumables/CentralConnections", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var CentralConnections = /** @class */ (function () {
        function CentralConnections() {
            /// don't know if I will need this 
            //private sfuUpstreamConnections = new Map<string, fm.liveswitch.SfuUpstreamConnection>();
            //clientId, connectionInfo
            //need to update the remoteClientInfo on update.
            this.remoteConnectionInfoForCamera = new Map();
            this.remoteConnectionInfoForScreen = new Map();
        }
        // Singleton
        CentralConnections.Instance = function () {
            if (typeof CentralConnections._Instance == "undefined") {
                CentralConnections._Instance = new CentralConnections();
            }
            return CentralConnections._Instance;
        };
        return CentralConnections;
    }());
    exports.CentralConnections = CentralConnections;
});
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
define("scripts/interfaces/PrototypeImplementation/Consumables/SharedObjects", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var SharedObjects = /** @class */ (function () {
        function SharedObjects() {
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
        SharedObjects.prototype.GetCameraVideoDevice = function () {
            var _a, _b;
            if (this.cameraLocalMedia && ((_a = this.cameraLocalMedia) === null || _a === void 0 ? void 0 : _a.getVideoInput())) {
                return (_b = this.cameraLocalMedia) === null || _b === void 0 ? void 0 : _b.getVideoInput().getId();
            }
            return null;
        };
        SharedObjects.prototype.GetScreenVideoDevice = function () {
            var _a, _b;
            if (this.screenLocalMedia && ((_a = this.screenLocalMedia) === null || _a === void 0 ? void 0 : _a.getVideoInput())) {
                return (_b = this.cameraLocalMedia) === null || _b === void 0 ? void 0 : _b.getVideoInput().getId();
            }
            return null;
        };
        SharedObjects.prototype.GetCameraAudioDevice = function () {
            var _a, _b;
            if (this.cameraLocalMedia && ((_a = this.cameraLocalMedia) === null || _a === void 0 ? void 0 : _a.getAudioInput())) {
                return (_b = this.cameraLocalMedia) === null || _b === void 0 ? void 0 : _b.getAudioInput().getId();
            }
            return null;
        };
        SharedObjects.prototype.switchToScreenVideoDevice = function (newDeviceId) {
            this.screenLocalMedia.changeVideoSourceInput(new fm.liveswitch.SourceInput(newDeviceId, ""));
        };
        SharedObjects.prototype.switchToCameraAudioDevice = function (newDeviceId) {
            this.cameraLocalMedia.changeAudioSourceInput(new fm.liveswitch.SourceInput(newDeviceId, ""));
        };
        SharedObjects.prototype.switchToCameraVideoDevice = function (newDeviceId) {
            this.cameraLocalMedia.changeVideoSourceInput(new fm.liveswitch.SourceInput(newDeviceId, ""));
        };
        Object.defineProperty(SharedObjects.prototype, "_needAudio", {
            // use _localAudio to if you need audio... as audio will only be a connection with camera.
            get: function () {
                return this._localScreenAudio || this._localCameraAudio;
            },
            enumerable: true,
            configurable: true
        });
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
        SharedObjects.prototype.StopCamera = function () {
            // need to do for IStream
        };
        // don't need this now
        SharedObjects.prototype.StopScreen = function () {
            // need to do for IStream
        };
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
        SharedObjects.Instance = function () {
            if (typeof SharedObjects._Instance == "undefined") {
                SharedObjects._Instance = new SharedObjects();
            }
            return SharedObjects._Instance;
        };
        SharedObjects.prototype.onSessionUpdate = function () {
            return this.updateLocaLMedias();
        };
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
        SharedObjects.prototype.createScreenStream = function (session, screenVideo, screenAudio, container) {
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
            var promise = new Promise(function (resolve, reject) {
                me.updateLocaLMedias(undefined, undefined, screenVideo, screenAudio).then(function () {
                    resolve(me.screenLocalMedia);
                })["catch"](function (ex) {
                    reject(ex);
                });
            });
            return promise;
        };
        SharedObjects.prototype.createCameraStream = function (session, container, cameraVideo, cameraAudio) {
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
            var promise = new Promise(function (resolve, reject) {
                me.updateLocaLMedias(cameraVideo, cameraAudio).then(function () {
                    resolve(me.cameraLocalMedia);
                })["catch"](function (ex) {
                    reject(ex);
                });
            });
            return promise;
        };
        SharedObjects.prototype.onSessionLeave = function (session) {
            var me = this;
            if (this._Sessions.has(session.id)) {
                this.removeLocalLayouts(this._SessionLayouts.get(session.id)).then(function () {
                    me._SessionLayouts["delete"](session.id);
                });
                this._Sessions["delete"](session.id);
            }
            return me.updateLocaLMedias();
        };
        SharedObjects.prototype.updateLocaLMedias = function (nowNeedCameraVideo, nowNeedCameraAudio, nowNeedScreenVideo, nowNeedScreenAudio) {
            var _this = this;
            var needCameraAudio = false;
            var needCameraVideo = false;
            var needScreenAudio = false;
            var needScreenVideo = false;
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
            for (var _i = 0, _a = this._Sessions.values(); _i < _a.length; _i++) {
                var sessionValue = _a[_i];
                if (sessionValue.me.deviceStreams) {
                    sessionValue.me.deviceStreams.forEach(function (deviceStream) {
                        if (deviceStream.audio.isEnabled) {
                            needCameraAudio = true;
                        }
                        if (deviceStream.video.isEnabled) {
                            needCameraVideo = true;
                        }
                    });
                }
                if (sessionValue.me.screenStreams) {
                    sessionValue.me.screenStreams.forEach(function (screenStream) {
                        if (screenStream.video.isEnabled) {
                            needScreenVideo = true;
                        }
                        if (screenStream.audio.isEnabled) {
                            needCameraVideo = true;
                        }
                    });
                }
            }
            var updateRequiredToScreenMedia = false;
            var updateRequiredToCameraMedia = false;
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
            var promise = new Promise(function (resolve, reject) {
                var me = _this;
                if (updateRequiredToCameraMedia) {
                    me.stopCameraLocalMedia().then(function () {
                        me.startLocalCameraMedia().then(function () {
                            me.updatePromiseResolve(true, undefined).then(function () {
                                resolve();
                            });
                        });
                    });
                }
                else {
                    me.updatePromiseResolve(true, undefined).then(function () {
                        resolve();
                    });
                }
                if (updateRequiredToScreenMedia) {
                    me.stopScreenLocalMedia().then(function () {
                        me.startLocalScreenMedia().then(function () {
                            me.updatePromiseResolve(undefined, true).then(function () {
                                resolve();
                            });
                        });
                    });
                }
                else {
                    me.updatePromiseResolve(undefined, true).then(function () {
                        resolve();
                    });
                }
            });
            return promise;
        };
        SharedObjects.prototype.updatePromiseResolve = function (cameraPromise, screenPromise) {
            var me = this;
            if (cameraPromise) {
                me.cameraResolved = cameraPromise;
            }
            if (screenPromise) {
                me.screenResolved = screenPromise;
            }
            var promise = new Promise(function (resolve, reject) {
                if (me.cameraResolved && me.screenResolved) {
                    me.cameraResolved = false;
                    me.screenResolved = false;
                    resolve();
                }
            });
            return promise;
        };
        SharedObjects.prototype.getLayoutManagerBySessionId = function (sessionId) {
            return this._SessionLayouts.get(sessionId);
        };
        SharedObjects.prototype.getLayoutManager = function (seesion) {
            return this._SessionLayouts.get(seesion.id);
        };
        SharedObjects.prototype.removeLocalLayouts = function (layout) {
            var me = this;
            var promise = new Promise(function (resolve, reject) {
                if (layout != null) {
                    layout === null || layout === void 0 ? void 0 : layout.removeRemoteViews();
                    layout === null || layout === void 0 ? void 0 : layout.unsetLocalView();
                    layout = null;
                }
                resolve();
            });
            return promise;
        };
        SharedObjects.prototype.stopScreenLocalMedia = function () {
            var me = this;
            var promise = new Promise(function (resolve, reject) {
                if (me.screenLocalMedia != null) {
                    me.screenLocalMedia.stop().then(function (o) {
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
        };
        SharedObjects.prototype.stopCameraLocalMedia = function () {
            var me = this;
            var promise = new Promise(function (resolve, reject) {
                if (me.cameraLocalMedia != null) {
                    me.cameraLocalMedia.stop().then(function (o) {
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
        };
        SharedObjects.prototype.startLocalScreenMedia = function () {
            var _this = this;
            var me = this;
            var promise = new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                var pluginConfig;
                return __generator(this, function (_a) {
                    //await this.wait(0);
                    if (me.screenLocalMedia != null) {
                        throw new Error("Local media has already been Started");
                    }
                    pluginConfig = new fm.liveswitch.PluginConfig();
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
                    me.screenLocalMedia.start().then(function (o) {
                        for (var _i = 0, _a = me._Sessions.values(); _i < _a.length; _i++) {
                            var session = _a[_i];
                            var addTolayout = true;
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
                    }).fail(function (ex) {
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
                    return [2 /*return*/];
                });
            }); });
            return promise;
        };
        SharedObjects.prototype.startLocalCameraMedia = function () {
            var _this = this;
            var me = this;
            var promise = new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                var pluginConfig;
                return __generator(this, function (_a) {
                    pluginConfig = new fm.liveswitch.PluginConfig();
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
                    me.cameraLocalMedia.start().then(function (o) {
                        for (var _i = 0, _a = me._Sessions.values(); _i < _a.length; _i++) {
                            var session = _a[_i];
                            var addTolayout = true;
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
                    }).fail(function (ex) {
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
                    return [2 /*return*/];
                });
            }); });
            return promise;
        };
        return SharedObjects;
    }());
    exports.SharedObjects = SharedObjects;
});
define("scripts/interfaces/PrototypeImplementation/Consumables/Device", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var Device = /** @class */ (function () {
        function Device(id, name, deviceType, fmSourceInput) {
            this.id = id;
            this.name = name;
            this.deviceType = deviceType;
            // need to know the input device? yes
            // also need to know the mediaType? 
            this.fmSourceInput = fmSourceInput;
        }
        Device.prototype.start = function () {
            //if (this.deviceType == DeviceType.Camera) {
            //    SharedObjects.Instance().StartCameraDevice(this.fmSourceInput);
            //} else if (this.deviceType == DeviceType.Microphone) {
            //    SharedObjects.Instance().StartAudioDevice(this.fmSourceInput);
            //} else if (this.deviceType == DeviceType.Screen) {
            //    SharedObjects.Instance().StartScreenDevice(this.fmSourceInput);
            //}
        };
        Device.prototype.stop = function () {
            // this state need to presist.
            //if (this.deviceType == DeviceType.Camera) {
            //    SharedObjects.Instance().StopCameraDevice(this.fmSourceInput);
            //} else if (this.deviceType == DeviceType.Microphone) {
            //    SharedObjects.Instance().StopAudioDevice(this.fmSourceInput);
            //} else if (this.deviceType == DeviceType.Screen) {
            //    SharedObjects.Instance().StopScreenDevice(this.fmSourceInput);
            //}
        };
        return Device;
    }());
    exports.Device = Device;
});
define("scripts/interfaces/PrototypeImplementation/Consumables/Sink", ["require", "exports", "scripts/interfaces/PrototypeImplementation/Consumables/Device"], function (require, exports, Device_js_1) {
    "use strict";
    exports.__esModule = true;
    var Sink = /** @class */ (function () {
        function Sink(deviceType, mute, unMute) {
            var device = new Device_js_1.Device(fm.liveswitch.Guid.newGuid().toString(), deviceType.toString(), deviceType);
            this.sinkDevice = device;
            this.muteSink = mute;
            this.unMuteSink = unMute;
            // now need to something about start/stop.... make sense if 
        }
        Sink.prototype.mute = function () {
            this.muteSink();
        };
        ;
        Sink.prototype.unmute = function () {
            this.unMuteSink();
        };
        ;
        return Sink;
    }());
    exports.Sink = Sink;
});
define("scripts/interfaces/PrototypeImplementation/Consumables/Source", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var Source = /** @class */ (function () {
        function Source(sourceDevice, autoPreview) {
            this._autopreview = true;
            this._isSourceStarted = false;
            this._sourceDevice = sourceDevice;
            if (autoPreview) {
                this.autopreview = autoPreview;
            }
        }
        Object.defineProperty(Source.prototype, "autopreview", {
            get: function () {
                return this._autopreview;
            },
            set: function (autopreview) {
                this._autopreview = autopreview;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Source.prototype, "sourceDevice", {
            get: function () {
                return this._sourceDevice;
            },
            set: function (sourceDevice) {
                this._sourceDevice = sourceDevice;
                // enable this source
            },
            enumerable: true,
            configurable: true
        });
        Source.prototype.preview = function (element) {
            throw new Error("Method not implemented.");
        };
        Source.prototype.start = function () {
            this.sourceDevice.start();
            this._isSourceStarted = true;
            throw new Error("Method not implemented.");
        };
        Source.prototype.stop = function () {
            this.sourceDevice.stop();
            this._isSourceStarted = false;
            throw new Error("Method not implemented.");
        };
        Source.prototype.mute = function (file) {
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
        };
        Source.prototype.unmute = function () {
            throw new Error("Method not implemented.");
        };
        return Source;
    }());
    exports.Source = Source;
});
define("scripts/interfaces/PrototypeImplementation/Consumables/SubStream", ["require", "exports", "../../Interfaces/ISubStream.js"], function (require, exports, ISubStream_js_1) {
    "use strict";
    exports.__esModule = true;
    var SubStream = /** @class */ (function () {
        // Either a Incoming Stream.. or outgoing stream
        // need to populate either sinks or sources
        // its one or the other
        function SubStream(id, enableSubStream, type, sink) {
            this.isEnabled = true;
            this._id = id;
            this.substreamType = type;
            this._enableSubStream = enableSubStream;
            // can substream without a sink or source
            //this._sink = sink;
        }
        Object.defineProperty(SubStream.prototype, "id", {
            get: function () {
                return this._id;
            },
            set: function (id) {
                this._id = id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SubStream.prototype, "tag", {
            get: function () {
                return this._tag;
            },
            set: function (tag) {
                this._tag = tag;
            },
            enumerable: true,
            configurable: true
        });
        SubStream.prototype.enable = function () {
            if (this.isDisabled) {
                this.isEnabled = true;
                this._enableSubStream(true);
            }
        };
        SubStream.prototype.disable = function () {
            if (this.isEnabled) {
                this.isEnabled = false;
                this._enableSubStream(false);
            }
        };
        SubStream.prototype.play = function (sink) {
            if (sink) {
                throw new Error("What do you you want me do with this sink?");
            }
            this.enable();
            // there is no way for them to know sinks currently
            // play to sink if enabled?
            // is this same thing as enable?
            // are there multiple sinks?
        };
        Object.defineProperty(SubStream.prototype, "isNew", {
            get: function () {
                if (this.state == ISubStream_js_1.SubStreamState.New) {
                    return true;
                }
                return false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SubStream.prototype, "isDisabled", {
            get: function () {
                return !this.isEnabled;
            },
            set: function (disable) {
                this.isEnabled = !disable;
            },
            enumerable: true,
            configurable: true
        });
        SubStream.prototype.enabled = function () {
            var me = this;
            var promise = new Promise(function (resolve, reject) {
                if (me.isEnabled) {
                    resolve(me);
                }
                else {
                    reject(me);
                }
            });
            return promise;
        };
        SubStream.prototype.disabled = function () {
            var me = this;
            var promise = new Promise(function (resolve, reject) {
                if (me.isDisabled) {
                    resolve(me);
                }
                else {
                    reject(me);
                }
            });
            return promise;
        };
        return SubStream;
    }());
    exports.SubStream = SubStream;
});
define("scripts/interfaces/PrototypeImplementation/Consumables/Stream", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var Stream = /** @class */ (function () {
        function Stream(isMine, onStateChange, streamType, video, audio) {
            this._isMine = false;
            this._id = fm.liveswitch.Guid.newGuid().toString();
            this._tag = "Not populated";
            // need another thing in the constructor for sinks
            var me = this;
            me._isMine = isMine;
            onStateChange = function (state) {
                if (me.onstatechange) {
                    me.onstatechange(me, state);
                }
            };
            this.streamType = streamType;
            this.audio = audio;
            this.video = video;
        }
        Stream.prototype.start = function () {
            this.video.enable();
            this.audio.enable();
        };
        Stream.prototype.stop = function () {
            this.video.disable();
            this.audio.disable();
        };
        Object.defineProperty(Stream.prototype, "audioSink", {
            get: function () {
                //if (this.audio && this.audio.sink) {
                //    return this.audio.sink;
                //}
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Stream.prototype, "videoSink", {
            get: function () {
                //if (this.video && this.video.sink) {
                //    return this.video.sink;
                //}
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Stream.prototype, "audioSource", {
            get: function () {
                //if (this.audio && this.audio.source) {
                //    return this.audio.source;
                //}
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Stream.prototype, "audioSourceDeviceId", {
            get: function () {
                //if (this.audio && this.audio.sourceDeviceId) {
                //    return this.audio.sourceDeviceId;
                //}
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Stream.prototype, "videoSource", {
            get: function () {
                //if (this.video && this.video.source) {
                //    return this.video.source;
                //}
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Stream.prototype, "videoSourceDeviceId", {
            get: function () {
                //if (this.video && this.video.sourceDeviceId) {
                //    return this.video.sourceDeviceId;
                //}
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Stream.prototype, "isMine", {
            get: function () {
                //if (this.video.source || this.audio.source) {
                //    return true;
                //}
                //return false;
                return this._isMine;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Stream.prototype, "id", {
            get: function () {
                return this.id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Stream.prototype, "tag", {
            get: function () {
                return this._tag;
            },
            set: function (tag) {
                this.tag = tag;
            },
            enumerable: true,
            configurable: true
        });
        Stream.prototype.connected = function () {
            throw new Error("Method not implemented.");
        };
        Stream.prototype.disconnected = function () {
            throw new Error("Method not implemented.");
        };
        Stream.prototype.play = function (args) {
            var video = true;
            var audio = true;
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
        };
        return Stream;
    }());
    exports.Stream = Stream;
});
define("scripts/interfaces/PrototypeImplementation/Consumables/DevicePlayArgs", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var PlayArgs = /** @class */ (function () {
        function PlayArgs(audioSink, videoSink) {
            this.audioSink = audioSink;
            this.videoSink = videoSink;
        }
        return PlayArgs;
    }());
    exports.PlayArgs = PlayArgs;
    var DevicePlayArgs = /** @class */ (function (_super) {
        __extends(DevicePlayArgs, _super);
        function DevicePlayArgs(microphone, camera, audioOutputDeviceId, videoSinkElementId, audioSink, videoSink) {
            var _this = _super.call(this, audioSink, videoSink) || this;
            _this.audioOutputDeviceId = audioOutputDeviceId;
            _this.videoSinkElementId = videoSinkElementId;
            _this.microphone = microphone;
            _this.camera = camera;
            return _this;
        }
        return DevicePlayArgs;
    }(PlayArgs));
    exports.DevicePlayArgs = DevicePlayArgs;
});
define("scripts/interfaces/PrototypeImplementation/Consumables/DeviceSubStream", ["require", "exports", "scripts/interfaces/PrototypeImplementation/Consumables/SubStream", "../../Interfaces/SubStreamType.js", "scripts/interfaces/PrototypeImplementation/Consumables/SharedObjects"], function (require, exports, SubStream_js_1, SubStreamType_js_1, SharedObjects_js_1) {
    "use strict";
    exports.__esModule = true;
    var DeviceSubStream = /** @class */ (function (_super) {
        __extends(DeviceSubStream, _super);
        function DeviceSubStream(id, enableSubStream, type, sink, source, isSource, remoteMedia) {
            var _this = _super.call(this, id, enableSubStream, type) || this;
            _this._isSource = false;
            _this._remoteMedia = null;
            if (isSource) {
                _this._isSource = isSource;
            }
            if (remoteMedia) {
                _this._remoteMedia = remoteMedia;
            }
            _this.source = source;
            _this.sink = sink;
            return _this;
        }
        Object.defineProperty(DeviceSubStream.prototype, "deviceId", {
            get: function () {
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
            },
            set: function (newDeviceId) {
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
            },
            enumerable: true,
            configurable: true
        });
        return DeviceSubStream;
    }(SubStream_js_1.SubStream));
    exports.DeviceSubStream = DeviceSubStream;
});
define("scripts/interfaces/PrototypeImplementation/Consumables/DeviceStream", ["require", "exports", "scripts/interfaces/PrototypeImplementation/Consumables/Stream", "../../Interfaces/StreamType.js"], function (require, exports, Stream_js_1, StreamType_js_1) {
    "use strict";
    exports.__esModule = true;
    var DeviceStream = /** @class */ (function (_super) {
        __extends(DeviceStream, _super);
        // dont need fm sources ... will in source in substream
        function DeviceStream(isMine, onStateChange, camera, microphone) {
            return _super.call(this, isMine, onStateChange, StreamType_js_1.StreamType.Device, camera, microphone) || this;
        }
        Object.defineProperty(DeviceStream.prototype, "camera", {
            get: function () {
                return this.video;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DeviceStream.prototype, "microphone", {
            get: function () {
                return this.audio;
            },
            enumerable: true,
            configurable: true
        });
        DeviceStream.prototype.play = function (args) {
            var video = true;
            var audio = true;
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
        };
        ;
        return DeviceStream;
    }(Stream_js_1.Stream));
    exports.DeviceStream = DeviceStream;
});
define("scripts/interfaces/PrototypeImplementation/Consumables/MessageArgs", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var MessageArgs = /** @class */ (function () {
        function MessageArgs(message) {
            this.stringMessage = message;
        }
        return MessageArgs;
    }());
    exports.MessageArgs = MessageArgs;
});
define("scripts/interfaces/PrototypeImplementation/Consumables/ScreenStream", ["require", "exports", "scripts/interfaces/PrototypeImplementation/Consumables/Stream", "../../Interfaces/StreamType.js"], function (require, exports, Stream_js_2, StreamType_js_2) {
    "use strict";
    exports.__esModule = true;
    var ScreenStream = /** @class */ (function (_super) {
        __extends(ScreenStream, _super);
        function ScreenStream(isMine, onStateChange, screenVideo, systemAudio) {
            var _this = _super.call(this, isMine, onStateChange, StreamType_js_2.StreamType.Device, screenVideo, systemAudio) || this;
            _this.displays = new Array();
            _this.systemAudios = new Array();
            return _this;
        }
        Object.defineProperty(ScreenStream.prototype, "display", {
            get: function () {
                if (this.displays.length == 0) {
                    return null;
                }
                return this.displays[0];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScreenStream.prototype, "systemAudio", {
            get: function () {
                if (this.displays.length == 0) {
                    return null;
                }
                return this.displays[0];
            },
            enumerable: true,
            configurable: true
        });
        ScreenStream.prototype.play = function (args) {
            var haveSystemAudio = true;
            if (args) {
                if (args.systemAudio) {
                    haveSystemAudio = args.systemAudio;
                }
                // ignore the other args for now?
            }
            this.displays.forEach(function (thisDisplay) {
                //if (thisDisplay.sink.sinkDevice.id == args.videoSink.sinkDevice.id) {
                thisDisplay.play();
            });
            if (haveSystemAudio) {
                this.systemAudios.forEach(function (thisSystemAudio) {
                    thisSystemAudio.play();
                });
            }
        };
        return ScreenStream;
    }(Stream_js_2.Stream));
    exports.ScreenStream = ScreenStream;
});
define("scripts/interfaces/PrototypeImplementation/Consumables/Participant", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var Participant = /** @class */ (function () {
        function Participant(id, isMe) {
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
        Object.defineProperty(Participant.prototype, "screenStream", {
            get: function () {
                if (this.screenStreams.length == 0) {
                    return null;
                }
                return this.screenStreams[0];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Participant.prototype, "deviceStream", {
            get: function () {
                if (this.deviceStreams.length == 0) {
                    return null;
                }
                return this.deviceStreams[0];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Participant.prototype, "fileStream", {
            // Don't need this I think
            //private isInvolvedWithYourStreaming = true;
            //get isInvolvedWithYou(): boolean {
            //    return this.isInvolvedWithYourStreaming;
            //}
            //set isInvolvedWithYou(boolean: boolean) {
            //    this.isInvolvedWithYourStreaming = boolean;
            //}
            // don't worry about the following
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Participant.prototype, "fileStreams", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        return Participant;
    }());
    exports.Participant = Participant;
});
define("scripts/interfaces/PrototypeImplementation/Consumables/ReceiveArgs", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var ReceiveArgs = /** @class */ (function () {
        function ReceiveArgs(senderId) {
            this.senderId = senderId;
        }
        return ReceiveArgs;
    }());
    exports.ReceiveArgs = ReceiveArgs;
});
define("scripts/interfaces/PrototypeImplementation/Consumables/SendArgs", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var SendArgs = /** @class */ (function () {
        function SendArgs(onsent, ondelivered, onprogress, onfailed, onviewed) {
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
        return SendArgs;
    }());
    exports.SendArgs = SendArgs;
});
define("scripts/interfaces/PrototypeImplementation/Consumables/SendStatus", ["require", "exports", "../../Interfaces/ISendStatus.js"], function (require, exports, ISendStatus_js_1) {
    "use strict";
    exports.__esModule = true;
    var SendStatus = /** @class */ (function () {
        function SendStatus() {
            this.state = ISendStatus_js_1.SendState.New; // need to come back to this
            this.deliveredToParticipants = Array(); // need to come back to this
            this.viewedByParticipants = Array(); // need to come back to this
        }
        return SendStatus;
    }());
    exports.SendStatus = SendStatus;
});
define("scripts/interfaces/PrototypeImplementation/Consumables/StringMessageArgs", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    // old
    var StringMessageArgs = /** @class */ (function () {
        function StringMessageArgs(message) {
            this.message = message;
        }
        return StringMessageArgs;
    }());
    exports.StringMessageArgs = StringMessageArgs;
});
define("scripts/interfaces/PrototypeImplementation/Consumables/DisplaySubStream", ["require", "exports", "scripts/interfaces/PrototypeImplementation/Consumables/SubStream", "../../Interfaces/IScreenSubStream.js"], function (require, exports, SubStream_js_2, IScreenSubStream_js_1) {
    "use strict";
    exports.__esModule = true;
    var DisplaySubStream = /** @class */ (function (_super) {
        __extends(DisplaySubStream, _super);
        function DisplaySubStream(id, enableSubStream, type, sink) {
            return _super.call(this, id, enableSubStream, type) || this;
        }
        Object.defineProperty(DisplaySubStream.prototype, "sourceDisplaySurface", {
            get: function () {
                return IScreenSubStream_js_1.SourceDisplaySurfaceType.Monitor;
            },
            set: function (SourceDisplaySurfaceType) {
                // later
            },
            enumerable: true,
            configurable: true
        });
        return DisplaySubStream;
    }(SubStream_js_2.SubStream));
    exports.DisplaySubStream = DisplaySubStream;
});
define("scripts/interfaces/PrototypeImplementation/Consumables/Session", ["require", "exports", "../../Interfaces/DeviceType.js", "../../Interfaces/ISession.js", "../../Interfaces/IStream.js", "../../Interfaces/SubStreamType.js", "scripts/interfaces/PrototypeImplementation/Consumables/CentralConnections", "scripts/interfaces/PrototypeImplementation/Consumables/DefaultConfig", "scripts/interfaces/PrototypeImplementation/Consumables/DeviceStream", "scripts/interfaces/PrototypeImplementation/Consumables/EntryPoint", "scripts/interfaces/PrototypeImplementation/Consumables/Participant", "scripts/interfaces/PrototypeImplementation/Consumables/ReceiveArgs", "scripts/interfaces/PrototypeImplementation/Consumables/ScreenStream", "scripts/interfaces/PrototypeImplementation/Consumables/SendStatus", "scripts/interfaces/PrototypeImplementation/Consumables/SharedObjects", "scripts/interfaces/PrototypeImplementation/Consumables/Sink", "scripts/interfaces/PrototypeImplementation/Consumables/StringMessageArgs", "scripts/interfaces/PrototypeImplementation/Consumables/SubStream", "scripts/interfaces/PrototypeImplementation/Consumables/DeviceSubStream", "scripts/interfaces/PrototypeImplementation/Consumables/DisplaySubStream"], function (require, exports, DeviceType_js_1, ISession_js_1, IStream_js_1, SubStreamType_js_2, CentralConnections_js_1, DefaultConfig_js_1, DeviceStream_js_1, EntryPoint_js_2, Participant_js_1, ReceiveArgs_js_1, ScreenStream_js_1, SendStatus_js_1, SharedObjects_js_2, Sink_js_1, StringMessageArgs_js_1, SubStream_js_3, DeviceSubStream_js_1, DisplaySubStream_js_1) {
    "use strict";
    exports.__esModule = true;
    //namespace ls is fm.liveswitch;
    var Session = /** @class */ (function () {
        //private videoContainer: HTMLElement | null = null;
        function Session(channel, liveSwitchClient, notifyLeave, videoContainer, invitation) {
            var _this = this;
            this.state = ISession_js_1.SessionState.New;
            this.sendMessage = function (args) {
                var _a;
                if (_this.canSendMessages) {
                    var sendStatus = new SendStatus_js_1.SendStatus(); // need to get the whole participants things sorted out.
                    var future = (_a = _this.messageDataChannel) === null || _a === void 0 ? void 0 : _a.sendDataString(args.stringMessage);
                    future === null || future === void 0 ? void 0 : future.then(function (result) {
                        if (args === null || args === void 0 ? void 0 : args.onSent) {
                            args === null || args === void 0 ? void 0 : args.onSent(args);
                        }
                    }).fail(function (ex) {
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
            var channelClaim = new fm.liveswitch.ChannelClaim(channel);
            //channelClaim.setAction(fm.liveswitch.ClaimAction.Claim);
            var token = fm.liveswitch.Token.generateClientJoinToken(this.defaultConfig.DefaultAppId, this.defaultConfig.DefaultUserId, this.defaultConfig.DefaultDevice, this.defaultConfig.ClientId, channelClaim, this.defaultConfig.DefaultSharedSecret);
            this._LiveSwitchClient.join(channel, token).then(function (channel) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    me.OnClientJoinInAChannel(channel);
                    return [2 /*return*/];
                });
            }); }).fail(function (ex) {
                throw ex;
            });
            //}
        }
        Session.prototype.leave = function () {
            for (var connectionId in this.sfuDownstreamConnections) {
                var connection = this.sfuDownstreamConnections[connectionId];
                connection.close();
            }
            for (var connectionId in this.sfuUpstreamConnection) {
                var connection = this.sfuUpstreamConnection[connectionId];
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
        };
        Object.defineProperty(Session.prototype, "me", {
            get: function () {
                var returnParticipant;
                this.participants.forEach(function (participant) {
                    if (participant.isMe) {
                        returnParticipant = participant;
                    }
                });
                if (returnParticipant) {
                    return returnParticipant;
                }
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Session.prototype, "screenStream", {
            get: function () {
                if (this.screenStreams.length == 0) {
                    return null;
                }
                return this.screenStreams[0];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Session.prototype, "screenStreams", {
            get: function () {
                var screens = new Array();
                this.participants.forEach(function (participant) {
                    participant.screenStreams.forEach(function (screen) {
                        screens.push(screen);
                    });
                });
                return screens;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Session.prototype, "deviceStream", {
            get: function () {
                if (this.deviceStreams.length == 0) {
                    return null;
                }
                return this.deviceStreams[0];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Session.prototype, "deviceStreams", {
            get: function () {
                var devices = new Array();
                this.participants.forEach(function (participant) {
                    participant.deviceStreams.forEach(function (device) {
                        devices.push(device);
                    });
                });
                return devices;
            },
            enumerable: true,
            configurable: true
        });
        //First
        Session.prototype.startScreenStream = function (args) {
            var me = this;
            if (args) {
                // we ignore system audio for now, do now do anything for now
                //args.systemAudio;
            }
            var promise = new Promise(function (resolve, reject) {
                if (!me.me.screenStream) {
                    SharedObjects_js_2.SharedObjects.Instance().createScreenStream(me, true, false).then(function (localMedia) {
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
        };
        //2nd
        Session.prototype.startDeviceStream = function (args) {
            var me = this;
            var promise = new Promise(function (resolve, reject) {
                if (!me.me || !me.me.deviceStream) {
                    SharedObjects_js_2.SharedObjects.Instance().createCameraStream(me, null, true, true).then(function (localMedia) {
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
        };
        Session.prototype.playStreams = function () { }; // not implemented
        Session.prototype.playScreenStreams = function (args) { }; // not implemented
        Session.prototype.playDeviceStreams = function (args) { }; // not implemented
        Session.prototype.hold = function () {
            throw new Error("Method not implemented.");
        };
        Session.prototype.resume = function () {
            throw new Error("Method not implemented.");
        };
        //private sfuDownstreamConnectionsForScreen: fm.liveswitch.Hash<string, fm.liveswitch.SfuDownstreamConnection> = {};
        Session.prototype.OnClientJoinInAChannel = function (channel) {
            var _this = this;
            if (!channel) {
                return;
            }
            var me = this;
            me.id = channel.getId();
            this.liveSwitchChannel = channel;
            /// let open a datachannel on mcu
            // let leave messageing alone
            this.openMcuConnectionForDataChannel(channel);
            SharedObjects_js_2.SharedObjects.Instance().createCameraStream(this, this._videoContainer, true, true).then(function (localMedia) {
                _this.openSfuUpstreamConnection(channel, localMedia, false, true, true);
                // channel.addOnRemoteClientJoin((client) => {
                channel.addOnRemoteUpstreamConnectionUpdate(function (connectioninfo) {
                    me.participants.forEach(function (participant) {
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
                channel.addOnRemoteClientLeave(function (clientInfo) {
                    for (var i = 0; i < me.participants.length; i++) {
                        var participant = me.participants[i];
                        if (participant.id == clientInfo.getId()) {
                            delete me.participants[i];
                            CentralConnections_js_1.CentralConnections.Instance().remoteConnectionInfoForScreen["delete"](clientInfo.getId());
                            CentralConnections_js_1.CentralConnections.Instance().remoteConnectionInfoForCamera["delete"](clientInfo.getId());
                        }
                    }
                });
                channel.addOnRemoteUpstreamConnectionOpen(function (remoteConnectionInfo) {
                    var participantForThisConnectionInfo = null;
                    var createPartipant = true;
                    me.participants.forEach(function (participant) {
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
                    var participantForThisConnectionInfo = null;
                    var createPartipant = true;
                    me.participants.forEach(function (participant) {
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
        };
        //    let messageDataStream
        Session.prototype.openMcuConnectionForDataChannel = function (channel) {
            var _this = this;
            var me = this;
            me.messageDataChannel = new fm.liveswitch.DataChannel("fm.liveswitch.message", true, "Message"); // need for sending messages
            me.messageDataChannel.addOnStateChange(function (dataChannel) {
                if (dataChannel.getState() == fm.liveswitch.DataChannelState.Connected) {
                    me.canSendMessages = true;
                }
                else {
                    me.canSendMessages = false;
                }
            });
            // can now receive messages
            var onReceive = function (dataChannelReceiveArgs) {
                if (dataChannelReceiveArgs.getDataString != null) {
                    //onIncomingMessage: IAction2<ISession, IMessageArgs & IReceiveArgs>;
                    if (me.onIncomingMessage != null) {
                        var result = {};
                        var message = new StringMessageArgs_js_1.StringMessageArgs(dataChannelReceiveArgs.getDataString());
                        var sender = new ReceiveArgs_js_1.ReceiveArgs(dataChannelReceiveArgs.getRemoteConnectionInfo().getUserAlias());
                        //(result as StringMessageArgs) = message;
                        //(result as ReceiveArgs) = sender;
                        result.message = dataChannelReceiveArgs.getDataString();
                        result.senderId = dataChannelReceiveArgs.getRemoteConnectionInfo().getUserAlias();
                        me.onIncomingMessage(_this, result);
                    }
                }
            };
            me.messageDataChannel.setOnReceive(onReceive);
            var dataStream = new fm.liveswitch.DataStream(me.messageDataChannel);
            var connection = channel.createMcuConnection(dataStream);
            this.dataChannelConnection = connection;
            connection.setDisableAutomaticIceServers(false);
            connection.addOnStateChange(function (something) {
                if (something.getState() == fm.liveswitch.ConnectionState.Failed) {
                    _this.openMcuConnectionForDataChannel(channel);
                }
            });
            connection.open();
            // hopefully it was succesfull 
        };
        //wait = (ms: number) => new Promise(res => setTimeout(res, ms));
        //private async prepareLocalMedia(): Promise<void> {
        Session.prototype._Direction = function (streamDirection) {
            return fm.liveswitch.StreamDirectionHelper.directionToString(streamDirection);
        };
        Session.prototype.openSfuDownstreamConnection = function (remoteConnectionInfo, channel, screenStream, participant) {
            var _this = this;
            var videoSink = null;
            var audioSink = null;
            var me = this;
            var remoteMedia = new fm.liveswitch.RemoteMedia();
            //if (screenStream) {
            //    CentralConnections.Instance().remoteStreamsForScreen.set(remoteConnectionInfo.getClientId(), remoteMedia);
            //}
            //else {
            //    CentralConnections.Instance().remoteStreamsForCamera.set(remoteConnectionInfo.getClientId(), remoteMedia);
            //}
            if (remoteMedia.getView()) {
                remoteMedia.getView().id = 'remoteView_' + remoteMedia.getId();
            }
            var connection;
            var audioStream;
            var videoStream;
            var audioDeviceType = DeviceType_js_1.DeviceType.Microphone;
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
            audioSink = new Sink_js_1.Sink(audioDeviceType, function () {
                if (remoteMedia.getAudioTrack()) {
                    remoteMedia.getAudioTrack().setMuted(true);
                }
            }, function () {
                if (remoteMedia.getAudioTrack()) {
                    remoteMedia.getAudioTrack().setMuted(false);
                }
            });
            var autoPlayAudio = this.autoplayDeviceMicrophoneStreams;
            if (screenStream) {
                autoPlayAudio = this.autoplayScreenSystemAudioStreams;
            }
            if (!remoteConnectionInfo.getHasAudio() || !this.autoplayStreams || !autoPlayAudio) {
                audioStream.changeDirection(fm.liveswitch.StreamDirection.Inactive);
            }
            videoStream = new fm.liveswitch.VideoStream(remoteMedia);
            videoStream.getInfo();
            var videoDeviceSink = DeviceType_js_1.DeviceType.Camera;
            if (screenStream) {
                videoDeviceSink = DeviceType_js_1.DeviceType.Screen;
            }
            videoSink = new Sink_js_1.Sink(videoDeviceSink, function () {
                if (remoteMedia.getVideoTrack()) {
                    remoteMedia.getVideoTrack().setMuted(true);
                }
            }, function () {
                if (remoteMedia.getVideoTrack()) {
                    remoteMedia.getVideoTrack().setMuted(false);
                }
            });
            var autoPlayVideo = this.autoplayDeviceCameraStreams;
            if (screenStream) {
                autoPlayVideo = this.autoplayScreenDisplayStreams;
            }
            if (!remoteConnectionInfo.getHasVideo() || !this.autoplayStreams || !autoPlayVideo) {
                videoStream.changeDirection(fm.liveswitch.StreamDirection.Inactive);
            }
            else {
                SharedObjects_js_2.SharedObjects.Instance().getLayoutManager(me).addRemoteView(remoteMedia.getId(), remoteMedia.getView());
            }
            var updateConnectionForVideo = function (enableVideo) {
                var connectionConfig = connection.getConfig();
                var layoutHasRemoteView = false;
                SharedObjects_js_2.SharedObjects.Instance().getLayoutManager(me).getRemoteViewIds().forEach(function (id) {
                    if (id == remoteMedia.getId()) {
                        layoutHasRemoteView = true;
                    }
                });
                if (enableVideo) {
                    var hasVideo = false;
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
            var updateConnectionForAudio = function (enableAudio) {
                var connectionConfig = connection.getConfig();
                var hasAudio = CentralConnections_js_1.CentralConnections.Instance().remoteConnectionInfoForCamera.get(remoteConnectionInfo.getClientId()).getHasAudio();
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
            var onStateChangeOnStream = null; // need this
            if (screenStream) {
                var videoSubStream = new DisplaySubStream_js_1.DisplaySubStream(videoStream.getId(), updateConnectionForVideo, SubStreamType_js_2.SubStreamType.Video, videoSink); // need to create this
                var audioSubStream = new SubStream_js_3.SubStream(audioStream.getId(), updateConnectionForAudio, SubStreamType_js_2.SubStreamType.Audio, audioSink); // need to create this
                participant.screenStreams.push(new ScreenStream_js_1.ScreenStream(false, onStateChangeOnStream, videoSubStream, audioSubStream));
            }
            else {
                var videoSubStream = new DeviceSubStream_js_1.DeviceSubStream(videoStream.getId(), updateConnectionForVideo, SubStreamType_js_2.SubStreamType.Video, videoSink); // need to create this
                var audioSubStream = new DeviceSubStream_js_1.DeviceSubStream(audioStream.getId(), updateConnectionForAudio, SubStreamType_js_2.SubStreamType.Audio, audioSink, null, false, remoteMedia); // need to create this
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
            connection.addOnStateChange(function (connection) {
                fm.liveswitch.Log.info(connection.getId() + ': SFU downstream connection state is ' +
                    new fm.liveswitch.ConnectionStateWrapper(connection.getState()).toString() + '.');
                // Cleanup if the connection closes or fails.
                if (connection.getState() == fm.liveswitch.ConnectionState.Closing ||
                    connection.getState() == fm.liveswitch.ConnectionState.Failing) {
                    if (connection.getRemoteClosed()) {
                        fm.liveswitch.Log.info(connection.getId() + ': Media server closed the connection.');
                    }
                    // Remove the remote view from the layout.
                    SharedObjects_js_2.SharedObjects.Instance().getLayoutManager(_this).removeRemoteView(remoteMedia.getId());
                    remoteMedia.destroy();
                    delete _this.sfuDownstreamConnections[connection.getId()];
                }
                else if (connection.getState() == fm.liveswitch.ConnectionState.Failed) {
                    // Note: no need to close the connection as it's done for us.
                    me.updateDownstreamState(ISession_js_1.SessionState.Terminated);
                    if (onStateChangeOnStream) {
                        onStateChangeOnStream(IStream_js_1.StreamState.Disconnected);
                    }
                    _this.openSfuDownstreamConnection(remoteConnectionInfo, channel, screenStream, participant);
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
        };
        Session.prototype.openSfuUpstreamConnection = function (channel, localMedia, screen, video, audio) {
            var _this = this;
            var me = this;
            // incorrect order... localmedia is seperate now
            // need to callback for stuff
            //let videoSubStream = new SubStream("", SubStreamType.Video, undefined, new Source(new Device("", "", DeviceType.Camera), true));
            //me.me.deviceStreams.push(new DeviceStream(null));
            //let localMedia = SharedObjects.Instance().cameraLocalMedia;
            var connection;
            var audioStream = null;
            var videoStream = null;
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
            var updateConnectionForVideo = function (enableVideo) {
                var connectionConfig = connection.getConfig();
                var layoutHasRemoteView = false;
                if (enableVideo) {
                    connectionConfig.setVideoDirection(me._Direction(fm.liveswitch.StreamDirection.SendOnly));
                }
                else {
                    connectionConfig.setVideoDirection(me._Direction(fm.liveswitch.StreamDirection.Inactive));
                }
                connection.update(connectionConfig);
            };
            var updateConnectionForAudio = function (enableAudio) {
                var connectionConfig = connection.getConfig();
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
            var onStateChangeOnStream = null; // need this
            //update the substream state
            if (screen) {
                var videoSubStream = new DisplaySubStream_js_1.DisplaySubStream(videoStream.getId(), updateConnectionForVideo, SubStreamType_js_2.SubStreamType.Video); // need to create this
                me.me.screenStreams.push(new ScreenStream_js_1.ScreenStream(true, onStateChangeOnStream, videoSubStream, null));
            }
            else {
                var videoSubStream = new DeviceSubStream_js_1.DeviceSubStream(videoStream.getId(), updateConnectionForVideo, SubStreamType_js_2.SubStreamType.Video, null, null, true); // need to create this
                var audioSubStream = new DeviceSubStream_js_1.DeviceSubStream(audioStream.getId(), updateConnectionForAudio, SubStreamType_js_2.SubStreamType.Audio, null, null, true); // need to create this
                me.me.deviceStreams.push(new DeviceStream_js_1.DeviceStream(true, onStateChangeOnStream, videoSubStream, audioSubStream));
            }
            this.sfuUpstreamConnection[connection.getId()] = connection;
            connection.setDisableAutomaticIceServers(false); // just with auto turn for now
            connection.addOnStateChange(function (connection) {
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
                    _this.openSfuUpstreamConnection(channel, localMedia, screen);
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
        };
        Session.prototype.updateUpstreamState = function (upstreamState) {
            var newState = this.state;
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
        };
        Session.prototype.updateDownstreamState = function (downstreamState) {
            var newState = this.state;
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
        };
        Session.prototype.notifyTyping = function () {
            throw new Error("Method not implemented.");
        };
        Session.prototype.playFileStreams = function (args) { }; // not implemented
        Session.prototype.sendFile = function (args) {
            throw new Error("not implemented");
            //return new SendStatus();
        };
        ;
        Session.prototype.startFileStream = function (args) {
            throw new Error("Method not implemented.");
        };
        Session.prototype.inviteUser = function (userId) {
            throw new Error("not implemented");
        };
        Session.prototype.inviteClient = function (clientId) {
            throw new Error("not implemented");
        };
        Session.prototype.invitePhone = function (phoneNumber) {
            throw new Error("not implemented");
        };
        Session.prototype.stopRecording = function () {
            throw new Error("Method not implemented.");
        };
        Session.prototype.kickParticipant = function (participantId, reason) {
            throw new Error("not implmented");
        };
        Session.prototype.startRecording = function () {
            throw new Error("Method not implemented.");
        };
        Session.prototype.connecting = function () {
            throw new Error("Method not implemented.");
        };
        Session.prototype.connected = function () {
            throw new Error("Method not implemented.");
        };
        Session.prototype.terminated = function () {
            throw new Error("Method not implemented.");
        };
        // internal
        Session.cameraAndMircophoneConnectionTag = "ca";
        Session.screenAndSystemAudioConnectionTag = "sa";
        return Session;
    }());
    exports.Session = Session;
});
define("scripts/interfaces/PrototypeImplementation/Consumables/Conference", ["require", "exports", "scripts/interfaces/PrototypeImplementation/Consumables/Session"], function (require, exports, Session_js_1) {
    "use strict";
    exports.__esModule = true;
    var Conference = /** @class */ (function (_super) {
        __extends(Conference, _super);
        function Conference(channel, liveSwitchClient, notifyLeave, videoContainer, invitation) {
            return _super.call(this, channel, liveSwitchClient, notifyLeave, videoContainer, invitation) || this;
        }
        return Conference;
    }(Session_js_1.Session));
    exports.Conference = Conference;
});
define("scripts/interfaces/PrototypeImplementation/Consumables/CameraSource", ["require", "exports", "scripts/interfaces/PrototypeImplementation/Consumables/Source"], function (require, exports, Source_js_1) {
    "use strict";
    exports.__esModule = true;
    var CameraSource = /** @class */ (function (_super) {
        __extends(CameraSource, _super);
        function CameraSource(sourceDevice, autoPreview) {
            var _this = _super.call(this, sourceDevice, autoPreview) || this;
            //private localmedia: fm.liveswitch.LocalMedia;
            _this._layoutManager = null;
            return _this;
            //this.localmedia = localMedia;
        }
        CameraSource.prototype.updateLayout = function (layoutManager) {
            this._layoutManager = layoutManager;
        };
        // local media should have been started with this CameraSource and then set localmedia's view to layout
        CameraSource.prototype.preview = function (element) {
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
        };
        return CameraSource;
    }(Source_js_1.Source));
    exports.CameraSource = CameraSource;
    var preview = /** @class */ (function () {
        function preview(localMedia, layoutManager) {
            this.layoutManager = layoutManager;
        }
        return preview;
    }());
    exports.preview = preview;
});
define("scripts/interfaces/PrototypeImplementation/Consumables/MicrophoneSource", ["require", "exports", "scripts/interfaces/PrototypeImplementation/Consumables/Source"], function (require, exports, Source_js_2) {
    "use strict";
    exports.__esModule = true;
    var MicrophoneSource = /** @class */ (function (_super) {
        __extends(MicrophoneSource, _super);
        function MicrophoneSource(sourceDevice, autoPreview) {
            return _super.call(this, sourceDevice, autoPreview) || this;
        }
        return MicrophoneSource;
    }(Source_js_2.Source));
    exports.MicrophoneSource = MicrophoneSource;
});
define("scripts/interfaces/PrototypeImplementation/Consumables/ScreenSource", ["require", "exports", "scripts/interfaces/PrototypeImplementation/Consumables/Source"], function (require, exports, Source_js_3) {
    "use strict";
    exports.__esModule = true;
    var ScreenSource = /** @class */ (function (_super) {
        __extends(ScreenSource, _super);
        function ScreenSource(display, sourceDevice) {
            var _this = _super.call(this, sourceDevice) || this;
            _this.display = display;
            return _this;
        }
        return ScreenSource;
    }(Source_js_3.Source));
    exports.ScreenSource = ScreenSource;
});
define("scripts/interfaces/PrototypeImplementation/Consumables/Client", ["require", "exports", "../../Interfaces/IClient.js", "scripts/interfaces/PrototypeImplementation/Consumables/DefaultConfig", "scripts/interfaces/PrototypeImplementation/Consumables/EntryPoint", "scripts/interfaces/PrototypeImplementation/Consumables/Conference", "scripts/interfaces/PrototypeImplementation/Consumables/CameraSource", "scripts/interfaces/PrototypeImplementation/Consumables/Device", "../../Interfaces/DeviceType.js", "scripts/interfaces/PrototypeImplementation/Consumables/MicrophoneSource", "scripts/interfaces/PrototypeImplementation/Consumables/ScreenSource"], function (require, exports, IClient_js_1, DefaultConfig_js_2, EntryPoint_js_3, Conference_js_1, CameraSource_js_1, Device_js_2, DeviceType_js_2, MicrophoneSource_js_1, ScreenSource_js_1) {
    "use strict";
    exports.__esModule = true;
    var Client = /** @class */ (function () {
        function Client(userId, token) {
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
            var defaultConfig = this.defaultConfig;
            if (userId) {
                defaultConfig.DefaultUserId = userId;
            }
            defaultConfig.ClientId = userId;
            var channel = defaultConfig.DefaultChannel;
            var appId = defaultConfig.DefaultAppId;
            var sharedSecret = defaultConfig.DefaultSharedSecret;
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
                var claims = new Array();
                for (var i = 0; i < defaultConfig.DefaultChannels.length; i++) {
                    claims[i] = new fm.liveswitch.ChannelClaim(defaultConfig.DefaultChannels[i]);
                }
                var clientRoles = null;
                //token = fm.liveswitch.Token.generateClientRegisterToken(appId, defaultConfig.DefaultAppId, defaultConfig.DefaultDevice, defaultConfig.ClientId, clientRoles, claims, sharedSecret);
                // don't need to know the channel before hand
                token = fm.liveswitch.Token.generateClientRegisterToken(appId, defaultConfig.DefaultUserId, defaultConfig.DefaultDevice, defaultConfig.ClientId, clientRoles, new Array(), sharedSecret);
            }
            this._Token = token; /// assume 
            // don't think I need the following line
            //this.getinformationfromlocalmedia(); // let this happen ... who cares... it will populated.
        }
        Client.prototype.connect = function () {
            return __awaiter(this, void 0, void 0, function () {
                var me, promise;
                var _this = this;
                return __generator(this, function (_a) {
                    me = this;
                    this.onstatechange = (function (client, state) {
                        EntryPoint_js_3.LogDebug(state.toString());
                    });
                    promise = new Promise(function (resolve, reject) {
                        // need to backoff .. maybe later
                        _this._LiveSwitchClient.addOnStateChange(function (state) {
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
                        _this._LiveSwitchClient.register(_this._Token).then(function (o) {
                            if (o != null) {
                                _this._Channels = o;
                            }
                            EntryPoint_js_3.LogDebug("Client is registered");
                            // Do
                            resolve();
                        }).fail(function (o) {
                            EntryPoint_js_3.LogDebug(o.name + ": " + o.message + "\n" + o.stack);
                            reject();
                        });
                    });
                    return [2 /*return*/, promise];
                });
            });
        };
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
        Client.prototype.join = function (args) {
            var _this = this;
            var container = null;
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
            this.notifyConferenceLeaving[args.conferenceId] = function () {
                for (var i = 0; i < _this.conferences.length; i++) {
                    if (_this.conferences[i].id == args.conferenceId) {
                        delete _this.conferences[i];
                    }
                }
            };
            var conference = new Conference_js_1.Conference(args.conferenceId, this._LiveSwitchClient, this.notifyConferenceLeaving[args.conferenceId], container);
            this.conferences.push(conference);
            return conference;
        };
        Object.defineProperty(Client.prototype, "camera", {
            // Need to do
            get: function () {
                var _this = this;
                var promise = new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        this.cameras.then(function (inputs) {
                            if (inputs.length > 0) {
                                resolve(inputs[0]);
                            }
                            else {
                                resolve(null);
                            }
                        })["catch"](function (ex) {
                            reject(ex);
                        });
                        return [2 /*return*/];
                    });
                }); });
                return promise;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Client.prototype, "microphone", {
            get: function () {
                var _this = this;
                var promise = new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        this.microphones.then(function (inputs) {
                            if (inputs.length > 0) {
                                resolve(inputs[0]);
                            }
                            else {
                                resolve(null);
                            }
                        })["catch"](function (ex) {
                            reject(ex);
                        });
                        return [2 /*return*/];
                    });
                }); });
                return promise;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Client.prototype, "screen", {
            get: function () {
                var _this = this;
                var promise = new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        this.screens.then(function (inputs) {
                            if (inputs.length > 0) {
                                resolve(inputs[0]);
                            }
                            else {
                                resolve(null);
                            }
                        })["catch"](function (ex) {
                            reject(ex);
                        });
                        return [2 /*return*/];
                    });
                }); });
                return promise;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Client.prototype, "cameras", {
            // currently not being updated after once being populated.
            get: function () {
                var _this = this;
                var promise = new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    var cameraSourrces, localmedia;
                    return __generator(this, function (_a) {
                        cameraSourrces = new Array();
                        localmedia = new fm.liveswitch.LocalMedia(false, true);
                        localmedia === null || localmedia === void 0 ? void 0 : localmedia.getVideoSourceInputs().then(function (inputs) {
                            inputs.forEach(function (input) {
                                var device = new Device_js_2.Device(input.getId(), input.getName(), DeviceType_js_2.DeviceType.Camera, input);
                                cameraSourrces.push(new CameraSource_js_1.CameraSource(device));
                                resolve(cameraSourrces);
                            });
                        }).fail(function (ex) {
                            reject(ex);
                        });
                        return [2 /*return*/];
                    });
                }); });
                return promise;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Client.prototype, "microphones", {
            get: function () {
                var _this = this;
                var promise = new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    var micSourrces, localmedia;
                    return __generator(this, function (_a) {
                        micSourrces = new Array();
                        localmedia = new fm.liveswitch.LocalMedia(true, false);
                        localmedia === null || localmedia === void 0 ? void 0 : localmedia.getAudioSourceInputs().then(function (inputs) {
                            inputs.forEach(function (input) {
                                var device = new Device_js_2.Device(input.getId(), input.getName(), DeviceType_js_2.DeviceType.Microphone, input);
                                micSourrces.push(new MicrophoneSource_js_1.MicrophoneSource(device));
                                resolve(micSourrces);
                            });
                        }).fail(function (ex) {
                            reject(ex);
                        });
                        return [2 /*return*/];
                    });
                }); });
                return promise;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Client.prototype, "screens", {
            get: function () {
                var _this = this;
                var promise = new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    var screenSourrces, localmedia;
                    return __generator(this, function (_a) {
                        screenSourrces = new Array();
                        localmedia = new fm.liveswitch.LocalMedia(false, false, true);
                        localmedia === null || localmedia === void 0 ? void 0 : localmedia.getVideoSourceInputs().then(function (inputs) {
                            var i = 1;
                            inputs.forEach(function (input) {
                                var device = new Device_js_2.Device(input.getId(), input.getName(), DeviceType_js_2.DeviceType.Microphone, input);
                                screenSourrces.push(new ScreenSource_js_1.ScreenSource(i, device));
                                i++;
                                resolve(screenSourrces);
                            });
                        }).fail(function (ex) {
                            reject(ex);
                        });
                        return [2 /*return*/];
                    });
                }); });
                return promise;
            },
            enumerable: true,
            configurable: true
        });
        // Internal
        Client.prototype.changeStateTo = function (state) {
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
        };
        Client.prototype.record = function (audioOnly) {
            throw new Error("Method not implemented.");
        };
        Client.prototype.notifyTyping = function (peerId) {
            throw new Error("Method not implemented.");
        };
        Client.prototype.blockIncomingCalls = function (userId) {
            throw new Error("Method not implemented.");
        };
        Client.prototype.unblockIncomingCalls = function (userId) {
            throw new Error("Method not implemented.");
        };
        Client.prototype.getBlockedUserIds = function () {
            throw new Error("Method not implemented.");
        };
        Client.prototype.audioMessage = function (sendArgs) { }; // not implemented
        Client.prototype.videoMessage = function (sendArgs) { }; // not implemented
        Client.prototype.call = function (args) {
            throw new Error("call not supported yet");
        };
        return Client;
    }());
    exports.Client = Client;
});
define("scripts/AudioOnly", ["require", "exports", "scripts/interfaces/PrototypeImplementation/Consumables/Client"], function (require, exports, Client_js_1) {
    "use strict";
    exports.__esModule = true;
    var audioOnly = /** @class */ (function () {
        function audioOnly() {
            /// Find elements in html page.
            audioOnly.clientJoinButton = document.getElementById('clientJoin');
            audioOnly.clientJoinButton.addEventListener("click", this.joinConfererence);
            audioOnly.leaveConferenceButton = document.getElementById('leaveConference');
            audioOnly.leaveConferenceButton.addEventListener("click", this.conferenceLeave);
            audioOnly.leaveConferenceButton.disabled = true;
        }
        audioOnly.prototype.joinConfererence = function () {
            var client = new Client_js_1.Client();
            client.connect().then(function () {
                audioOnly.conference = client.join({ conferenceId: "123123", camera: false });
                audioOnly.leaveConferenceButton.disabled = false;
            });
        };
        audioOnly.prototype.conferenceLeave = function () {
            audioOnly.conference.leave();
            audioOnly.conference = null;
        };
        audioOnly.leaveConferenceButton = null;
        audioOnly.clientJoinButton = null;
        audioOnly.conference = null;
        return audioOnly;
    }());
    exports.audioOnly = audioOnly;
    var demo = new audioOnly();
});
define("scripts/HelloWorld", ["require", "exports", "scripts/interfaces/PrototypeImplementation/Consumables/Client"], function (require, exports, Client_js_2) {
    "use strict";
    exports.__esModule = true;
    var helloWorld = /** @class */ (function () {
        function helloWorld() {
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
        helloWorld.prototype.joinConfererence = function () {
            var client = new Client_js_2.Client(helloWorld.userId.value);
            client.connect().then(function () {
                helloWorld.conference = client.join({ conferenceId: "123123", videoSinkElementId: helloWorld.video.id });
                helloWorld.leaveConferenceButton.disabled = false;
            });
        };
        helloWorld.prototype.conferenceLeave = function () {
            helloWorld.conference.leave();
            helloWorld.conference = null;
        };
        helloWorld.leaveConferenceButton = null;
        helloWorld.clientJoinButton = null;
        helloWorld.video = null;
        helloWorld.userId = null;
        helloWorld.conference = null;
        return helloWorld;
    }());
    exports.helloWorld = helloWorld;
    var demo = new helloWorld();
});
define("scripts/interfaces/PrototypeImplementation/Consumables/DeviceManager", ["require", "exports", "../../Interfaces/IDeviceManager.js"], function (require, exports, IDeviceManager_js_1) {
    "use strict";
    exports.__esModule = true;
    var DeviceManager = /** @class */ (function () {
        function DeviceManager() {
        }
        DeviceManager.prototype.getMediaDevices = function () {
            var _this = this;
            var promise = new Promise(function (resolve, reject) {
                var devices = new Array();
                _this.getAudioDevices().then(function (audioDevices) {
                    audioDevices.forEach(function (audioDevice) {
                        devices.push(audioDevice);
                    });
                    _this.getVideoDevices().then(function (videoDevices) {
                        videoDevices.forEach(function (videoDevice) {
                            devices.push(videoDevice);
                        });
                        resolve(devices);
                    });
                });
            });
            return promise;
        };
        DeviceManager.prototype.getAudioDevices = function () {
            var _this = this;
            var promise = new Promise(function (resolve, reject) {
                var devices = new Array();
                _this.getAudioInputDevices().then(function (audioinputDevices) {
                    audioinputDevices.forEach(function (audioinputDevice) {
                        devices.push(audioinputDevice);
                    });
                    _this.getAudioOutputDevices().then(function (audioOutputDevices) {
                        audioOutputDevices.forEach(function (output) {
                            devices.push(output);
                        });
                        resolve(devices);
                    });
                });
            });
            return promise;
        };
        DeviceManager.prototype.getVideoDevices = function () {
            var _this = this;
            var promise = new Promise(function (resolve, reject) {
                var devices = new Array();
                _this.getVideoInputDevices().then(function (videoinputDevices) {
                    videoinputDevices.forEach(function (videoinputDevice) {
                        devices.push(videoinputDevice);
                    });
                    resolve(devices);
                });
            });
            return promise;
        };
        DeviceManager.prototype.getVideoInputDevices = function () {
            var promise = new Promise(function (resolve, reject) {
                var devices = new Array();
                var localmedia = new fm.liveswitch.LocalMedia(false, true);
                localmedia === null || localmedia === void 0 ? void 0 : localmedia.getVideoSourceInputs().then(function (inputs) {
                    inputs.forEach(function (input) {
                        var device = new DeviceInfo(input.getId(), input.getName(), IDeviceManager_js_1.DeviceKind.VideoInput);
                        devices.push(device);
                    });
                    resolve(devices);
                }).fail(function (ex) {
                    reject(ex);
                });
            });
            return promise;
        };
        DeviceManager.prototype.getAudioInputDevices = function () {
            var promise = new Promise(function (resolve, reject) {
                var devices = new Array();
                var localmedia = new fm.liveswitch.LocalMedia(true, false);
                localmedia === null || localmedia === void 0 ? void 0 : localmedia.getAudioSourceInputs().then(function (inputs) {
                    inputs.forEach(function (input) {
                        var device = new DeviceInfo(input.getId(), input.getName(), IDeviceManager_js_1.DeviceKind.AudioInput);
                        devices.push(device);
                    });
                    resolve(devices);
                }).fail(function (ex) {
                    reject(ex);
                });
            });
            return promise;
        };
        DeviceManager.prototype.getAudioOutputDevices = function () {
            var promise = new Promise(function (resolve, reject) {
                var devices = new Array();
                var remoteMedia = new fm.liveswitch.RemoteMedia;
                remoteMedia.getAudioSinkOutputs().then(function (audioOutputs) {
                    audioOutputs.forEach(function (audioOutput) {
                        var device = new DeviceInfo(audioOutput.getId(), audioOutput.getName(), IDeviceManager_js_1.DeviceKind.AudioOutput);
                        devices.push(device);
                    });
                    resolve(devices);
                }).fail(function (ex) {
                    reject(ex);
                });
            });
            return promise;
        };
        return DeviceManager;
    }());
    exports.DeviceManager = DeviceManager;
    var DeviceInfo = /** @class */ (function () {
        function DeviceInfo(deviceId, label, kind, groupId) {
            this._deviceId = null;
            this._groupId = null;
            this._kind = null;
            this._label = null;
            this._deviceId = deviceId;
            this._label = label;
            this._kind = kind;
            this._groupId = groupId;
        }
        Object.defineProperty(DeviceInfo.prototype, "deviceId", {
            get: function () {
                return this._deviceId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DeviceInfo.prototype, "groupId", {
            get: function () {
                return this._groupId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DeviceInfo.prototype, "kind", {
            get: function () {
                return this._kind;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DeviceInfo.prototype, "label", {
            get: function () {
                return this._label;
            },
            enumerable: true,
            configurable: true
        });
        return DeviceInfo;
    }());
    exports.DeviceInfo = DeviceInfo;
});
define("scripts/app", ["require", "exports", "scripts/interfaces/PrototypeImplementation/Consumables/Client", "scripts/interfaces/PrototypeImplementation/Consumables/MessageArgs", "./interfaces/Interfaces/ISession.js", "scripts/interfaces/PrototypeImplementation/Consumables/DeviceManager"], function (require, exports, Client_js_3, MessageArgs_js_1, ISession_js_2, DeviceManager_js_1) {
    "use strict";
    exports.__esModule = true;
    var App = /** @class */ (function () {
        function App() {
            this.sendMessage = function () {
                var text = App.inputText.value;
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
        App.prototype.joinConfererence = function () {
            App.client = new Client_js_3.Client(App.userId.value);
            App.client.connect().then(function () {
                App.conference = App.client.join({ conferenceId: "123123", videoSinkElementId: App.video.id });
                App.conference.onIncomingMessage = function (_session, message) {
                    App.writeMessage(message.senderId + ": " + message.stringMessage);
                };
                App.isCameraOn = true;
                App.leaveConferenceButton.disabled = false;
                App.switchToScreenShare.disabled = false;
                App.toggleAudioButton.value = "Mute Audio";
                App.toggleVideoButton.value = "Mute Video";
                App.toggleAudioButton.disabled = false;
                App.toggleVideoButton.disabled = false;
                var audioDeviceList = document.getElementById('audioDeviceList');
                if (audioDeviceList) {
                    audioDeviceList.options.length = 0;
                }
                var videoDeviceList = document.getElementById('videoDeviceList');
                if (videoDeviceList) {
                    videoDeviceList.options.length = 0;
                }
                App.conference.onStateChange = function (_session, state) {
                    if (state == ISession_js_2.SessionState.Connected) {
                        var deviceManager = new DeviceManager_js_1.DeviceManager();
                        deviceManager.getAudioInputDevices().then(function (devices) {
                            var currentVideoId = App.conference.me.deviceStream.microphone.deviceId;
                            devices.forEach(function (device) {
                                var option = document.createElement('option');
                                option.value = device.deviceId;
                                option.text = device.label;
                                option.selected = (currentVideoId == device.deviceId);
                                audioDeviceList.add(option);
                            });
                        });
                        deviceManager.getVideoInputDevices().then(function (devices) {
                            var currentVideoId = App.conference.me.deviceStream.camera.deviceId;
                            devices.forEach(function (device) {
                                var option = document.createElement('option');
                                option.value = device.deviceId;
                                option.text = device.label;
                                option.selected = (currentVideoId == device.deviceId);
                                videoDeviceList.add(option);
                            });
                        });
                        fm.liveswitch.Util.observe(audioDeviceList, 'change', function (evt) {
                            var option = audioDeviceList.options[audioDeviceList.selectedIndex];
                            App.conference.me.deviceStream.microphone.deviceId = option.value;
                        });
                        fm.liveswitch.Util.observe(videoDeviceList, 'change', function (evt) {
                            var option = videoDeviceList.options[videoDeviceList.selectedIndex];
                            App.conference.me.deviceStream.camera.deviceId = option.value;
                        });
                        App.conference.onStateChange = null;
                    }
                };
            });
        };
        App.prototype.switchMode = function () {
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
        };
        App.prototype.conferenceLeave = function () {
            App.conference.leave();
            App.conference = null;
        };
        App.prototype.toggleAudio = function () {
            if (!this.AudioMuted) {
                App.conference.participants.forEach(function (participant) {
                    participant.deviceStream.microphone.disable();
                });
                App.toggleAudioButton.value = "Unmute Audio";
                this.AudioMuted = true;
            }
            else {
                App.conference.participants.forEach(function (participant) {
                    participant.deviceStream.microphone.enable();
                });
                App.toggleAudioButton.value = "Mute Audio";
                this.AudioMuted = false;
            }
        };
        App.prototype.toggleVideo = function () {
            if (App.isCameraOn) {
                if (!this.CameraMuted) {
                    App.conference.participants.forEach(function (participant) {
                        participant.deviceStream.camera.disable();
                    });
                    this.CameraMuted = true;
                    App.toggleVideoButton.value = "Unmute Video";
                }
                else {
                    App.conference.participants.forEach(function (participant) {
                        participant.deviceStream.camera.enable();
                    });
                    this.CameraMuted = false;
                    App.toggleVideoButton.value = "Mute Video";
                }
            }
        };
        App.isScreenOn = false;
        App.isCameraOn = false;
        App.writeMessage = function (msg) {
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
        return App;
    }());
    exports.App = App;
    var demo = new App();
});
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
define("scripts/device_switching", ["require", "exports", "scripts/interfaces/PrototypeImplementation/Consumables/Client", "./interfaces/Interfaces/ISession.js", "scripts/interfaces/PrototypeImplementation/Consumables/DeviceManager"], function (require, exports, Client_js_4, ISession_js_3, DeviceManager_js_2) {
    "use strict";
    exports.__esModule = true;
    var DeviceSwitching = /** @class */ (function () {
        function DeviceSwitching() {
            DeviceSwitching.video = document.getElementById('video');
            DeviceSwitching.video.style.display = 'block';
            DeviceSwitching.clientJoinButton = document.getElementById('clientJoin');
            DeviceSwitching.clientJoinButton.addEventListener("click", this.joinConfererence); // modify       
            DeviceSwitching.leaveConferenceButton = document.getElementById('leaveConference');
            DeviceSwitching.leaveConferenceButton.addEventListener("click", this.conferenceLeave); // modify    
            DeviceSwitching.leaveConferenceButton.disabled = true;
        }
        DeviceSwitching.prototype.joinConfererence = function () {
            var client = new Client_js_4.Client();
            client.connect().then(function () {
                DeviceSwitching.conference = client.join({ conferenceId: "123123", videoSinkElementId: DeviceSwitching.video.id });
                DeviceSwitching.leaveConferenceButton.disabled = false;
                var audioDeviceList = document.getElementById('audioDeviceList');
                if (audioDeviceList) {
                    audioDeviceList.options.length = 0;
                }
                var videoDeviceList = document.getElementById('videoDeviceList');
                if (videoDeviceList) {
                    videoDeviceList.options.length = 0;
                }
                DeviceSwitching.conference.onStateChange = function (_session, state) {
                    if (state == ISession_js_3.SessionState.Connected) {
                        var deviceManager = new DeviceManager_js_2.DeviceManager();
                        deviceManager.getAudioInputDevices().then(function (devices) {
                            var currentVideoId = DeviceSwitching.conference.me.deviceStream.microphone.deviceId;
                            devices.forEach(function (device) {
                                var option = document.createElement('option');
                                option.value = device.deviceId;
                                option.text = device.label;
                                option.selected = (currentVideoId == device.deviceId);
                                audioDeviceList.add(option);
                            });
                        });
                        deviceManager.getVideoInputDevices().then(function (devices) {
                            var currentVideoId = DeviceSwitching.conference.me.deviceStream.camera.deviceId;
                            devices.forEach(function (device) {
                                var option = document.createElement('option');
                                option.value = device.deviceId;
                                option.text = device.label;
                                option.selected = (currentVideoId == device.deviceId);
                                videoDeviceList.add(option);
                            });
                        });
                        fm.liveswitch.Util.observe(audioDeviceList, 'change', function (evt) {
                            var option = audioDeviceList.options[audioDeviceList.selectedIndex];
                            DeviceSwitching.conference.me.deviceStream.microphone.deviceId = option.value;
                        });
                        fm.liveswitch.Util.observe(videoDeviceList, 'change', function (evt) {
                            var option = videoDeviceList.options[videoDeviceList.selectedIndex];
                            DeviceSwitching.conference.me.deviceStream.camera.deviceId = option.value;
                        });
                        DeviceSwitching.conference.onStateChange = null;
                    }
                };
            });
        };
        DeviceSwitching.prototype.conferenceLeave = function () {
            DeviceSwitching.conference.leave();
            DeviceSwitching.conference = null;
        };
        DeviceSwitching.video = null;
        DeviceSwitching.leaveConferenceButton = null;
        DeviceSwitching.clientJoinButton = null;
        DeviceSwitching.conference = null;
        return DeviceSwitching;
    }());
    exports.DeviceSwitching = DeviceSwitching;
    var demo = new DeviceSwitching();
});
define("scripts/index", ["require", "exports", "scripts/app"], function (require, exports, app_js_1) {
    "use strict";
    exports.__esModule = true;
    //function hello() {
    //    console.log("creating app");
    //    let app = new App();
    //}
    //document.getElementById('createClient').addEventListener('click', hello);
    //console.log("on button click event attached");
    var app = new app_js_1.App();
});
define("scripts/muting", ["require", "exports", "scripts/interfaces/PrototypeImplementation/Consumables/Client"], function (require, exports, Client_js_5) {
    "use strict";
    exports.__esModule = true;
    var Muting = /** @class */ (function () {
        function Muting() {
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
        Muting.prototype.joinConfererence = function () {
            var client = new Client_js_5.Client();
            client.connect().then(function () {
                Muting.clientJoinButton.disabled = false;
                Muting.conference = client.join({ conferenceId: "123123", videoSinkElementId: Muting.video.id });
                Muting.leaveConferenceButton.disabled = false;
                Muting.toggleAudioButton.value = "Mute Audio";
                Muting.toggleVideoButton.value = "Mute Video";
                Muting.toggleAudioButton.disabled = false;
                Muting.toggleVideoButton.disabled = false;
            });
        };
        Muting.prototype.conferenceLeave = function () {
            Muting.conference.leave();
            Muting.conference = null;
        };
        Muting.prototype.toggleAudio = function () {
            if (Muting.conference.me.deviceStream.microphone.enabled) {
                Muting.conference.me.deviceStream.microphone.disable();
                Muting.toggleAudioButton.value = "Unmute Audio";
            }
            if (Muting.conference.me.deviceStream.microphone.disabled) {
                Muting.conference.me.deviceStream.microphone.enable();
                Muting.toggleAudioButton.value = "Mute Audio";
            }
        };
        Muting.prototype.toggleVideo = function () {
            if (Muting.conference.me.deviceStream.camera.enabled) {
                Muting.conference.me.deviceStream.camera.disable();
                Muting.toggleAudioButton.value = "Unmute Video";
            }
            if (Muting.conference.me.deviceStream.camera.disabled) {
                Muting.conference.me.deviceStream.camera.enable();
                Muting.toggleAudioButton.value = "Mute Video";
            }
        };
        Muting.video = null;
        Muting.leaveConferenceButton = null;
        Muting.clientJoinButton = null;
        Muting.toggleAudioButton = null;
        Muting.toggleVideoButton = null;
        Muting.conference = null;
        return Muting;
    }());
    exports.Muting = Muting;
    var demo = new Muting();
});
define("scripts/screenShare", ["require", "exports", "scripts/interfaces/PrototypeImplementation/Consumables/Client"], function (require, exports, Client_js_6) {
    "use strict";
    exports.__esModule = true;
    var screenShare = /** @class */ (function () {
        function screenShare() {
            screenShare.video = document.getElementById('video');
            screenShare.video.style.display = 'block';
            screenShare.clientJoinButton = document.getElementById('clientJoin');
            screenShare.clientJoinButton.addEventListener("click", this.joinConfererence); // modify       
            screenShare.switchToScreenShareButton = document.getElementById('switchScreenShare');
            screenShare.switchToScreenShareButton.addEventListener("click", this["switch"]); // modify        
            screenShare.switchToScreenShareButton.disabled = true;
            screenShare.cameraAndScreenButton = document.getElementById('enableCameraAndScreen');
            screenShare.cameraAndScreenButton.addEventListener("click", this.screenAndCamera); // modify        
            screenShare.cameraAndScreenButton.disabled = true;
            screenShare.leaveConferenceButton = document.getElementById('leaveConference');
            screenShare.leaveConferenceButton.addEventListener("click", this.conferenceLeave); // modify    
            screenShare.leaveConferenceButton.disabled = true;
        }
        screenShare.prototype.joinConfererence = function () {
            var client = new Client_js_6.Client();
            client.connect().then(function () {
                screenShare.clientJoinButton.disabled = false;
                screenShare.conference = client.join({ conferenceId: "123123", videoSinkElementId: screenShare.video.id, screenshare: true });
                screenShare.isScreenOn = true;
                screenShare.leaveConferenceButton.disabled = false;
                screenShare.switchToScreenShareButton.disabled = false;
                screenShare.cameraAndScreenButton.disabled = false;
            });
        };
        screenShare.prototype.conferenceLeave = function () {
            screenShare.conference.leave();
            screenShare.conference = null;
        };
        screenShare.prototype["switch"] = function () {
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
        };
        screenShare.prototype.screenAndCamera = function () {
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
        };
        screenShare.isScreenOn = false;
        screenShare.isCameraOn = false;
        screenShare.video = null;
        screenShare.switchToScreenShareButton = null;
        screenShare.cameraAndScreenButton = null;
        screenShare.leaveConferenceButton = null;
        screenShare.clientJoinButton = null;
        screenShare.conference = null;
        return screenShare;
    }());
    exports.screenShare = screenShare;
    var demo = new screenShare();
});
define("scripts/textchat", ["require", "exports", "scripts/interfaces/PrototypeImplementation/Consumables/Client", "scripts/interfaces/PrototypeImplementation/Consumables/MessageArgs"], function (require, exports, Client_js_7, MessageArgs_js_2) {
    "use strict";
    exports.__esModule = true;
    var TextChat = /** @class */ (function () {
        function TextChat() {
            this.sendMessage = function () {
                var text = TextChat.inputText.value;
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
        TextChat.prototype.joinConfererence = function () {
            var client = new Client_js_7.Client(TextChat.userId.value);
            client.connect().then(function () {
                TextChat.conference = client.join({ conferenceId: "123123", camera: false, microphone: false });
                TextChat.conference.onIncomingMessage = function (session, message) {
                    TextChat.writeMessage(message.senderId + ": " + message.stringMessage);
                };
                TextChat.leaveConferenceButton.disabled = false;
            });
        };
        TextChat.prototype.conferenceLeave = function () {
            TextChat.conference.leave();
            TextChat.conference = null;
        };
        TextChat.writeMessage = function (msg) {
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
        return TextChat;
    }());
    exports.TextChat = TextChat;
});
define("scripts/interfaces/Interfaces/DeviceType", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    (function (DeviceType) {
        DeviceType[DeviceType["Camera"] = 1] = "Camera";
        DeviceType[DeviceType["Microphone"] = 2] = "Microphone";
        DeviceType[DeviceType["Screen"] = 3] = "Screen";
        DeviceType[DeviceType["Speaker"] = 4] = "Speaker";
        DeviceType[DeviceType["Headphones"] = 5] = "Headphones";
    })(exports.DeviceType || (exports.DeviceType = {}));
});
define("scripts/interfaces/Interfaces/IClient", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    (function (ClientState) {
        ClientState[ClientState["New"] = 1] = "New";
        ClientState[ClientState["Connecting"] = 2] = "Connecting";
        ClientState[ClientState["Connected"] = 3] = "Connected";
        ClientState[ClientState["Disconnected"] = 4] = "Disconnected";
    })(exports.ClientState || (exports.ClientState = {}));
});
define("scripts/interfaces/Interfaces/IDevice", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    (function (DeviceState) {
        DeviceState[DeviceState["New"] = 1] = "New";
        DeviceState[DeviceState["Started"] = 2] = "Started";
        DeviceState[DeviceState["Stopped"] = 3] = "Stopped";
    })(exports.DeviceState || (exports.DeviceState = {}));
});
define("scripts/interfaces/Interfaces/IDeviceManager", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    (function (DeviceKind) {
        DeviceKind[DeviceKind["VideoInput"] = 1] = "VideoInput";
        DeviceKind[DeviceKind["AudioInput"] = 2] = "AudioInput";
        DeviceKind[DeviceKind["AudioOutput"] = 3] = "AudioOutput";
    })(exports.DeviceKind || (exports.DeviceKind = {}));
});
define("scripts/interfaces/Interfaces/IInboundSessionInvite", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    (function (InboundSessionInviteState) {
        InboundSessionInviteState[InboundSessionInviteState["New"] = 1] = "New";
        InboundSessionInviteState[InboundSessionInviteState["Accepted"] = 2] = "Accepted";
        InboundSessionInviteState[InboundSessionInviteState["Rejected"] = 3] = "Rejected";
    })(exports.InboundSessionInviteState || (exports.InboundSessionInviteState = {}));
});
define("scripts/interfaces/Interfaces/ILayout", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var Rectangle = /** @class */ (function () {
        function Rectangle() {
        }
        return Rectangle;
    }());
    exports.Rectangle = Rectangle;
    var Size = /** @class */ (function () {
        function Size() {
        }
        return Size;
    }());
    exports.Size = Size;
    var Point = /** @class */ (function () {
        function Point() {
        }
        return Point;
    }());
    exports.Point = Point;
    (function (LayoutMode) {
        LayoutMode[LayoutMode["HorizontalFill"] = 0] = "HorizontalFill";
        LayoutMode[LayoutMode["VerticalFill"] = 1] = "VerticalFill";
        LayoutMode[LayoutMode["ProminentBottomFill"] = 2] = "ProminentBottomFill";
        LayoutMode[LayoutMode["ProminentRightFill"] = 3] = "ProminentRightFill";
        LayoutMode[LayoutMode["Custom"] = 4] = "Custom";
    })(exports.LayoutMode || (exports.LayoutMode = {}));
    (function (Color) {
        Color[Color["Black"] = 0] = "Black";
        Color[Color["Red"] = 1] = "Red";
        Color[Color["Green"] = 2] = "Green";
        Color[Color["Blue"] = 3] = "Blue";
        Color[Color["White"] = 4] = "White";
    })(exports.Color || (exports.Color = {}));
});
define("scripts/interfaces/Interfaces/IScreenSubStream", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    (function (SourceDisplaySurfaceType) {
        //https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackSettings/displaySurface
        SourceDisplaySurfaceType[SourceDisplaySurfaceType["Application"] = 1] = "Application";
        SourceDisplaySurfaceType[SourceDisplaySurfaceType["Browser"] = 2] = "Browser";
        SourceDisplaySurfaceType[SourceDisplaySurfaceType["Monitor"] = 3] = "Monitor";
        SourceDisplaySurfaceType[SourceDisplaySurfaceType["Window"] = 4] = "Window";
    })(exports.SourceDisplaySurfaceType || (exports.SourceDisplaySurfaceType = {}));
});
define("scripts/interfaces/Interfaces/ISendStatus", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    (function (SendState) {
        SendState[SendState["New"] = 1] = "New";
        SendState[SendState["Sent"] = 2] = "Sent";
        SendState[SendState["Delivered"] = 3] = "Delivered";
        SendState[SendState["Viewed"] = 4] = "Viewed";
    })(exports.SendState || (exports.SendState = {}));
});
define("scripts/interfaces/Interfaces/ISession", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    (function (SessionState) {
        SessionState[SessionState["New"] = 0] = "New";
        SessionState[SessionState["Connecting"] = 1] = "Connecting";
        SessionState[SessionState["Connected"] = 2] = "Connected";
        SessionState[SessionState["Terminated"] = 3] = "Terminated";
    })(exports.SessionState || (exports.SessionState = {}));
});
define("scripts/interfaces/Interfaces/ISource", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    (function (SwitchDevicePolicy) {
        SwitchDevicePolicy[SwitchDevicePolicy["DontSwitch"] = 1] = "DontSwitch";
        SwitchDevicePolicy[SwitchDevicePolicy["SwitchAndSwitchBack"] = 2] = "SwitchAndSwitchBack";
        //and then switch back if the original device becomes available. NEEDED?.
        SwitchDevicePolicy[SwitchDevicePolicy["SwitchAndDontSwitchBack"] = 3] = "SwitchAndDontSwitchBack"; //Switch to another available device of the same type when the current source device is unplugged 
        //and then switch back if the original device becomes available. NEEDED?.
    })(exports.SwitchDevicePolicy || (exports.SwitchDevicePolicy = {}));
});
define("scripts/interfaces/Interfaces/IStream", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    (function (StreamState) {
        StreamState[StreamState["New"] = 1] = "New";
        StreamState[StreamState["Connected"] = 2] = "Connected";
        StreamState[StreamState["Disconnected"] = 3] = "Disconnected";
    })(exports.StreamState || (exports.StreamState = {}));
});
define("scripts/interfaces/Interfaces/ISubStream", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    (function (SubStreamState) {
        SubStreamState[SubStreamState["New"] = 1] = "New";
        SubStreamState[SubStreamState["Enabled"] = 2] = "Enabled";
        SubStreamState[SubStreamState["Disabled"] = 3] = "Disabled";
    })(exports.SubStreamState || (exports.SubStreamState = {}));
});
define("scripts/interfaces/Interfaces/SessionInviteRejectReason", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    (function (SessionInviteRejectReason) {
        SessionInviteRejectReason[SessionInviteRejectReason["Busy"] = 0] = "Busy";
        SessionInviteRejectReason[SessionInviteRejectReason["Incompatible"] = 1] = "Incompatible";
        SessionInviteRejectReason[SessionInviteRejectReason["None"] = 2] = "None";
    })(exports.SessionInviteRejectReason || (exports.SessionInviteRejectReason = {}));
});
define("scripts/interfaces/Interfaces/SourceType", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    (function (SourceType) {
        SourceType[SourceType["Camera"] = 0] = "Camera";
        SourceType[SourceType["Screen"] = 1] = "Screen";
        SourceType[SourceType["Microphone"] = 2] = "Microphone";
        SourceType[SourceType["File"] = 3] = "File";
    })(exports.SourceType || (exports.SourceType = {}));
});
define("scripts/interfaces/Interfaces/StreamType", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    (function (StreamType) {
        StreamType[StreamType["Device"] = 0] = "Device";
        StreamType[StreamType["File"] = 1] = "File";
        StreamType[StreamType["Screen"] = 2] = "Screen";
    })(exports.StreamType || (exports.StreamType = {}));
});
define("scripts/interfaces/Interfaces/SubStreamType", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    (function (SubStreamType) {
        SubStreamType[SubStreamType["Audio"] = 0] = "Audio";
        SubStreamType[SubStreamType["Video"] = 1] = "Video";
        SubStreamType[SubStreamType["Data"] = 2] = "Data";
    })(exports.SubStreamType || (exports.SubStreamType = {}));
});
define("scripts/interfaces/PrototypeImplementation/Consumables/Invite", ["require", "exports", "../../Interfaces/SessionInviteRejectReason.js"], function (require, exports, SessionInviteRejectReason_js_1) {
    "use strict";
    exports.__esModule = true;
    var Invite = /** @class */ (function () {
        function Invite(invitation) {
            var _this = this;
            this.invitation = null;
            if (invitation != null) {
                this.invitation = invitation;
                invitation.addOnStateChanging(function (invite) {
                    if (invite.getState() == fm.liveswitch.InvitationState.Accepted) {
                        if (_this.oninviteaccepted != null) {
                            _this.oninviteaccepted();
                        }
                    }
                    else if (invite.getState() == fm.liveswitch.InvitationState.Rejected) {
                        if (_this.oninviteaccepted != null) {
                            invite.getReason(); /// will have to set
                            _this.oninviterejected(SessionInviteRejectReason_js_1.SessionInviteRejectReason.None);
                        }
                    }
                });
            }
        }
        Invite.prototype.addInvitation = function (invitation) {
            var _this = this;
            if (this.invitation) {
                // cannot add more than once invitation
                return;
            }
            this.invitation = invitation;
            invitation.addOnStateChanging(function (invite) {
                if (invite.getState() == fm.liveswitch.InvitationState.Accepted) {
                    if (_this.oninviteaccepted != null) {
                        _this.oninviteaccepted();
                    }
                }
                else if (invite.getState() == fm.liveswitch.InvitationState.Rejected) {
                    if (_this.oninviteaccepted != null) {
                        invite.getReason(); /// will have to set
                        _this.oninviterejected(SessionInviteRejectReason_js_1.SessionInviteRejectReason.None);
                    }
                }
            });
        };
        Invite.prototype.cancel = function () {
            var _a;
            (_a = this.invitation) === null || _a === void 0 ? void 0 : _a.cancel();
        };
        return Invite;
    }());
    exports.Invite = Invite;
});
