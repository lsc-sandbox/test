import { DeviceType } from "../../Interfaces/DeviceType.js";
import { IAction0 } from "../../Interfaces/IAction0.js";
import { IAction1 } from "../../Interfaces/IAction1.js";
import { IAction2 } from "../../Interfaces/IAction2.js";
import { IDeviceStream } from "../../Interfaces/IDeviceStream.js";
import { IFileArgs } from "../../Interfaces/IFileArgs.js";
import { IFileSource } from "../../Interfaces/IFileSource.js";
import { IFileStream } from "../../Interfaces/IFileStream.js";
import { ILayout } from "../../Interfaces/ILayout.js";
import { IOutboundSessionInvite } from "../../Interfaces/IOutboundSessionInvite.js";
import { IParticipant } from "../../Interfaces/IParticipant.js";
import { IScreenStream } from "../../Interfaces/IScreenStream.js";
import { ISendArgs } from "../../Interfaces/ISendArgs.js";
import { ISendStatus } from "../../Interfaces/ISendStatus.js";
import { IDevicePlayArgs, IDeviceStreamArgs, IError, IPlayArgs, IScreenPlayArgs, IScreenStreamArgs, ISession, SessionState, IFileStreamArgs } from "../../Interfaces/ISession.js";
import { ISink } from "../../Interfaces/ISink.js";
import { IStream, StreamState } from "../../Interfaces/IStream.js";
import { SubStreamType } from "../../Interfaces/SubStreamType.js";
import { CentralConnections } from "./CentralConnections.js";
import { DefaultConfig } from "./DefaultConfig.js";
import { DeviceStream } from "./DeviceStream.js";
import { LogDebug } from "./EntryPoint.js";
import { MessageArgs } from "./MessageArgs.js";
import { Participant } from "./Participant.js";
import { ReceiveArgs } from "./ReceiveArgs.js";
import { ScreenStream } from "./ScreenStream.js";
import { SendArgs } from "./SendArgs.js";
import { SendStatus } from "./SendStatus.js";
import { SharedObjects } from "./SharedObjects.js";
import { Sink } from "./Sink.js";
import { StringMessageArgs } from "./StringMessageArgs.js";
import { SubStream } from "./SubStream.js";
import { Source } from "./Source.js";
import { Device } from "./Device.js";
import { DeviceSubStream } from "./DeviceSubStream.js";
import { StreamType } from "../../Interfaces/StreamType.js";
import { DisplaySubStream } from "./DisplaySubStream.js";
//namespace ls is fm.liveswitch;

export class Session implements ISession {

    // Implementations - done
    onIncomingMessage: IAction2<Session, MessageArgs & ReceiveArgs>;
    state: SessionState = SessionState.New;
    onStateChange?: IAction2<ISession, SessionState>;
    leave(): void {
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
        SharedObjects.Instance().onSessionLeave(this);
        this.notifyLeave();
        // I guess this object is now useless, to create join this session, they have to back to the client.
    }

