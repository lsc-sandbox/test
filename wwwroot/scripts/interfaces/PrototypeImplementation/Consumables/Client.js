var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ClientState } from "../../Interfaces/IClient.js";
import { DefaultConfig } from "./DefaultConfig.js";
import { LogDebug } from "./EntryPoint.js";
import { Conference } from "./Conference.js";
import { CameraSource } from "./CameraSource.js";
import { Device } from "./Device.js";
import { DeviceType } from "../../Interfaces/DeviceType.js";
import { MicrophoneSource } from "./MicrophoneSource.js";
import { ScreenSource } from "./ScreenSource.js";
export class Client {
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
        return __awaiter(this, void 0, void 0, function* () {
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
                    {
                    }
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
        if (args.videoSinkElementId) {
            container = document.getElementById(args.videoSinkElementId);
        }
        else if (args.camera != false) {
            throw new Error("Please provide videoSinkElementId (HTMLElement)");
        }
        // conferenceId: string, container ?: HTMLElement
        if (args.camera != false && container == null) {
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
        let conference = new Conference(args.conferenceId, this._LiveSwitchClient, this.notifyConferenceLeaving[args.conferenceId], container);
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
        let promise = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
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
        let promise = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
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
