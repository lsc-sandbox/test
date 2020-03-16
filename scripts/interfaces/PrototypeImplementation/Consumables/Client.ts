import { IClient, ICallArgs, IJoinConferenceArgs } from "../../Interfaces/IClient.js";
import { ClientState } from "../../Interfaces/IClient.js";
import { ISendArgs } from "../../Interfaces/ISendArgs.js";
import { IAction2 } from "../../Interfaces/IAction2.js";
import { IAction1 } from "../../Interfaces/IAction1.js";
import { IScreenSource } from "../../Interfaces/IScreenSource.js";
import { IAudioMessageArgs } from "../../Interfaces/IAudioMessageArgs.js";
import { IReceiveArgs } from "../../Interfaces/IReceiveArgs.js";
import { IVideoMessageArgs } from "../../Interfaces//IVideoMessageArgs.js";
import { IFileArgs } from "../../Interfaces/IFileArgs.js";
import { IConference } from "../../Interfaces/IConference.js";
import { ICall } from "../../Interfaces/ICall.js";
import { ICameraSource } from "../../Interfaces/ICameraSource.js";
import { IMicrophoneSource } from "../../Interfaces/IMicrophoneSource.js";
import { DefaultConfig } from "./DefaultConfig.js";
import { LogDebug } from "./EntryPoint.js";
import { Conference } from "./Conference.js";
import { CameraSource } from "./CameraSource.js";
import { Device } from "./Device.js";
import { DeviceType } from "../../Interfaces/DeviceType.js";
import { MicrophoneSource } from "./MicrophoneSource.js";
import { SharedObjects } from "./SharedObjects.js";
import { IOutboundSessionInvite } from "../../Interfaces/IOutboundSessionInvite.js";
import { IInboundSessionInvite } from "../../Interfaces/IInboundSessionInvite.js";
import { IMessageArgs } from "../../Interfaces/ImessageArgs.js";
import { IAction0 } from "../../Interfaces/IAction0.js";
import { ScreenSource } from "./ScreenSource.js";