    sendMessage: (args?: MessageArgs & SendArgs) => ISendStatus = (args?: MessageArgs & SendArgs): ISendStatus => {
        if (this.canSendMessages) {
            let sendStatus = new SendStatus(); // need to get the whole participants things sorted out.
            let future = this.messageDataChannel?.sendDataString(args.stringMessage);
            future?.then((result) => {
                if (args?.onSent) {
                    args?.onSent(args);
                }
            }).fail((ex) => {
                if (args?.onFailed) {
                    args?.onFailed(args, new Error(ex.name + ": " + ex.message));
                }
            });
            return sendStatus;
        }
        return new SendStatus();
    }
    get me(): IParticipant {
        let returnParticipant: IParticipant;
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
    get screenStream(): IScreenStream {
        if (this.screenStreams.length == 0) {
            return null;
        }
        return this.screenStreams[0];
    }
    get screenStreams(): IScreenStream[] {
        let screens = new Array<IScreenStream>();
        this.participants.forEach((participant) => {
            participant.screenStreams.forEach((screen) => {
                screens.push(screen);
            });
        });
        return screens;
    }
    get deviceStream(): IDeviceStream {
        if (this.deviceStreams.length == 0) {
            return null;
        }
        return this.deviceStreams[0];
    }
    get deviceStreams(): IDeviceStream[] {
        let devices = new Array<IDeviceStream>();
        this.participants.forEach((participant) => {
            participant.deviceStreams.forEach((device) => {
                devices.push(device);
            });
        });
        return devices;
    }
    autoplayDeviceCameraStreams?: boolean = true;
    autoplayDeviceMicrophoneStreams?: boolean = true;
    autoplayStreams?: boolean = true;

    // Need to do
    participants?: IParticipant[] = new Array<Participant>(); // in Progress
    //First
    startScreenStream(args?: IScreenStreamArgs): Promise<IScreenStream> {
        var me = this;
        if (args) {
            // we ignore system audio for now, do now do anything for now
            //args.systemAudio;
        }
        let promise: Promise<IScreenStream> = new Promise((resolve, reject) => {
            if (!me.me.screenStream) {
                SharedObjects.Instance().createScreenStream(me, true, false).then((localMedia: fm.liveswitch.LocalMedia) => {
                    me.openSfuUpstreamConnection(me.liveSwitchChannel, localMedia, true, true, false);
                    if (!me.me || !me.me.screenStream) {
                        reject();
                    } else {
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
    startDeviceStream(args?: IDeviceStreamArgs): Promise<IDeviceStream> {
        var me = this;
        let promise: Promise<IDeviceStream> = new Promise((resolve, reject) => {
            if (!me.me || !me.me.deviceStream) {
                SharedObjects.Instance().createCameraStream(me, null, true, true).then((localMedia: fm.liveswitch.LocalMedia) => {
                    me.openSfuUpstreamConnection(me.liveSwitchChannel, localMedia, true, true, true);
                    if (!me.me || !me.me.deviceStream) {
                        reject();
                    } else {
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
            } else {
                me.me.deviceStream.start();
            }
            resolve(me.me.deviceStream);
        });
        return promise;
    }

    playStreams(): void { } // not implemented
    playScreenStreams(args?: IScreenPlayArgs): void { } // not implemented
    playDeviceStreams(args?: IDevicePlayArgs): void { } // not implemented
    onDeviceStreamAdded?: IAction2<ISession, IDeviceStream>;
    onDeviceStreamRemoved?: IAction2<ISession, IDeviceStream>;
    onScreenStreamAdded?: IAction2<ISession, IScreenStream>;
    onScreenStreamRemoved?: IAction2<ISession, IScreenStream>;
    onStreamAdded?: IAction2<ISession, IStream>;
    onStreamRemoved?: IAction2<ISession, IStream>;



    isHeld: boolean; // not implemented
    hold(): void {
        throw new Error("Method not implemented.");
    }
    resume(): void {
        throw new Error("Method not implemented.");
    }

    layout!: ILayout;

    autoplayScreenDisplayStreams?: boolean = true


    // internal
    private static cameraAndMircophoneConnectionTag = "ca";
    private static screenAndSystemAudioConnectionTag = "sa";


    private liveSwitchChannel!: fm.liveswitch.Channel;
    private _LiveSwitchClient!: fm.liveswitch.Client;
    private defaultConfig = DefaultConfig.Instance();
    private _invitation?: fm.liveswitch.ChannelInvitation;
    private gotInvitation: boolean = false;
    private notifyLeave: IAction0;
    private _videoContainer: HTMLElement;
    //private videoContainer: HTMLElement | null = null;
    constructor(channel: string, liveSwitchClient: fm.liveswitch.Client, notifyLeave: IAction0, videoContainer?: HTMLElement, invitation?: fm.liveswitch.ChannelInvitation) {
        this.notifyLeave = notifyLeave;
        this.participants.push(new Participant(liveSwitchClient.getId(), true));
        LogDebug("Session constructor was called");
        var me = this;
        this._LiveSwitchClient = liveSwitchClient;
        if (videoContainer) { this._videoContainer = videoContainer; }
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

        this._LiveSwitchClient.join(channel, token).then(async (channel) => {
            me.OnClientJoinInAChannel(channel);
        }).fail((ex) => {
            throw ex;
        });
        //}
    }
    private sfuUpstreamConnection: { [id: string]: fm.liveswitch.SfuUpstreamConnection } = {};
    //private sfuUpstreamConnectionsForCamera: { [id: string]: fm.liveswitch.SfuUpstreamConnection } = {};
    //private sfuUpstreamConnectionsForScreen: { [id: string]: fm.liveswitch.SfuUpstreamConnection } = {};
    private sfuDownstreamConnections: fm.liveswitch.Hash<string, fm.liveswitch.SfuDownstreamConnection> = {};
    //private sfuDownstreamConnectionsForScreen: fm.liveswitch.Hash<string, fm.liveswitch.SfuDownstreamConnection> = {};
    private OnClientJoinInAChannel(channel: fm.liveswitch.Channel | undefined) {
        if (!channel) {
            return;
        }
        var me = this;
        me.id = channel.getId();
        this.liveSwitchChannel = channel;
        /// let open a datachannel on mcu
        // let leave messageing alone
        this.openMcuConnectionForDataChannel(channel);

        SharedObjects.Instance().createCameraStream(this, this._videoContainer, true, true).then((localMedia: fm.liveswitch.LocalMedia) => {
            this.openSfuUpstreamConnection(channel, localMedia, false, true, true);
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
                })
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
                let participantForThisConnectionInfo: IParticipant = null;
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
                    me.openSfuDownstreamConnection(remoteConnectionInfo, channel, false, participantForThisConnectionInfo);
                }
                if (remoteConnectionInfo.getTag() == Session.screenAndSystemAudioConnectionTag) {
                    me.openSfuDownstreamConnection(remoteConnectionInfo, channel, true, participantForThisConnectionInfo);
                }
            });
            // wont even have time to turn the autoplay for those in session so don't worty about it for now
            channel.getRemoteUpstreamConnectionInfos().forEach(function (remoteConnectionInfo) {
                let participantForThisConnectionInfo: IParticipant = null;
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
                    me.openSfuDownstreamConnection(remoteConnectionInfo, channel, false, participantForThisConnectionInfo); // added downstream someone joins automatically
                }
                if (remoteConnectionInfo.getTag() == Session.screenAndSystemAudioConnectionTag) {
                    me.openSfuDownstreamConnection(remoteConnectionInfo, channel, true, participantForThisConnectionInfo); // added downstream someone joins automatically
                }
            });
        });
        //});
    }
    id!: string; // done
    private messageDataChannel?: fm.liveswitch.DataChannel;
    private dataChannelConnection?: fm.liveswitch.ServerConnection = null;
    private canSendMessages = false;
    //    let messageDataStream
    private openMcuConnectionForDataChannel(channel: fm.liveswitch.Channel) {
        var me = this;
        me.messageDataChannel = new fm.liveswitch.DataChannel("fm.liveswitch.message", true, "Message"); // need for sending messages
        me.messageDataChannel.addOnStateChange((dataChannel) => {
            if (dataChannel.getState() == fm.liveswitch.DataChannelState.Connected) {
                me.canSendMessages = true;
            } else {
                me.canSendMessages = false;
            }
        })
        // can now receive messages
        let onReceive = (dataChannelReceiveArgs: fm.liveswitch.DataChannelReceiveArgs) => {
            if (dataChannelReceiveArgs.getDataString != null) {
                //onIncomingMessage: IAction2<ISession, IMessageArgs & IReceiveArgs>;
                if (me.onIncomingMessage != null) {
                    let result: Partial<StringMessageArgs & ReceiveArgs> = {};
                    let message: StringMessageArgs = new StringMessageArgs(dataChannelReceiveArgs.getDataString());
                    let sender: ReceiveArgs = new ReceiveArgs(dataChannelReceiveArgs.getRemoteConnectionInfo().getUserAlias());
                    //(result as StringMessageArgs) = message;
                    //(result as ReceiveArgs) = sender;
                    result.message = dataChannelReceiveArgs.getDataString();
                    result.senderId = dataChannelReceiveArgs.getRemoteConnectionInfo().getUserAlias();
                    me.onIncomingMessage(this, result as StringMessageArgs & ReceiveArgs);
                }
            }
        }
        me.messageDataChannel.setOnReceive(onReceive);
        let dataStream: fm.liveswitch.DataStream = new fm.liveswitch.DataStream(me.messageDataChannel);
        let connection = channel.createMcuConnection(dataStream);
        this.dataChannelConnection = connection;
        connection.setDisableAutomaticIceServers(false);
        connection.addOnStateChange((something) => {
            if (something.getState() == fm.liveswitch.ConnectionState.Failed) {
                this.openMcuConnectionForDataChannel(channel);
            }
        })
        connection.open();
        // hopefully it was succesfull 
    }
    //wait = (ms: number) => new Promise(res => setTimeout(res, ms));
    //private async prepareLocalMedia(): Promise<void> {

    private _Direction(streamDirection: fm.liveswitch.StreamDirection): string {
        return fm.liveswitch.StreamDirectionHelper.directionToString(streamDirection);
    }
    private openSfuDownstreamConnection(remoteConnectionInfo: fm.liveswitch.ConnectionInfo, channel: fm.liveswitch.Channel, screenStream: boolean, participant: IParticipant): fm.liveswitch.SfuDownstreamConnection {
        let videoSink: ISink = null;
        let audioSink: ISink = null;
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
        let connection: fm.liveswitch.SfuDownstreamConnection;

        let audioStream!: fm.liveswitch.AudioStream;
        let videoStream!: fm.liveswitch.VideoStream;

        let audioDeviceType = DeviceType.Microphone;
        if (screenStream) {
            // this doesn't make sense
            audioDeviceType = DeviceType.Microphone;
        }
        audioStream = new fm.liveswitch.AudioStream(remoteMedia);
        // not sure if made a mistake here
        //audioStream.changeDirection(fm.liveswitch.StreamDirection.Inactive);
        if (!screenStream) {
            audioStream.setLocalDirection(fm.liveswitch.StreamDirection.ReceiveOnly);
        }
        audioSink = new Sink(audioDeviceType, () => {
            if (remoteMedia.getAudioTrack()) {
                remoteMedia.getAudioTrack().setMuted(true);
            }
        },
            () => {
                if (remoteMedia.getAudioTrack()) {
                    remoteMedia.getAudioTrack().setMuted(false);
                }
            }
        );
        let autoPlayAudio = this.autoplayDeviceMicrophoneStreams;
        if (screenStream) {
            autoPlayAudio = this.autoplayScreenSystemAudioStreams;
        }
        if (!remoteConnectionInfo.getHasAudio() || !this.autoplayStreams || !autoPlayAudio) {
            audioStream.changeDirection(fm.liveswitch.StreamDirection.Inactive);
        }
        videoStream = new fm.liveswitch.VideoStream(remoteMedia);
        videoStream.getInfo()
        let videoDeviceSink = DeviceType.Camera;
        if (screenStream) {
            videoDeviceSink = DeviceType.Screen;
        }
        videoSink = new Sink(videoDeviceSink, () => {
            if (remoteMedia.getVideoTrack()) {
                remoteMedia.getVideoTrack().setMuted(true);
            }
        },
            () => {
                if (remoteMedia.getVideoTrack()) {
                    remoteMedia.getVideoTrack().setMuted(false);
                }
            }
        );
        let autoPlayVideo = this.autoplayDeviceCameraStreams;
        if (screenStream) {
            autoPlayVideo = this.autoplayScreenDisplayStreams;
        }
        if (!remoteConnectionInfo.getHasVideo() || !this.autoplayStreams || !autoPlayVideo) {
            videoStream.changeDirection(fm.liveswitch.StreamDirection.Inactive);
        }
        else {
            SharedObjects.Instance().getLayoutManager(me).addRemoteView(remoteMedia.getId(), remoteMedia.getView());
        }
        let updateConnectionForVideo = (enableVideo: boolean) => {
            let connectionConfig = connection.getConfig();
            let layoutHasRemoteView = false;
            SharedObjects.Instance().getLayoutManager(me).getRemoteViewIds().forEach((id: string) => {
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
                        SharedObjects.Instance().getLayoutManager(me).addRemoteView(remoteMedia.getId(), remoteMedia.getView());
                    }
                }
            }
            else {
                if (layoutHasRemoteView) {
                    SharedObjects.Instance().getLayoutManager(me).removeRemoteView(remoteMedia.getId());
                }
                connectionConfig.setVideoDirection(me._Direction(fm.liveswitch.StreamDirection.Inactive));
            }
            connection.update(connectionConfig);
        }
        let updateConnectionForAudio = (enableAudio: boolean) => {
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


        let onStateChangeOnStream: IAction1<StreamState> = null; // need this

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
        } else {
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
                SharedObjects.Instance().getLayoutManager(this).removeRemoteView(remoteMedia.getId());

                remoteMedia.destroy();
                delete this.sfuDownstreamConnections[connection.getId()];
            }
            else if (connection.getState() == fm.liveswitch.ConnectionState.Failed) {
                // Note: no need to close the connection as it's done for us.
                me.updateDownstreamState(SessionState.Terminated);
                if (onStateChangeOnStream) {
                    onStateChangeOnStream(StreamState.Disconnected);
                }

                this.openSfuDownstreamConnection(remoteConnectionInfo, channel, screenStream, participant);
            }
            else if (connection.getState() == fm.liveswitch.ConnectionState.Connected) {
                LogDebug("SFU Downstream connected");
                me.updateDownstreamState(SessionState.Connected);
                if (onStateChangeOnStream) {
                    onStateChangeOnStream(StreamState.Connected);
                }
            }
            else if (connection.getState() == fm.liveswitch.ConnectionState.Failed || connection.getState() == fm.liveswitch.ConnectionState.Closed) {
                me.updateDownstreamState(SessionState.Terminated);
                if (onStateChangeOnStream) {
                    onStateChangeOnStream(StreamState.Disconnected);
                }
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
    private openSfuUpstreamConnection(channel: fm.liveswitch.Channel, localMedia: fm.liveswitch.LocalMedia, screen?: boolean, video?: boolean, audio?: boolean): fm.liveswitch.SfuUpstreamConnection {
        var me = this;
        // incorrect order... localmedia is seperate now
        // need to callback for stuff
        //let videoSubStream = new SubStream("", SubStreamType.Video, undefined, new Source(new Device("", "", DeviceType.Camera), true));
        //me.me.deviceStreams.push(new DeviceStream(null));
        //let localMedia = SharedObjects.Instance().cameraLocalMedia;

        let connection!: fm.liveswitch.SfuUpstreamConnection;

        let audioStream: fm.liveswitch.AudioStream = null;
        let videoStream: fm.liveswitch.VideoStream = null;

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
        } else {
            connection.setTag(Session.cameraAndMircophoneConnectionTag);
        }
        let updateConnectionForVideo = (enableVideo: boolean) => {
            let connectionConfig = connection.getConfig();
            let layoutHasRemoteView = false;
            if (enableVideo) {
                connectionConfig.setVideoDirection(me._Direction(fm.liveswitch.StreamDirection.SendOnly));
            }
            else {
                connectionConfig.setVideoDirection(me._Direction(fm.liveswitch.StreamDirection.Inactive));
            }
            connection.update(connectionConfig);
        }

        let updateConnectionForAudio = (enableAudio: boolean) => {
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
        let onStateChangeOnStream: IAction1<StreamState> = null; // need this
        //update the substream state
        if (screen) {
            let videoSubStream = new DisplaySubStream(videoStream.getId(), updateConnectionForVideo, SubStreamType.Video); // need to create this
            me.me.screenStreams.push(new ScreenStream(true, onStateChangeOnStream, videoSubStream, null));
        } else {
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
                if (onStateChangeOnStream) {
                    onStateChangeOnStream(StreamState.Disconnected);
                }
            }
            else if (connection.getState() == fm.liveswitch.ConnectionState.Connected) {
                me.updateUpstreamState(SessionState.Connected);
                if (onStateChangeOnStream) {
                    onStateChangeOnStream(StreamState.Connected);
                }
            }
            else if (connection.getState() == fm.liveswitch.ConnectionState.Closed) {
                me.updateUpstreamState(SessionState.Terminated);
                if (onStateChangeOnStream) {
                    onStateChangeOnStream(StreamState.Disconnected);
                }
            }
            else if (connection.getState() == fm.liveswitch.ConnectionState.Connecting) {
                me.updateUpstreamState(SessionState.Connecting);
            }
        });
        // Open the connection.
        connection.open();
        return connection;
    }
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




    private upstreamState: SessionState = SessionState.New;
    private downstreamState: SessionState = SessionState.New;
    private updateUpstreamState(upstreamState: SessionState): void {
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
    private updateDownstreamState(downstreamState: SessionState): void {
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
    // Not doing
    autoplayScreenSystemAudioStreams?: boolean = true;
    onpeertypingmessage!: IAction1<string>;
    notifyTyping(): void {
        throw new Error("Method not implemented.");
    }
    playFileStreams(args?: IPlayArgs): void { } // not implemented
    error!: IError; // not sure what this is about

    sendFile(args?: IFileArgs & ISendArgs): ISendStatus {
        throw new Error("not implemented");
        //return new SendStatus();
    };

    startFileStream(args?: IFileStreamArgs): Promise<IFileStream> {
        throw new Error("Method not implemented.");
    }
    fileStream?: IFileStream | undefined;
    fileStreams?: IFileStream[] | undefined;
    inviteUser(userId: string): IOutboundSessionInvite {
        throw new Error("not implemented");
    }
    inviteClient(clientId: string): IOutboundSessionInvite {
        throw new Error("not implemented");
    }
    invitePhone(phoneNumber: string): IOutboundSessionInvite {
        throw new Error("not implemented");
    }
    invites?: IOutboundSessionInvite[];
    stopRecording(): void {
        throw new Error("Method not implemented.");
    }
    kickParticipant(participantId: string, reason: string): boolean {
        throw new Error("not implmented");
    }
    onkicked?: IAction2<ISession, string>;
    autoplayFileStreams?: boolean;

    startRecording(): void { // forget about this
        throw new Error("Method not implemented.");
    }
    connecting(): Promise<ISession> {
        throw new Error("Method not implemented.");
    }
    connected(): Promise<ISession> {
        throw new Error("Method not implemented.");
    }
    terminated(): Promise<ISession> {
        throw new Error("Method not implemented.");
    }
}