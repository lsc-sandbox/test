import { DeviceType } from "../../Interfaces/DeviceType.js";
import { SessionState } from "../../Interfaces/ISession.js";
import { StreamState } from "../../Interfaces/IStream.js";
import { SubStreamType } from "../../Interfaces/SubStreamType.js";
import { CentralConnections } from "./CentralConnections.js";
import { DefaultConfig } from "./DefaultConfig.js";
import { DeviceStream } from "./DeviceStream.js";
import { LogDebug } from "./EntryPoint.js";
import { Participant } from "./Participant.js";
import { ReceiveArgs } from "./ReceiveArgs.js";
import { ScreenStream } from "./ScreenStream.js";
import { SendStatus } from "./SendStatus.js";
import { SharedObjects } from "./SharedObjects.js";
import { Sink } from "./Sink.js";
import { StringMessageArgs } from "./StringMessageArgs.js";
import { SubStream } from "./SubStream.js";
import { DeviceSubStream } from "./DeviceSubStream.js";
import { DisplaySubStream } from "./DisplaySubStream.js";
//namespace ls is fm.liveswitch;
export class Session {
    //private videoContainer: HTMLElement | null = null;
    constructor(channel, liveSwitchClient, notifyLeave, videoContainer, invitation) {
        this.state = SessionState.New;
        this.sendMessage = (args) => {
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
        };
        this.autoplayDeviceCameraStreams = true;
        this.autoplayDeviceMicrophoneStreams = true;
        this.autoplayStreams = true;
        // Need to do
        this.participants = new Array(); // in Progress
        this.autoplayScreenDisplayStreams = true;
        this.defaultConfig = DefaultConfig.Instance();
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
        this._LiveSwitchClient.join(channel, token).then(async (channel) => {
            me.OnClientJoinInAChannel(channel);
        }).fail((ex) => {
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
        if (args) {
            // we ignore system audio for now, do now do anything for now
            //args.systemAudio;
        }
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
        SharedObjects.Instance().createCameraStream(this, this._videoContainer, true, true).then((localMedia) => {
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
                    let message = new StringMessageArgs(dataChannelReceiveArgs.getDataString());
                    let sender = new ReceiveArgs(dataChannelReceiveArgs.getRemoteConnectionInfo().getUserAlias());
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
        if (!remoteConnectionInfo.getHasVideo() || !this.autoplayStreams || !autoPlayVideo) {
            videoStream.changeDirection(fm.liveswitch.StreamDirection.Inactive);
        }
        else {
            SharedObjects.Instance().getLayoutManager(me).addRemoteView(remoteMedia.getId(), remoteMedia.getView());
        }
        let updateConnectionForVideo = (enableVideo) => {
            let connectionConfig = connection.getConfig();
            let layoutHasRemoteView = false;
            SharedObjects.Instance().getLayoutManager(me).getRemoteViewIds().forEach((id) => {
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