export class Client implements IClient {
    // Done implementing
    onstatechange!: IAction2<IClient, ClientState>;
    isNew?: boolean = true;
    isConnecting?: boolean = false;
    isConnected?: boolean = false;
    isDisconnected?: boolean = false;
    async connect(): Promise<void> {
        var me = this;
        this.onstatechange = ((client: IClient, state: ClientState) => {
            LogDebug(state.toString());
        });
        let promise: Promise<void> = new Promise((resolve, reject) => {
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
                    me.changeStateTo(ClientState.Disconnected); {
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
    }
    private notifyConferenceLeaving: fm.liveswitch.Hash<string, IAction0> = {};
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
    join(args: IJoinConferenceArgs): IConference {
        let container: HTMLElement = null;
        // need to take care of all the args
        if (args.videoSinkElementId) {
            container = document.getElementById(args.videoSinkElementId) as HTMLElement;
        } else {
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
        let conference = new Conference(args.conferenceId, this._LiveSwitchClient, this.notifyConferenceLeaving[args.conferenceId], container);
        this.conferences.push(conference);
        return conference;
    }
    conferences: Conference[] = new Array<Conference>();

    // Need to do
    get camera(): Promise<ICameraSource> {
        let promise: Promise<ICameraSource> = new Promise<ICameraSource>(async (resolve, reject) => {
            this.cameras.then((inputs) => {
                if (inputs.length > 0) {
                    resolve(inputs[0]);
                } else {
                    resolve(null);
                }
            }).catch((ex) => {
                reject(ex);
            });
        });
        return promise;
    }
    get microphone(): Promise<IMicrophoneSource> {
        let promise: Promise<IMicrophoneSource> = new Promise<IMicrophoneSource>(async (resolve, reject) => {
            this.microphones.then((inputs) => {
                if (inputs.length > 0) {
                    resolve(inputs[0]);
                } else {
                    resolve(null);
                }
            }).catch((ex) => {
                reject(ex);
            });
        });
        return promise;
    }
    get screen(): Promise<IScreenSource> {
        let promise: Promise<IScreenSource> = new Promise<IScreenSource>(async (resolve, reject) => {
            this.screens.then((inputs) => {
                if (inputs.length > 0) {
                    resolve(inputs[0]);
                } else {
                    resolve(null);
                }
            }).catch((ex) => {
                reject(ex);
            });
        });
        return promise;
    }
    // currently not being updated after once being populated.
    get cameras(): Promise<ICameraSource[]> {
        let promise: Promise<ICameraSource[]> = new Promise<ICameraSource[]>(async (resolve, reject) => {
            let cameraSourrces = new Array<ICameraSource>();//
            let localmedia = new fm.liveswitch.LocalMedia(false, true);
            localmedia?.getVideoSourceInputs().then((inputs) => {
                inputs.forEach((input) => {
                    let device = new Device(input.getId(), input.getName(), DeviceType.Camera, input);
                    cameraSourrces.push(new CameraSource(device));
                    resolve(cameraSourrces);
                });
            }).fail((ex) => {
                reject(ex);
            });
        });
        return promise;
    }
    get microphones(): Promise<IMicrophoneSource[]> {
        let promise: Promise<IMicrophoneSource[]> = new Promise<MicrophoneSource[]>(async (resolve, reject) => {
            let micSourrces = new Array<MicrophoneSource>();//
            let localmedia = new fm.liveswitch.LocalMedia(true, false);
            localmedia?.getAudioSourceInputs().then((inputs) => {
                inputs.forEach((input) => {
                    let device = new Device(input.getId(), input.getName(), DeviceType.Microphone, input);
                    micSourrces.push(new MicrophoneSource(device));
                    resolve(micSourrces);
                });
            }).fail((ex) => {
                reject(ex);
            });
        });
        return promise;
    }
    get screens(): Promise<IScreenSource[]> {
        let promise: Promise<IScreenSource[]> = new Promise<IScreenSource[]>(async (resolve, reject) => {
            let screenSourrces = new Array<IScreenSource>();//
            let localmedia = new fm.liveswitch.LocalMedia(false, false, true);
            localmedia?.getVideoSourceInputs().then((inputs) => {
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
        });
        return promise;
    }

    heldConferences: Conference[] = new Array<Conference>();

    // Internal
    private changeStateTo(state: ClientState): void {
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


    private _LiveSwitchClient: fm.liveswitch.Client;
    private defaultConfig = DefaultConfig.Instance();
    //private videoContainer!: HTMLElement | undefined;
    private _Token: string;
    constructor(userId?: string, token?: string) {

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
        let channel: string = defaultConfig.DefaultChannel;
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
            let claims = new Array<fm.liveswitch.ChannelClaim>();
            for (let i = 0; i < defaultConfig.DefaultChannels.length; i++) {
                claims[i] = new fm.liveswitch.ChannelClaim(defaultConfig.DefaultChannels[i]);
            }
            let clientRoles: any = null;
            //token = fm.liveswitch.Token.generateClientRegisterToken(appId, defaultConfig.DefaultAppId, defaultConfig.DefaultDevice, defaultConfig.ClientId, clientRoles, claims, sharedSecret);
            // don't need to know the channel before hand
            token = fm.liveswitch.Token.generateClientRegisterToken(appId, defaultConfig.DefaultUserId, defaultConfig.DefaultDevice, defaultConfig.ClientId, clientRoles, new Array<fm.liveswitch.ChannelClaim>(), sharedSecret);
        }
        this._Token = token; /// assume 
        // don't think I need the following line
        //this.getinformationfromlocalmedia(); // let this happen ... who cares... it will populated.
    }
    private _Channels: fm.liveswitch.Channel[] = new Array<fm.liveswitch.Channel>();

    // need to move this localmedia Shared Object class
    //private async getinformationfromlocalmedia(): Promise<void> {
    //    var me = this;
    //    var localmedia = SharedObjects.Instance().cameraLocalMedia;
    //    let promise: Promise<void> = new Promise(async (resolve, reject) => {

    //        localmedia = new fm.liveswitch.LocalMedia(true, true, false);
    //        me.microphones = new Array<IMicrophoneSource>();
    //        me.cameras = new Array<ICameraSource>();//
    //        localmedia?.getVideoSourceInputs().then((inputs) => {
    //            inputs.forEach((input) => {
    //                let device = new Device(input.getId(), input.getName(), DeviceType.Camera, input);
    //                me.cameras.push(new CameraSource(device));
    //            })
    //        });

    //        localmedia?.getAudioSourceInputs().then((inputs) => {
    //            inputs.forEach((input) => {
    //                let device = new Device(input.getId(), input.getName(), DeviceType.Microphone, input);
    //                me.microphones.push(new MicrophoneSource(device));
    //            })
    //        });
    //        resolve();
    //        localmedia = null;
    //    });
    //    return promise;
    //}

    // not implementing
    callerId!: string; // leave this along, not implementing calls
    record(audioOnly: boolean): Blob { // do need implement
        throw new Error("Method not implemented.");
    }
    notifyTyping(peerId: string): void { // do not need to implement now
        throw new Error("Method not implemented.");
    }

    blockIncomingCalls(userId: string): void { // do not need implement now
        throw new Error("Method not implemented.");
    }
    unblockIncomingCalls(userId: string): void { // do not need
        throw new Error("Method not implemented.");
    }
    getBlockedUserIds(): string[] { // do not need 
        throw new Error("Method not implemented.");
    }
    onconferenceinvite!: IAction2<IClient, IInboundSessionInvite & IConference>;


    onincomingfile!: IAction1<IReceiveArgs | IFileArgs>;
    sendFile!: { (file: Blob, peerId: string): Promise<boolean>; (file: Blob, peerId: string, sendArgs: ISendArgs): Promise<boolean>; };
    onpeersendingfile!: IAction1<string>;

    onincomingvideomessage!: IAction1<IReceiveArgs | IVideoMessageArgs>;
    onincomingaudiomessage!: IAction1<IReceiveArgs | IAudioMessageArgs>;
    audioMessage(sendArgs: ISendArgs & IMessageArgs): void { }// not implemented
    videoMessage(sendArgs: ISendArgs & IMessageArgs): void { }// not implemented
    onincomingcall!: IAction1<ICall>;
    calls!: ICall[];
    heldCalls!: ICall[];
    call(args: ICallArgs): IOutboundSessionInvite {
        throw new Error("call not supported yet");
    }
}

