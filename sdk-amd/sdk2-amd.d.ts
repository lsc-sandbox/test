declare module "bundle" {
    var SessionState: any;
    class Source {
        constructor(sourceDevice: any, autoPreview: any);
        set autopreview(autopreview: any);
        get autopreview(): any;
        set sourceDevice(sourceDevice: any);
        get sourceDevice(): any;
        preview(element: any): void;
        start(): void;
        stop(): void;
        mute(file: any): void;
        unmute(): void;
    }
    class CameraSource extends Source {
        constructor(sourceDevice: any, autoPreview: any);
        updateLayout(layoutManager: any): void;
        preview(element: any): void;
    }
    var DeviceType: any;
    var SubStreamType: any;
    class Stream {
        constructor(isMine: any, onStateChange: any, streamType: any, video: any, audio: any);
        start(): void;
        stop(): void;
        get audioSink(): any;
        get videoSink(): any;
        get audioSource(): any;
        get audioSourceDeviceId(): any;
        get videoSource(): any;
        get videoSourceDeviceId(): any;
        get isMine(): any;
        get id(): any;
        get tag(): any;
        set tag(tag: any);
        connected(): void;
        disconnected(): void;
        play(args: any): void;
    }
    var StreamType: any;
    class Participant {
        constructor(id: any, isMe: any);
        get screenStream(): any;
        get deviceStream(): any;
        get fileStream(): any;
        get fileStreams(): any;
    }
    class Device {
        constructor(id: any, name: any, deviceType: any, fmSourceInput: any);
        start(): void;
        stop(): void;
    }
    class SubStream {
        constructor(id: any, enableSubStream: any, type: any, sink: any);
        set id(id: any);
        get id(): any;
        set tag(tag: any);
        get tag(): any;
        enable(): void;
        disable(): void;
        play(sink: any): void;
        get isNew(): boolean;
        get isDisabled(): boolean;
        set isDisabled(disable: boolean);
        enabled(): Promise<unknown>;
        disabled(): Promise<unknown>;
    }
    class Session {
        constructor(channel: any, liveSwitchClient: any, notifyLeave: any, args: any, videoContainer: any);
        leave(): void;
        get me(): any;
        get screenStream(): any;
        get screenStreams(): any[];
        get deviceStream(): any;
        get deviceStreams(): any[];
        startScreenStream(args: any): Promise<unknown>;
        startDeviceStream(args: any): Promise<unknown>;
        playStreams(): void;
        playScreenStreams(args: any): void;
        playDeviceStreams(args: any): void;
        hold(): void;
        resume(): void;
        OnClientJoinAChannel(channel: any, args: any): void;
        openMcuConnectionForDataChannel(channel: any): void;
        _Direction(streamDirection: any): string;
        openSfuDownstreamConnection(remoteConnectionInfo: any, channel: any, screenStream: any, participant: any, args: any): any;
        openSfuUpstreamConnection(channel: any, localMedia: any, screen: any, video: any, audio: any): any;
        updateUpstreamState(upstreamState: any): void;
        updateDownstreamState(downstreamState: any): void;
        notifyTyping(): void;
        playFileStreams(args: any): void;
        sendFile(args: any): void;
        startFileStream(args: any): void;
        inviteUser(userId: any): void;
        inviteClient(clientId: any): void;
        invitePhone(phoneNumber: any): void;
        stopRecording(): void;
        kickParticipant(participantId: any, reason: any): void;
        startRecording(): void;
        connecting(): void;
        connected(): void;
        terminated(): void;
    }
    class Conference extends Session {
        constructor(channel: any, liveSwitchClient: any, notifyLeave: any, args: any, videoContainer: any);
    }
    class Client {
        constructor(userId: any, token: any);
        connect(): any;
        join(args: any): Conference;
        get camera(): Promise<unknown>;
        get microphone(): Promise<unknown>;
        get screen(): Promise<unknown>;
        get cameras(): Promise<unknown>;
        get microphones(): Promise<unknown>;
        get screens(): Promise<unknown>;
        changeStateTo(state: any): void;
        record(audioOnly: any): void;
        notifyTyping(peerId: any): void;
        blockIncomingCalls(userId: any): void;
        unblockIncomingCalls(userId: any): void;
        getBlockedUserIds(): void;
        audioMessage(sendArgs: any): void;
        videoMessage(sendArgs: any): void;
        call(args: any): void;
    }
    class DeviceManager {
        getMediaDevices(): Promise<unknown>;
        getAudioDevices(): Promise<unknown>;
        getVideoDevices(): Promise<unknown>;
        getVideoInputDevices(): Promise<unknown>;
        getAudioInputDevices(): Promise<unknown>;
        getAudioOutputDevices(): Promise<unknown>;
    }
    class SessionInvite {
    }
    class OutboundSessionInvite extends SessionInvite {
        accepted(): void;
        rejected(): void;
        cancel(): void;
        startScreenStream(args: any): void;
        startFileStream(args: any): void;
        startDeviceStream(args: any): void;
    }
    class InbountSesssionInvite extends SessionInvite {
        playStreams(): void;
        playScreenStreams(args: any): void;
        playFileStreams(args: any): void;
        playDeviceStreams(args: any): void;
        accept(args: any): void;
        acceptWithDeviceStream(args: any): void;
        acceptWithScreenStream(args: any): void;
        acceptWithFileStream(args: any): void;
        reject(reason: any): void;
    }
    class SendArgs {
        constructor(onsent: any, ondelivered: any, onprogress: any, onfailed: any, onviewed: any);
    }
    class PlayArgs {
        constructor(audioSink: any, videoSink: any);
    }
    class DevicePlayArgs extends PlayArgs {
        constructor(microphone: any, camera: any, audioOutputDeviceId: any, videoSinkElementId: any, audioSink: any, videoSink: any);
    }
    var SessionInviteRejectReason: any;
    var SourceType: any;
    class MessageArgs {
        constructor(message: any);
    }
    class StringMessageArgs {
        constructor(message: any);
    }
    class ChatArgs {
        constructor();
    }
    export { CameraSource, ChatArgs, Client, Conference, Device, DeviceManager, DevicePlayArgs, DeviceType, InbountSesssionInvite, MessageArgs, OutboundSessionInvite, Participant, SendArgs, Session, SessionInvite, SessionInviteRejectReason, SessionState, SourceType, Stream, StreamType, StringMessageArgs, SubStream, SubStreamType };
}
declare module "src/Interfaces/IReceiveArgs" {
    export interface IReceiveArgs {
        senderId: string;
    }
}
declare module "src/Interfaces/IAction2" {
    export interface IAction2<T1, T2> {
        (p1: T1, p2: T2): void;
    }
}
declare module "src/Interfaces/IAction1" {
    export interface IAction1<T> {
        (p: T): void;
    }
}
declare module "src/Interfaces/ISendArgs" {
    import { IAction2 } from "src/Interfaces/IAction2";
    import { IAction1 } from "src/Interfaces/IAction1";
    export interface ISendArgs {
        onSent?: IAction1<ISendArgs>;
        onDelivered?: IAction1<ISendArgs>;
        onProgress?: IAction2<ISendArgs, number>;
        onFailed?: IAction2<ISendArgs, Error>;
        onViewed?: IAction1<ISendArgs>;
    }
}
declare module "src/Interfaces/ILayout" {
    export interface ILayout {
        mode: LayoutMode;
        setMargins: {
            (horizontal: number, vertical: number): void;
        };
        setBackgroundColor: {
            (hex: string): void;
            (red: number, green: number, blue: number): void;
            (color: Color): void;
        };
        getViews: {
            (): IView[];
            (userId: string): IView[];
        };
        getView(streamId: string): IView;
        getRemoteViews(): IView[];
        getRemoteView(): IView;
        getRemoteCameraView(): IView;
        getRemoteCameraViews(): IView[];
        getRemoteScreenView(): IView;
        getRemoteScreenViews(): IView[];
        getLocalView(): IView;
        getLocalViews(): IView[];
        getLocalCameraView(): IView;
        getLocalCameraViews(): IView[];
        getLocalScreenView(): IView;
        getLocalScreenViews(): IView[];
        setPromimentView(view: IView): void;
    }
    export interface IView {
        userId: string;
        streamId: string;
        frame: Rectangle;
        bounds: Rectangle;
    }
    export class Rectangle {
        origin: Point;
        size: Size;
    }
    export class Size {
        height: number;
        width: number;
    }
    export class Point {
        x: number;
        y: number;
    }
    export interface LayoutConstructor {
        new (container: Element): ILayout;
    }
    export enum LayoutMode {
        HorizontalFill = 0,
        VerticalFill = 1,
        ProminentBottomFill = 2,
        ProminentRightFill = 3,
        Custom = 4
    }
    export enum Color {
        Black = 0,
        Red = 1,
        Green = 2,
        Blue = 3,
        White = 4
    }
}
declare module "src/Interfaces/DeviceType" {
    export enum DeviceType {
        Camera = 1,
        Microphone = 2,
        Screen = 3,
        Speaker = 4,
        Headphones = 5
    }
}
declare module "src/Interfaces/IDevice" {
    import { DeviceType } from "src/Interfaces/DeviceType";
    import { IAction1 } from "src/Interfaces/IAction1";
    export interface IDevice {
        id: string;
        name: string;
        deviceType: DeviceType;
        start(): void;
        stop(): void;
        isNew: boolean;
        isStarted: boolean;
        isStopped: boolean;
        isPluggedIn: boolean;
        onUnplugged: IAction1<IDevice>;
        onPluggedIn: IAction1<IDevice>;
    }
    export enum DeviceState {
        New = 1,
        Started = 2,
        Stopped = 3
    }
}
declare module "src/Interfaces/ISink" {
    import { IDevice } from "src/Interfaces/IDevice";
    export interface ISink {
        id?: string;
        sinkDevice?: IDevice;
        mute: () => void;
        unmute: () => void;
        isMuted?: boolean;
    }
}
declare module "src/Interfaces/StreamType" {
    export enum StreamType {
        Device = 0,
        File = 1,
        Screen = 2
    }
}
declare module "src/Interfaces/SubStreamType" {
    export enum SubStreamType {
        Audio = 0,
        Video = 1,
        Data = 2
    }
}
declare module "src/Interfaces/IAction3" {
    export interface IAction3<T1, T2, T3> {
        (p1: T1, p2: T2, p3: T3): void;
    }
}
declare module "src/Interfaces/ISource" {
    import { IDevice } from "src/Interfaces/IDevice";
    import { IAction2 } from "src/Interfaces/IAction2";
    import { IAction3 } from "src/Interfaces/IAction3";
    export interface ISource {
        id: string;
        autopreview: boolean;
        sourceDevice: IDevice;
        preview(element?: any): void;
        start(): void;
        stop(): void;
        mute(file?: any): void;
        unmute(): void;
        isMuted?: boolean;
        onSourceDeviceUnplugged?: IAction2<ISource, IDevice>;
        onSourceDevicePluggedIn?: IAction2<ISource, IDevice>;
        onSourceDeviceChanged?: IAction3<ISource, IDevice, IDevice>;
        switchDevicePolicy?: SwitchDevicePolicy;
    }
    export enum SwitchDevicePolicy {
        DontSwitch = 1,
        SwitchAndSwitchBack = 2,
        SwitchAndDontSwitchBack = 3
    }
}
declare module "src/Interfaces/ISubStream" {
    import { ISink } from "src/Interfaces/ISink";
    import { SubStreamType } from "src/Interfaces/SubStreamType";
    import { IView } from "src/Interfaces/ILayout";
    import { IAction2 } from "src/Interfaces/IAction2";
    export interface ISubStream {
        id: string;
        tag: string;
        substreamType: SubStreamType;
        enable(): void;
        disable(): void;
        play(sink?: ISink): void;
        view?: IView;
        onStateChange?: IAction2<ISubStream, SubStreamState>;
        state?: SubStreamState;
        isNew?: boolean;
        isEnabled?: boolean;
        isDisabled?: boolean;
        enabled(): Promise<ISubStream>;
        disabled(): Promise<ISubStream>;
    }
    export enum SubStreamState {
        New = 1,
        Enabled = 2,
        Disabled = 3
    }
}
declare module "src/Interfaces/IScreenSubStream" {
    import { ISubStream } from "src/Interfaces/ISubStream";
    export interface IDisplaySubStream extends ISubStream {
        sourceDisplaySurface: SourceDisplaySurfaceType;
    }
    export enum SourceDisplaySurfaceType {
        Application = 1,
        Browser = 2,
        Monitor = 3,
        Window = 4
    }
}
declare module "src/Interfaces/IScreenStream" {
    import { IDisplaySubStream } from "src/Interfaces/IScreenSubStream";
    import { IStream } from "src/Interfaces/IStream";
    import { IScreenPlayArgs } from "src/Interfaces/ISession";
    import { ISubStream } from "src/Interfaces/ISubStream";
    export interface IScreenStream extends IStream {
        display?: IDisplaySubStream;
        displays?: IDisplaySubStream[];
        systemAudio?: ISubStream;
        systemAudios?: ISubStream[];
        play(args?: IScreenPlayArgs): void;
    }
}
declare module "src/Interfaces/IDeviceSubStream" {
    import { ISubStream } from "src/Interfaces/ISubStream";
    import { ISink } from "src/Interfaces/ISink";
    import { ISource } from "src/Interfaces/ISource";
    export interface IDeviceSubStream extends ISubStream {
        sink?: ISink;
        source?: ISource;
        deviceId?: string;
    }
}
declare module "src/Interfaces/IDeviceStream" {
    import { IStream } from "src/Interfaces/IStream";
    import { IDevicePlayArgs } from "src/Interfaces/ISession";
    import { IDeviceSubStream } from "src/Interfaces/IDeviceSubStream";
    export interface IDeviceStream extends IStream {
        camera?: IDeviceSubStream;
        microphone?: IDeviceSubStream;
        play(args?: IDevicePlayArgs): void;
    }
}
declare module "src/Interfaces/IFileStream" {
    import { IStream } from "src/Interfaces/IStream";
    export interface IFileStream extends IStream {
    }
}
declare module "src/Interfaces/IParticipant" {
    import { IScreenStream } from "src/Interfaces/IScreenStream";
    import { IDeviceStream } from "src/Interfaces/IDeviceStream";
    import { IFileStream } from "src/Interfaces/IFileStream";
    import { IAction1 } from "src/Interfaces/IAction1";
    export interface IParticipant {
        id: string;
        isMe: boolean;
        screenStream: IScreenStream;
        screenStreams: IScreenStream[];
        deviceStream: IDeviceStream;
        deviceStreams: IDeviceStream[];
        fileStream: IFileStream;
        fileStreams: IFileStream[];
        onParticipantTypingMessage?: IAction1<IParticipant>;
        onParticipantSendingFile?: IAction1<IParticipant>;
        connectionQuality: number;
        roundTripTime: number;
        packetLoss: number;
        audioLevel: number;
    }
}
declare module "src/Interfaces/IStream" {
    import { ISink } from "src/Interfaces/ISink";
    import { IAction2 } from "src/Interfaces/IAction2";
    import { IView } from "src/Interfaces/ILayout";
    import { StreamType } from "src/Interfaces/StreamType";
    import { ISubStream } from "src/Interfaces/ISubStream";
    import { IParticipant } from "src/Interfaces/IParticipant";
    import { IAction1 } from "src/Interfaces/IAction1";
    import { ISource } from "src/Interfaces/ISource";
    import { IPlayArgs } from "src/Interfaces/ISession";
    export interface IStream {
        id: string;
        tag: string;
        streamType: StreamType;
        start(): void;
        stop(): void;
        onstarted?: IAction1<IStream>;
        onstopped?: IAction1<IStream>;
        play(args?: IPlayArgs): void;
        audioSink?: ISink;
        videoSink?: ISink;
        audioSource?: ISource;
        audioSourceDeviceId?: string;
        videoSource?: ISource;
        videoSourceDeviceId?: string;
        view?: IView;
        isMine: boolean;
        origin: IParticipant;
        audio?: ISubStream;
        video?: ISubStream;
        data?: ISubStream;
        onstatechange?: IAction2<IStream, StreamState>;
        state?: StreamState;
        connected(): Promise<IStream>;
        disconnected(): Promise<IStream>;
    }
    export enum StreamState {
        New = 1,
        Connected = 2,
        Disconnected = 3
    }
}
declare module "src/Interfaces/SessionInviteRejectReason" {
    export enum SessionInviteRejectReason {
        Busy = 0,
        Incompatible = 1,
        None = 2
    }
}
declare module "src/Interfaces/ISessionInvite" {
    import { ISession } from "src/Interfaces/ISession";
    import { IScreenStream } from "src/Interfaces/IScreenStream";
    import { IAction2 } from "src/Interfaces/IAction2";
    import { IFileStream } from "src/Interfaces/IFileStream";
    import { IDeviceStream } from "src/Interfaces/IDeviceStream";
    import { IParticipant } from "src/Interfaces/IParticipant";
    export interface ISessionInvite {
        participants?: IParticipant[];
        me?: IParticipant;
        onParticipantAdded?: IAction2<ISession, IParticipant>;
        onParticipantRemoved?: IAction2<ISession, IParticipant>;
        autoplayStreams?: boolean;
        autoplayScreenDisplayStreams?: boolean;
        autoplayScreenSystemAudioStreams?: boolean;
        autoplayFileStreams?: boolean;
        autoplayDeviceCameraStreams?: boolean;
        autoplayDeviceMicrophoneStreams?: boolean;
        screenStream?: IScreenStream;
        screenStreams?: IScreenStream[];
        onScreenStreamAdded?: IAction2<ISession, IScreenStream>;
        onScreenStreamRemoved?: IAction2<ISession, IScreenStream>;
        fileStream?: IFileStream;
        fileStreams?: IFileStream[];
        onFileStreamAdded?: IAction2<ISession, IFileStream>;
        onFileStreamRemoved?: IAction2<ISession, IFileStream>;
        deviceStream?: IDeviceStream;
        deviceStreams?: IDeviceStream[];
        onDeviceStreamAdded?: IAction2<ISession, IDeviceStream>;
        onDeviceStreamRemoved?: IAction2<ISession, IDeviceStream>;
    }
}
declare module "src/Interfaces/IOutboundSessionInvite" {
    import { SessionInviteRejectReason } from "src/Interfaces/SessionInviteRejectReason";
    import { ISession, IScreenStreamArgs, IFileStreamArgs, IDeviceStreamArgs } from "src/Interfaces/ISession";
    import { ISessionInvite } from "src/Interfaces/ISessionInvite";
    import { IAction1 } from "src/Interfaces/IAction1";
    import { IAction2 } from "src/Interfaces/IAction2";
    import { IScreenStream } from "src/Interfaces/IScreenStream";
    import { IFileStream } from "src/Interfaces/IFileStream";
    import { IDeviceStream } from "src/Interfaces/IDeviceStream";
    export interface IOutboundSessionInvite extends ISessionInvite {
        accepted(): Promise<ISession>;
        rejected(): Promise<void>;
        rejectReason?: SessionInviteRejectReason;
        cancel(): void;
        onInviteAccepted?: IAction1<IOutboundSessionInvite>;
        onInviteRejected?: IAction2<IOutboundSessionInvite, SessionInviteRejectReason>;
        startScreenStream(args?: IScreenStreamArgs): Promise<IScreenStream>;
        startFileStream(args?: IFileStreamArgs): Promise<IFileStream>;
        startDeviceStream(args?: IDeviceStreamArgs): Promise<IDeviceStream>;
    }
}
declare module "src/Interfaces/ISendStatus" {
    import { IParticipant } from "src/Interfaces/IParticipant";
    export interface ISendStatus {
        state: SendState;
        deliveredToParticipants: IParticipant[];
        viewedByParticipants: IParticipant[];
    }
    export enum SendState {
        New = 1,
        Sent = 2,
        Delivered = 3,
        Viewed = 4
    }
}
declare module "src/Interfaces/IFileArgs" {
    export interface IFileArgs {
        file: Blob;
    }
}
declare module "src/Interfaces/IFileTrack" {
    export interface IFileTrack {
        id: string;
    }
}
declare module "src/Interfaces/IFileSource" {
    import { ISource } from "src/Interfaces/ISource";
    import { IFileTrack } from "src/Interfaces/IFileTrack";
    export interface IFileSource extends ISource {
        tracks: IFileTrack[];
    }
}
declare module "src/Interfaces/ImessageArgs" {
    export interface IMessageArgs {
        binaryMessage?: Blob;
        stringMessage?: string;
        userId?: string;
    }
}
declare module "src/Interfaces/ICameraSource" {
    import { ISource } from "src/Interfaces/ISource";
    export interface ICameraSource extends ISource {
        preview(element: string): void;
    }
}
declare module "src/Interfaces/IMicrophoneSource" {
    import { ISource } from "src/Interfaces/ISource";
    export interface IMicrophoneSource extends ISource {
    }
}
declare module "src/Interfaces/IScreenSource" {
    import { ISource } from "src/Interfaces/ISource";
    export interface IScreenSource extends ISource {
        display: number;
    }
}
declare module "src/Interfaces/ISession" {
    import { IReceiveArgs } from "src/Interfaces/IReceiveArgs";
    import { ISendArgs } from "src/Interfaces/ISendArgs";
    import { IAction2 } from "src/Interfaces/IAction2";
    import { ILayout } from "src/Interfaces/ILayout";
    import { IStream } from "src/Interfaces/IStream";
    import { IParticipant } from "src/Interfaces/IParticipant";
    import { IOutboundSessionInvite } from "src/Interfaces/IOutboundSessionInvite";
    import { ISendStatus } from "src/Interfaces/ISendStatus";
    import { IFileArgs } from "src/Interfaces/IFileArgs";
    import { IScreenStream } from "src/Interfaces/IScreenStream";
    import { IFileStream } from "src/Interfaces/IFileStream";
    import { IFileSource } from "src/Interfaces/IFileSource";
    import { IDeviceStream } from "src/Interfaces/IDeviceStream";
    import { IMessageArgs } from "src/Interfaces/ImessageArgs";
    import { ICameraSource } from "src/Interfaces/ICameraSource";
    import { IMicrophoneSource } from "src/Interfaces/IMicrophoneSource";
    import { IScreenSource } from "src/Interfaces/IScreenSource";
    import { ISink } from "src/Interfaces/ISink";
    export interface IPlayArgs {
        audioSink?: ISink;
        videoSink?: ISink;
    }
    export interface IDevicePlayArgs extends IPlayArgs {
        microphone?: boolean;
        camera?: boolean;
        audioOutputDeviceId?: string;
        videoSinkElementId?: string;
    }
    export interface IDeviceStreamArgs {
        microphone?: boolean;
        camera?: boolean;
        cameraSource?: ICameraSource;
        microphoneSource?: IMicrophoneSource;
    }
    export interface IScreenStreamArgs {
        systemAudio?: boolean;
        screenSource?: IScreenSource;
    }
    export interface IScreenPlayArgs extends IPlayArgs {
        systemAudio?: boolean;
        videoSinkElementId?: string;
    }
    export interface IFileStreamArgs {
        url?: string;
        source?: IFileSource;
    }
    export interface ISession {
        id?: string;
        hold(): void;
        isHeld: boolean;
        resume(): void;
        leave(): void;
        stream?: IStream;
        streams?: IStream[];
        onStreamAdded?: IAction2<ISession, IStream>;
        onStreamRemoved?: IAction2<ISession, IStream>;
        startScreenStream(args?: IScreenStreamArgs): Promise<IScreenStream>;
        screenStream?: IScreenStream;
        screenStreams?: IScreenStream[];
        onScreenStreamAdded?: IAction2<ISession, IScreenStream>;
        onScreenStreamRemoved?: IAction2<ISession, IScreenStream>;
        startFileStream(args?: IFileStreamArgs): Promise<IFileStream>;
        fileStream?: IFileStream;
        fileStreams?: IFileStream[];
        onFileStreamAdded?: IAction2<ISession, IFileStream>;
        onFileStreamRemoved?: IAction2<ISession, IFileStream>;
        startDeviceStream(args?: IDeviceStreamArgs): Promise<IDeviceStream>;
        deviceStream?: IDeviceStream;
        deviceStreams?: IDeviceStream[];
        onDeviceStreamAdded?: IAction2<ISession, IDeviceStream>;
        onDeviceStreamRemoved?: IAction2<ISession, IDeviceStream>;
        participants?: IParticipant[];
        me?: IParticipant;
        onParticipantAdded?: IAction2<ISession, IParticipant>;
        onParticipantRemoved?: IAction2<ISession, IParticipant>;
        autoplayStreams?: boolean;
        autoplayScreenDisplayStreams?: boolean;
        autoplayScreenSystemAudioStreams?: boolean;
        autoplayFileStreams?: boolean;
        autoplayDeviceCameraStreams?: boolean;
        autoplayDeviceMicrophoneStreams?: boolean;
        playStreams(): void;
        playScreenStreams(args?: IScreenPlayArgs): void;
        playFileStreams(args?: IPlayArgs): void;
        playDeviceStreams(args?: IDevicePlayArgs): void;
        inviteUser(userId: string): IOutboundSessionInvite;
        inviteClient(clientId: string): IOutboundSessionInvite;
        invitePhone(phoneNumber: string): IOutboundSessionInvite;
        invites?: IOutboundSessionInvite[];
        kickParticipant(participantId: string, reason: string): boolean;
        onkicked?: IAction2<ISession, string>;
        startRecording(): void;
        stopRecording(): void;
        onIncomingMessage?: IAction2<ISession, IMessageArgs & IReceiveArgs>;
        sendMessage(args?: IMessageArgs & ISendArgs): ISendStatus;
        notifyTyping(): void;
        onIncomingFile?: IAction2<ISession, IFileArgs & IReceiveArgs>;
        sendFile(args?: IFileArgs & ISendArgs): ISendStatus;
        error?: IError;
        state?: SessionState;
        onStateChange?: IAction2<ISession, SessionState>;
        isNew?: boolean;
        isConnecting?: boolean;
        isConnected?: boolean;
        isTerminated?: boolean;
        connecting(): Promise<ISession>;
        connected(): Promise<ISession>;
        terminated(): Promise<ISession>;
        layout?: ILayout;
    }
    export enum SessionState {
        New = 0,
        Connecting = 1,
        Connected = 2,
        Terminated = 3
    }
    export interface IError {
        errorCode: IErrorCode;
        message: string;
    }
    export interface IErrorCode {
    }
}
declare module "src/beta/Source" {
    import { ISource } from "src/Interfaces/ISource";
    import { SwitchDevicePolicy } from "src/Interfaces/ISource";
    import { IDevice } from "src/Interfaces/IDevice";
    import { IAction2 } from "src/Interfaces/IAction2";
    import { IAction3 } from "src/Interfaces/IAction3";
    export class Source implements ISource {
        constructor(sourceDevice: IDevice, autoPreview?: boolean);
        id: string;
        isMuted?: boolean;
        switchDevicePolicy?: SwitchDevicePolicy;
        onSourceDeviceUnplugged?: IAction2<ISource, IDevice>;
        onSourceDevicePluggedIn?: IAction2<ISource, IDevice>;
        onSourceDeviceChanged?: IAction3<ISource, IDevice, IDevice>;
        switchDeviceOnUnplugPolicy: SwitchDevicePolicy;
        private _autopreview;
        set autopreview(autopreview: boolean);
        get autopreview(): boolean;
        private _sourceDevice;
        set sourceDevice(sourceDevice: IDevice);
        get sourceDevice(): IDevice;
        preview(element?: any): void;
        protected _isSourceStarted: boolean;
        start(): void;
        stop(): void;
        mute(file?: any): void;
        unmute(): void;
    }
}
declare module "src/beta/SharedObjects" {
    import { ISession } from "src/Interfaces/ISession";
    export class SharedObjects {
        GetCameraVideoDevice(): string;
        GetScreenVideoDevice(): string;
        GetCameraAudioDevice(): string;
        switchToScreenVideoDevice(newDeviceId: string): void;
        switchToCameraAudioDevice(newDeviceId: string): void;
        switchToCameraVideoDevice(newDeviceId: string): void;
        private static _Instance;
        private cameraLocalMedia;
        private screenLocalMedia;
        private _isLocalMediaStarted;
        private _localCameraAudio;
        private _localCameraVideo;
        private _localScreenVideo;
        private _localScreenAudio;
        private get _needAudio();
        private StopCamera;
        private StopScreen;
        private constructor();
        static Instance(): SharedObjects;
        private _Sessions;
        private _SessionLayouts;
        onSessionUpdate(): Promise<void>;
        createScreenStream(session: ISession, screenVideo?: boolean, screenAudio?: boolean, container?: HTMLElement): Promise<fm.liveswitch.LocalMedia>;
        createCameraStream(session: ISession, container?: HTMLElement, cameraVideo?: boolean, cameraAudio?: boolean): Promise<fm.liveswitch.LocalMedia>;
        onSessionLeave(session: ISession): Promise<void>;
        private updateLocaLMedias;
        private cameraResolved?;
        private screenResolved?;
        private updatePromiseResolve;
        getLayoutManagerBySessionId(sessionId: string): fm.liveswitch.DomLayoutManager;
        getLayoutManagerBySession(seesion: ISession): fm.liveswitch.DomLayoutManager;
        private removeLocalLayouts;
        private stopScreenLocalMedia;
        private stopCameraLocalMedia;
        private startLocalScreenMedia;
        private startLocalCameraMedia;
    }
}
declare module "src/beta/CameraSource" {
    import { ICameraSource } from "src/Interfaces/ICameraSource";
    import { Source } from "src/beta/Source";
    import { IDevice } from "src/Interfaces/IDevice";
    export class CameraSource extends Source implements ICameraSource {
        constructor(sourceDevice: IDevice, autoPreview?: boolean);
        private _layoutManager;
        updateLayout(layoutManager: fm.liveswitch.DomLayoutManager): void;
        preview(element?: any): void;
    }
    export class preview {
        layoutManager: fm.liveswitch.DomLayoutManager;
        constructor(localMedia: fm.liveswitch.LocalMedia, layoutManager: fm.liveswitch.DomLayoutManager);
    }
}
declare module "src/Interfaces/IAudioMessageArgs" {
    export interface IAudioMessageArgs {
        message: Blob;
    }
}
declare module "src/Interfaces/IVideoMessageArgs" {
    export interface IVideoMessageArgs {
        message: Blob;
    }
}
declare module "src/Interfaces/IConference" {
    import { ISession } from "src/Interfaces/ISession";
    export interface IConference extends ISession {
    }
}
declare module "src/Interfaces/ICall" {
    import { ISession } from "src/Interfaces/ISession";
    import { IAction1 } from "src/Interfaces/IAction1";
    export interface ICall extends ISession {
        callerId?: string;
        onEnded?: IAction1<ICall>;
        merge?: {
            (anotherCall: ICall): void;
            (...otherCalls: ICall[]): void;
            (anotherCallId: string): void;
            (otherCallIds: string[]): void;
        };
    }
}
declare module "src/Interfaces/IInboundSessionInvite" {
    import { IDeviceStreamArgs, IScreenStreamArgs, IFileStreamArgs, ISession, IScreenPlayArgs, IPlayArgs, IDevicePlayArgs } from "src/Interfaces/ISession";
    import { SessionInviteRejectReason } from "src/Interfaces/SessionInviteRejectReason";
    import { IParticipant } from "src/Interfaces/IParticipant";
    import { ISessionInvite } from "src/Interfaces/ISessionInvite";
    export interface IInboundSessionInvite extends ISessionInvite {
        accept(args?: IDeviceStreamArgs): ISession;
        acceptWithDeviceStream(args?: IDeviceStreamArgs): ISession;
        acceptWithScreenStream(args?: IScreenStreamArgs): ISession;
        acceptWithFileStream(args?: IFileStreamArgs): ISession;
        reject(reason?: SessionInviteRejectReason): void;
        hasVideo?: boolean;
        hasAudio?: boolean;
        hasScreenshare?: boolean;
        inviteState?: InboundSessionInviteState;
        isNew?: boolean;
        isAccepted?: boolean;
        isRejected?: boolean;
        playStreams(): void;
        playScreenStreams(args?: IScreenPlayArgs): void;
        playFileStreams(args?: IPlayArgs): void;
        playDeviceStreams(args?: IDevicePlayArgs): void;
        participants?: IParticipant[];
    }
    export enum InboundSessionInviteState {
        New = 1,
        Accepted = 2,
        Rejected = 3
    }
}
declare module "src/Interfaces/IClient" {
    import { ISendArgs } from "src/Interfaces/ISendArgs";
    import { IAction2 } from "src/Interfaces/IAction2";
    import { IAudioMessageArgs } from "src/Interfaces/IAudioMessageArgs";
    import { IReceiveArgs } from "src/Interfaces/IReceiveArgs";
    import { IVideoMessageArgs } from "src/Interfaces/IVideoMessageArgs";
    import { IConference } from "src/Interfaces/IConference";
    import { ICall } from "src/Interfaces/ICall";
    import { ICameraSource } from "src/Interfaces/ICameraSource";
    import { IScreenSource } from "src/Interfaces/IScreenSource";
    import { IMicrophoneSource } from "src/Interfaces/IMicrophoneSource";
    import { IMessageArgs } from "src/Interfaces/ImessageArgs";
    import { IOutboundSessionInvite } from "src/Interfaces/IOutboundSessionInvite";
    import { IInboundSessionInvite } from "src/Interfaces/IInboundSessionInvite";
    export interface IClient {
        connect(): Promise<IClient>;
        onIncomingCall?: IAction2<IClient, IInboundSessionInvite & ICall>;
        calls?: ICall[];
        heldCalls?: ICall[];
        call(args: ICallArgs): IOutboundSessionInvite;
        callerId: string;
        conferences?: IConference[];
        heldConferences?: IConference[];
        join(args: IJoinConferenceArgs): IConference;
        onConferenceInvite?: IAction2<IClient, IInboundSessionInvite & IConference>;
        record(audioOnly: boolean): Blob;
        onIncomingVideoMessage?: IAction2<IClient, IVideoMessageArgs | IReceiveArgs>;
        onIncomingAudioMessage?: IAction2<IClient, IAudioMessageArgs | IReceiveArgs>;
        audioMessage(sendArgs: ISendArgs & IMessageArgs): void;
        videoMessage(sendArgs: ISendArgs & IMessageArgs): void;
        onStateChange?: IAction2<IClient, ClientState>;
        camera?: Promise<ICameraSource>;
        cameras?: Promise<ICameraSource[]>;
        screen?: Promise<IScreenSource>;
        screens?: Promise<IScreenSource[]>;
        microphone?: Promise<IMicrophoneSource>;
        microphones?: Promise<IMicrophoneSource[]>;
        state?: ClientState;
        isNew?: boolean;
        isConnecting?: boolean;
        isConnected?: boolean;
        isDisconnected?: boolean;
    }
    export enum ClientState {
        New = 1,
        Connecting = 2,
        Connected = 3,
        Disconnected = 4
    }
    export interface IJoinSessionArgs {
        videoSinkElementId?: string;
        playLocalCamera?: boolean;
        playLocalMicrophone?: boolean;
        playLocalScreenshare?: boolean;
        streamRemoteCamera?: boolean;
        streamRemoteMicrophone?: boolean;
        streamRemoteScreenshare?: boolean;
    }
    export interface IJoinConferenceArgs extends IJoinSessionArgs {
        conferenceId: string;
    }
    export interface ICallArgs extends IJoinSessionArgs {
        userId: string;
    }
}
declare module "src/beta/EntryPoint" {
    export class EntryPoint {
        private static _Instance;
        constructor();
        static Instance(): EntryPoint;
    }
    export function LogDebug(logMessage: string): void;
}
declare module "src/beta/DefaultConfig" {
    export class DefaultConfig {
        DefaultAppId: string;
        DefaultGatewayUrl: string;
        DefaultSharedSecret: string;
        DefaultChannel: string;
        DefaultChannels: string[];
        DefaultDevice: string;
        DefaultUserId: string;
        ClientId: string;
        private static _Instance;
        private constructor();
        static Instance(): DefaultConfig;
    }
}
declare module "src/Interfaces/IAction0" {
    export interface IAction0 {
        (): void;
    }
}
declare module "src/beta/CentralConnections" {
    export class CentralConnections {
        static Instance(): CentralConnections;
        private static _Instance;
        private constructor();
        remoteConnectionInfoForCamera: Map<string, fm.liveswitch.ConnectionInfo>;
        remoteConnectionInfoForScreen: Map<string, fm.liveswitch.ConnectionInfo>;
    }
}
declare module "src/beta/Device" {
    import { IDevice } from "src/Interfaces/IDevice";
    import { DeviceType } from "src/Interfaces/DeviceType";
    import { IAction1 } from "src/Interfaces/IAction1";
    export class Device implements IDevice {
        id: string;
        name: string;
        deviceType: DeviceType;
        start(): void;
        stop(): void;
        fmSourceInput?: fm.liveswitch.SourceInput;
        constructor(id: string, name: string, deviceType: DeviceType, fmSourceInput?: fm.liveswitch.SourceInput);
        isNew: boolean;
        isStarted: boolean;
        isStopped: boolean;
        isPluggedIn: boolean;
        onUnplugged: IAction1<IDevice>;
        onPluggedIn: IAction1<IDevice>;
    }
}
declare module "src/beta/Sink" {
    import { ISink } from "src/Interfaces/ISink";
    import { IDevice } from "src/Interfaces/IDevice";
    import { DeviceType } from "src/Interfaces/DeviceType";
    import { IAction0 } from "src/Interfaces/IAction0";
    export class Sink implements ISink {
        sinkDevice: IDevice;
        mute(): void;
        unmute(): void;
        private muteSink;
        private unMuteSink;
        constructor(deviceType: DeviceType, mute: IAction0, unMute: IAction0);
    }
}
declare module "src/beta/SubStream" {
    import { ISubStream, SubStreamState } from "src/Interfaces/ISubStream";
    import { SubStreamType } from "src/Interfaces/SubStreamType";
    import { ISink } from "src/Interfaces/ISink";
    import { IAction2 } from "src/Interfaces/IAction2";
    import { IView } from "src/Interfaces/ILayout";
    import { IAction1 } from "src/Interfaces/IAction1";
    export class SubStream implements ISubStream {
        private _id;
        private _tag;
        set id(id: string);
        get id(): string;
        set tag(tag: string);
        get tag(): string;
        substreamType: SubStreamType;
        enable(): void;
        disable(): void;
        play(sink?: ISink): void;
        view?: IView | undefined;
        onstatechange?: IAction2<ISubStream, SubStreamState>;
        state?: SubStreamState;
        get isNew(): boolean;
        isEnabled: boolean;
        get isDisabled(): boolean;
        set isDisabled(disable: boolean);
        private _enableSubStream;
        constructor(id: string, enableSubStream: IAction1<boolean>, type: SubStreamType, sink?: ISink);
        onStateChange?: IAction2<ISubStream, SubStreamState>;
        enabled(): Promise<ISubStream>;
        disabled(): Promise<ISubStream>;
    }
}
declare module "src/beta/Stream" {
    import { IStream, StreamState } from "src/Interfaces/IStream";
    import { ISink } from "src/Interfaces/ISink";
    import { IView } from "src/Interfaces/ILayout";
    import { IAction2 } from "src/Interfaces/IAction2";
    import { ISource } from "src/Interfaces/ISource";
    import { IAction1 } from "src/Interfaces/IAction1";
    import { IParticipant } from "src/Interfaces/IParticipant";
    import { ISubStream } from "src/Interfaces/ISubStream";
    import { StreamType } from "src/Interfaces/StreamType";
    import { IPlayArgs } from "src/Interfaces/ISession";
    export class Stream implements IStream {
        start(): void;
        stop(): void;
        onstarted?: IAction1<IStream>;
        onstopped?: IAction1<IStream>;
        get audioSink(): ISink;
        get videoSink(): ISink;
        get audioSource(): ISource;
        get audioSourceDeviceId(): string;
        get videoSource(): ISource;
        get videoSourceDeviceId(): string;
        private _isMine;
        get isMine(): boolean;
        origin: IParticipant;
        data?: ISubStream;
        private _id;
        get id(): string;
        private _tag;
        get tag(): string;
        set tag(tag: string);
        streamType: StreamType;
        view?: IView;
        onstatechange: IAction2<IStream, StreamState>;
        constructor(isMine: boolean, onStateChange: IAction1<StreamState>, streamType: StreamType, video?: ISubStream, audio?: ISubStream);
        state?: StreamState;
        connected(): Promise<IStream>;
        disconnected(): Promise<IStream>;
        play(args?: IPlayArgs): void;
        audio?: ISubStream;
        video?: ISubStream;
    }
}
declare module "src/beta/DevicePlayArgs" {
    import { IDevicePlayArgs, IPlayArgs } from "src/Interfaces/ISession";
    import { ISink } from "src/Interfaces/ISink";
    export class PlayArgs implements IPlayArgs {
        audioSink?: ISink;
        videoSink?: ISink;
        constructor(audioSink?: ISink, videoSink?: ISink);
    }
    export class DevicePlayArgs extends PlayArgs implements IDevicePlayArgs {
        microphone?: boolean;
        camera?: boolean;
        audioOutputDeviceId?: string;
        videoSinkElementId?: string;
        constructor(microphone?: boolean, camera?: boolean, audioOutputDeviceId?: string, videoSinkElementId?: string, audioSink?: ISink, videoSink?: ISink);
    }
}
declare module "src/beta/DeviceSubStream" {
    import { SubStream } from "src/beta/SubStream";
    import { IDeviceSubStream } from "src/Interfaces/IDeviceSubStream";
    import { SubStreamType } from "src/Interfaces/SubStreamType";
    import { ISink } from "src/Interfaces/ISink";
    import { ISource } from "src/Interfaces/ISource";
    import { IAction1 } from "src/Interfaces/IAction1";
    export class DeviceSubStream extends SubStream implements IDeviceSubStream {
        source?: ISource;
        sink?: ISink;
        get deviceId(): string;
        set deviceId(newDeviceId: string);
        private _isSource;
        private _remoteMedia;
        constructor(id: string, enableSubStream: IAction1<boolean>, type: SubStreamType, sink?: ISink, source?: ISource, isSource?: boolean, remoteMedia?: fm.liveswitch.RemoteMedia);
    }
}
declare module "src/beta/DeviceStream" {
    import { IDeviceStream } from "src/Interfaces/IDeviceStream";
    import { Stream } from "src/beta/Stream";
    import { DevicePlayArgs } from "src/beta/DevicePlayArgs";
    import { StreamState } from "src/Interfaces/IStream";
    import { IAction1 } from "src/Interfaces/IAction1";
    import { DeviceSubStream } from "src/beta/DeviceSubStream";
    import { IDeviceSubStream } from "src/Interfaces/IDeviceSubStream";
    export class DeviceStream extends Stream implements IDeviceStream {
        get camera(): IDeviceSubStream;
        get microphone(): IDeviceSubStream;
        play(args?: DevicePlayArgs): void;
        constructor(isMine: boolean, onStateChange: IAction1<StreamState>, camera?: DeviceSubStream, microphone?: DeviceSubStream);
    }
}
declare module "src/beta/MessageArgs" {
    import { IMessageArgs } from "src/Interfaces/ImessageArgs";
    export class MessageArgs implements IMessageArgs {
        constructor(message: string);
        binaryMessage?: Blob;
        stringMessage?: string;
        userId?: string;
    }
}
declare module "src/beta/ScreenStream" {
    import { Stream } from "src/beta/Stream";
    import { IScreenStream } from "src/Interfaces/IScreenStream";
    import { ISubStream } from "src/Interfaces/ISubStream";
    import { IScreenPlayArgs } from "src/Interfaces/ISession";
    import { SubStream } from "src/beta/SubStream";
    import { StreamState } from "src/Interfaces/IStream";
    import { IAction1 } from "src/Interfaces/IAction1";
    import { IDisplaySubStream } from "src/Interfaces/IScreenSubStream";
    export class ScreenStream extends Stream implements IScreenStream {
        get display(): IDisplaySubStream;
        displays?: IDisplaySubStream[];
        get systemAudio(): ISubStream;
        systemAudios?: ISubStream[];
        play(args?: IScreenPlayArgs): void;
        constructor(isMine: boolean, onStateChange: IAction1<StreamState>, screenVideo?: SubStream, systemAudio?: SubStream);
    }
}
declare module "src/beta/Participant" {
    import { IParticipant } from "src/Interfaces/IParticipant";
    import { IScreenStream } from "src/Interfaces/IScreenStream";
    import { IDeviceStream } from "src/Interfaces/IDeviceStream";
    import { IFileStream } from "src/Interfaces/IFileStream";
    import { IAction1 } from "src/Interfaces/IAction1";
    export class Participant implements IParticipant {
        id: string;
        isMe: boolean;
        get screenStream(): IScreenStream;
        screenStreams: IScreenStream[];
        get deviceStream(): IDeviceStream;
        deviceStreams: IDeviceStream[];
        constructor(id?: string, isMe?: boolean);
        get fileStream(): IFileStream;
        get fileStreams(): IFileStream[];
        connectionQuality: number;
        roundTripTime: number;
        packetLoss: number;
        audioLevel: number;
        onParticipantTypingMessage?: IAction1<IParticipant>;
        onParticipantSendingFile?: IAction1<IParticipant>;
    }
}
declare module "src/beta/ReceiveArgs" {
    import { IReceiveArgs } from "src/Interfaces/IReceiveArgs";
    export class ReceiveArgs implements IReceiveArgs {
        senderId: string;
        constructor(senderId: string);
    }
}
declare module "src/beta/SendArgs" {
    import { ISendArgs } from "src/Interfaces/ISendArgs";
    import { IAction1 } from "src/Interfaces/IAction1";
    import { IAction2 } from "src/Interfaces/IAction2";
    export class SendArgs implements ISendArgs {
        onSent?: IAction1<ISendArgs>;
        onDelivered?: IAction1<ISendArgs>;
        onProgress?: IAction2<ISendArgs, number>;
        onFailed?: IAction2<ISendArgs, Error>;
        onViewed?: IAction1<ISendArgs>;
        constructor(onsent?: IAction1<ISendArgs>, ondelivered?: IAction1<ISendArgs>, onprogress?: IAction2<ISendArgs, number>, onfailed?: IAction2<ISendArgs, Error>, onviewed?: IAction1<ISendArgs>);
    }
}
declare module "src/beta/SendStatus" {
    import { ISendStatus, SendState } from "src/Interfaces/ISendStatus";
    import { IParticipant } from "src/Interfaces/IParticipant";
    export class SendStatus implements ISendStatus {
        state: SendState;
        deliveredToParticipants: IParticipant[];
        viewedByParticipants: IParticipant[];
        constructor();
    }
}
declare module "src/beta/StringMessageArgs" {
    import { IReceiveArgs } from "src/Interfaces/IReceiveArgs";
    import { IMessageArgs } from "src/Interfaces/ImessageArgs";
    export class StringMessageArgs {
        message: string;
        constructor(message: string);
    }
    export class ChatArgs implements IReceiveArgs, IMessageArgs {
        senderId: string;
        binaryMessage?: Blob;
        stringMessage?: string;
        userId?: string;
        constructor();
    }
}
declare module "src/beta/DisplaySubStream" {
    import { SubStream } from "src/beta/SubStream";
    import { IDisplaySubStream } from "src/Interfaces/IScreenSubStream";
    import { SourceDisplaySurfaceType } from "src/Interfaces/IScreenSubStream";
    import { IAction1 } from "src/Interfaces/IAction1";
    import { SubStreamType } from "src/Interfaces/SubStreamType";
    import { ISink } from "src/Interfaces/ISink";
    export class DisplaySubStream extends SubStream implements IDisplaySubStream {
        get sourceDisplaySurface(): SourceDisplaySurfaceType;
        set sourceDisplaySurface(SourceDisplaySurfaceType: SourceDisplaySurfaceType);
        constructor(id: string, enableSubStream: IAction1<boolean>, type: SubStreamType, sink?: ISink);
    }
}
declare module "src/beta/Session" {
    import { IAction0 } from "src/Interfaces/IAction0";
    import { IAction1 } from "src/Interfaces/IAction1";
    import { IAction2 } from "src/Interfaces/IAction2";
    import { IDeviceStream } from "src/Interfaces/IDeviceStream";
    import { IFileArgs } from "src/Interfaces/IFileArgs";
    import { IFileStream } from "src/Interfaces/IFileStream";
    import { ILayout } from "src/Interfaces/ILayout";
    import { IOutboundSessionInvite } from "src/Interfaces/IOutboundSessionInvite";
    import { IParticipant } from "src/Interfaces/IParticipant";
    import { IScreenStream } from "src/Interfaces/IScreenStream";
    import { ISendArgs } from "src/Interfaces/ISendArgs";
    import { ISendStatus } from "src/Interfaces/ISendStatus";
    import { IDevicePlayArgs, IDeviceStreamArgs, IError, IPlayArgs, IScreenPlayArgs, IScreenStreamArgs, ISession, SessionState, IFileStreamArgs } from "src/Interfaces/ISession";
    import { IStream } from "src/Interfaces/IStream";
    import { MessageArgs } from "src/beta/MessageArgs";
    import { ReceiveArgs } from "src/beta/ReceiveArgs";
    import { SendArgs } from "src/beta/SendArgs";
    import { IJoinConferenceArgs } from "src/Interfaces/IClient";
    export class Session implements ISession {
        onIncomingMessage: IAction2<Session, MessageArgs & ReceiveArgs>;
        state: SessionState;
        onStateChange?: IAction2<ISession, SessionState>;
        leave(): void;
        sendMessage: (args?: MessageArgs & SendArgs) => ISendStatus;
        get me(): IParticipant;
        get screenStream(): IScreenStream;
        get screenStreams(): IScreenStream[];
        get deviceStream(): IDeviceStream;
        get deviceStreams(): IDeviceStream[];
        autoplayDeviceCameraStreams?: boolean;
        autoplayDeviceMicrophoneStreams?: boolean;
        autoplayStreams?: boolean;
        participants?: IParticipant[];
        startScreenStream(args?: IScreenStreamArgs): Promise<IScreenStream>;
        startDeviceStream(args?: IDeviceStreamArgs): Promise<IDeviceStream>;
        playStreams(): void;
        playScreenStreams(args?: IScreenPlayArgs): void;
        playDeviceStreams(args?: IDevicePlayArgs): void;
        onDeviceStreamAdded?: IAction2<ISession, IDeviceStream>;
        onDeviceStreamRemoved?: IAction2<ISession, IDeviceStream>;
        onScreenStreamAdded?: IAction2<ISession, IScreenStream>;
        onScreenStreamRemoved?: IAction2<ISession, IScreenStream>;
        onStreamAdded?: IAction2<ISession, IStream>;
        onStreamRemoved?: IAction2<ISession, IStream>;
        isHeld: boolean;
        hold(): void;
        resume(): void;
        layout: ILayout;
        autoplayScreenDisplayStreams?: boolean;
        private static cameraAndMircophoneConnectionTag;
        private static screenAndSystemAudioConnectionTag;
        private liveSwitchChannel;
        private _LiveSwitchClient;
        private defaultConfig;
        private gotInvitation;
        private notifyLeave;
        private _videoContainer;
        constructor(channel: string, liveSwitchClient: fm.liveswitch.Client, notifyLeave: IAction0, args: IJoinConferenceArgs, videoContainer?: HTMLElement);
        private sfuUpstreamConnection;
        private sfuDownstreamConnections;
        private OnClientJoinAChannel;
        id: string;
        private messageDataChannel?;
        private dataChannelConnection?;
        private canSendMessages;
        private openMcuConnectionForDataChannel;
        private _Direction;
        private openSfuDownstreamConnection;
        private openSfuUpstreamConnection;
        private upstreamState;
        private downstreamState;
        private updateUpstreamState;
        private updateDownstreamState;
        autoplayScreenSystemAudioStreams?: boolean;
        onpeertypingmessage: IAction1<string>;
        notifyTyping(): void;
        playFileStreams(args?: IPlayArgs): void;
        error: IError;
        sendFile(args?: IFileArgs & ISendArgs): ISendStatus;
        startFileStream(args?: IFileStreamArgs): Promise<IFileStream>;
        fileStream?: IFileStream | undefined;
        fileStreams?: IFileStream[] | undefined;
        inviteUser(userId: string): IOutboundSessionInvite;
        inviteClient(clientId: string): IOutboundSessionInvite;
        invitePhone(phoneNumber: string): IOutboundSessionInvite;
        invites?: IOutboundSessionInvite[];
        stopRecording(): void;
        kickParticipant(participantId: string, reason: string): boolean;
        onkicked?: IAction2<ISession, string>;
        autoplayFileStreams?: boolean;
        startRecording(): void;
        connecting(): Promise<ISession>;
        connected(): Promise<ISession>;
        terminated(): Promise<ISession>;
    }
}
declare module "src/beta/Conference" {
    import { Session } from "src/beta/Session";
    import { IConference } from "src/Interfaces/IConference";
    import { IAction0 } from "src/Interfaces/IAction0";
    import { IJoinConferenceArgs } from "src/Interfaces/IClient";
    export class Conference extends Session implements IConference {
        constructor(channel: string, liveSwitchClient: fm.liveswitch.Client, notifyLeave: IAction0, args: IJoinConferenceArgs, videoContainer?: HTMLElement);
    }
}
declare module "src/beta/MicrophoneSource" {
    import { Source } from "src/beta/Source";
    import { IMicrophoneSource } from "src/Interfaces/IMicrophoneSource";
    import { IDevice } from "src/Interfaces/IDevice";
    export class MicrophoneSource extends Source implements IMicrophoneSource {
        constructor(sourceDevice: IDevice, autoPreview?: boolean);
    }
}
declare module "src/beta/ScreenSource" {
    import { IScreenSource } from "src/Interfaces/IScreenSource";
    import { Source } from "src/beta/Source";
    import { IDevice } from "src/Interfaces/IDevice";
    export class ScreenSource extends Source implements IScreenSource {
        display: number;
        constructor(display: number, sourceDevice: IDevice);
    }
}
declare module "src/beta/Client" {
    import { IClient, ICallArgs, IJoinConferenceArgs } from "src/Interfaces/IClient";
    import { ClientState } from "src/Interfaces/IClient";
    import { ISendArgs } from "src/Interfaces/ISendArgs";
    import { IAction2 } from "src/Interfaces/IAction2";
    import { IAction1 } from "src/Interfaces/IAction1";
    import { IScreenSource } from "src/Interfaces/IScreenSource";
    import { IAudioMessageArgs } from "src/Interfaces/IAudioMessageArgs";
    import { IReceiveArgs } from "src/Interfaces/IReceiveArgs";
    import { IVideoMessageArgs } from "src/Interfaces/IVideoMessageArgs";
    import { IFileArgs } from "src/Interfaces/IFileArgs";
    import { IConference } from "src/Interfaces/IConference";
    import { ICall } from "src/Interfaces/ICall";
    import { ICameraSource } from "src/Interfaces/ICameraSource";
    import { IMicrophoneSource } from "src/Interfaces/IMicrophoneSource";
    import { Conference } from "src/beta/Conference";
    import { IOutboundSessionInvite } from "src/Interfaces/IOutboundSessionInvite";
    import { IInboundSessionInvite } from "src/Interfaces/IInboundSessionInvite";
    import { IMessageArgs } from "src/Interfaces/ImessageArgs";
    export class Client implements IClient {
        onstatechange: IAction2<IClient, ClientState>;
        isNew?: boolean;
        isConnecting?: boolean;
        isConnected?: boolean;
        isDisconnected?: boolean;
        connect(): Promise<Client>;
        private notifyConferenceLeaving;
        join(args: IJoinConferenceArgs): IConference;
        conferences: Conference[];
        get camera(): Promise<ICameraSource>;
        get microphone(): Promise<IMicrophoneSource>;
        get screen(): Promise<IScreenSource>;
        get cameras(): Promise<ICameraSource[]>;
        get microphones(): Promise<IMicrophoneSource[]>;
        get screens(): Promise<IScreenSource[]>;
        heldConferences: Conference[];
        private changeStateTo;
        private _LiveSwitchClient;
        private defaultConfig;
        private _Token;
        constructor(userId?: string, token?: string);
        private _Channels;
        callerId: string;
        record(audioOnly: boolean): Blob;
        notifyTyping(peerId: string): void;
        blockIncomingCalls(userId: string): void;
        unblockIncomingCalls(userId: string): void;
        getBlockedUserIds(): string[];
        onconferenceinvite: IAction2<IClient, IInboundSessionInvite & IConference>;
        onincomingfile: IAction1<IReceiveArgs | IFileArgs>;
        sendFile: {
            (file: Blob, peerId: string): Promise<boolean>;
            (file: Blob, peerId: string, sendArgs: ISendArgs): Promise<boolean>;
        };
        onpeersendingfile: IAction1<string>;
        onincomingvideomessage: IAction1<IReceiveArgs | IVideoMessageArgs>;
        onincomingaudiomessage: IAction1<IReceiveArgs | IAudioMessageArgs>;
        audioMessage(sendArgs: ISendArgs & IMessageArgs): void;
        videoMessage(sendArgs: ISendArgs & IMessageArgs): void;
        onincomingcall: IAction1<ICall>;
        calls: ICall[];
        heldCalls: ICall[];
        call(args: ICallArgs): IOutboundSessionInvite;
    }
}
declare module "src/Interfaces/IDeviceManager" {
    export interface IDeviceManager {
        getMediaDevices(): Promise<IDeviceInfo[]>;
        getAudioDevices(): Promise<IDeviceInfo[]>;
        getAudioInputDevices(): Promise<IDeviceInfo[]>;
        getAudioOutputDevices(): Promise<IDeviceInfo[]>;
        getVideoDevices(): Promise<IDeviceInfo[]>;
    }
    export interface IDeviceInfo {
        deviceId?: string;
        groupId?: string;
        kind?: DeviceKind;
        label?: string;
    }
    export enum DeviceKind {
        VideoInput = 1,
        AudioInput = 2,
        AudioOutput = 3
    }
}
declare module "src/beta/DeviceManager" {
    import { IDeviceManager, DeviceKind, IDeviceInfo } from "src/Interfaces/IDeviceManager";
    export class DeviceManager implements IDeviceManager {
        getMediaDevices(): Promise<IDeviceInfo[]>;
        getAudioDevices(): Promise<IDeviceInfo[]>;
        getVideoDevices(): Promise<IDeviceInfo[]>;
        getVideoInputDevices(): Promise<IDeviceInfo[]>;
        getAudioInputDevices(): Promise<IDeviceInfo[]>;
        getAudioOutputDevices(): Promise<IDeviceInfo[]>;
    }
    export class DeviceInfo implements IDeviceInfo {
        private _deviceId;
        private _groupId;
        private _kind;
        private _label;
        get deviceId(): string;
        get groupId(): string;
        get kind(): DeviceKind;
        get label(): string;
        constructor(deviceId: string, label: string, kind: DeviceKind, groupId?: string);
    }
}
declare module "src/beta/SessionInvite" {
    import { ISessionInvite } from "src/Interfaces/ISessionInvite";
    import { ISession } from "src/Interfaces/ISession";
    import { IScreenStream } from "src/Interfaces/IScreenStream";
    import { IAction2 } from "src/Interfaces/IAction2";
    import { IDeviceStream } from "src/Interfaces/IDeviceStream";
    import { IParticipant } from "src/Interfaces/IParticipant";
    import { IFileStream } from "src/Interfaces/IFileStream";
    export class SessionInvite implements ISessionInvite {
        participants?: IParticipant[];
        me?: IParticipant;
        onParticipantAdded?: IAction2<ISession, IParticipant>;
        onParticipantRemoved?: IAction2<ISession, IParticipant>;
        autoplayStreams?: boolean;
        autoplayScreenDisplayStreams?: boolean;
        autoplayScreenSystemAudioStreams?: boolean;
        autoplayFileStreams?: boolean;
        autoplayDeviceCameraStreams?: boolean;
        autoplayDeviceMicrophoneStreams?: boolean;
        screenStream?: IScreenStream;
        screenStreams?: IScreenStream[];
        onScreenStreamAdded?: IAction2<ISession, IScreenStream>;
        onScreenStreamRemoved?: IAction2<ISession, IScreenStream>;
        fileStream?: IFileStream;
        fileStreams?: IFileStream[];
        onFileStreamAdded?: IAction2<ISession, IFileStream>;
        onFileStreamRemoved?: IAction2<ISession, IFileStream>;
        deviceStream?: IDeviceStream;
        deviceStreams?: IDeviceStream[];
        onDeviceStreamAdded?: IAction2<ISession, IDeviceStream>;
        onDeviceStreamRemoved?: IAction2<ISession, IDeviceStream>;
    }
}
declare module "src/beta/OutboundSessionInvite" {
    import { IOutboundSessionInvite } from "src/Interfaces/IOutboundSessionInvite";
    import { IScreenStream } from "src/Interfaces/IScreenStream";
    import { IDeviceStream } from "src/Interfaces/IDeviceStream";
    import { IFileStream } from "src/Interfaces/IFileStream";
    import { IAction1 } from "src/Interfaces/IAction1";
    import { IAction2 } from "src/Interfaces/IAction2";
    import { SessionInvite } from "src/beta/SessionInvite";
    import { ISession, IDeviceStreamArgs, IFileStreamArgs, IScreenStreamArgs } from "src/Interfaces/ISession";
    import { SessionInviteRejectReason } from "src/Interfaces/SessionInviteRejectReason";
    export class OutboundSessionInvite extends SessionInvite implements IOutboundSessionInvite {
        accepted(): Promise<ISession>;
        rejected(): Promise<void>;
        rejectReason?: SessionInviteRejectReason;
        cancel(): void;
        onInviteAccepted?: IAction1<IOutboundSessionInvite>;
        onInviteRejected?: IAction2<IOutboundSessionInvite, SessionInviteRejectReason>;
        startScreenStream(args?: IScreenStreamArgs): Promise<IScreenStream>;
        startFileStream(args?: IFileStreamArgs): Promise<IFileStream>;
        startDeviceStream(args?: IDeviceStreamArgs): Promise<IDeviceStream>;
    }
}
declare module "src/beta/InboundSessionInvite" {
    import { SessionInvite } from "src/beta/SessionInvite";
    import { IInboundSessionInvite } from "src/Interfaces/IInboundSessionInvite";
    import { ISession, IDeviceStreamArgs, IFileStreamArgs, IScreenStreamArgs, IScreenPlayArgs, IPlayArgs, IDevicePlayArgs } from "src/Interfaces/ISession";
    import { InboundSessionInviteState } from "src/Interfaces/IInboundSessionInvite";
    import { SessionInviteRejectReason } from "src/Interfaces/SessionInviteRejectReason";
    export class InbountSesssionInvite extends SessionInvite implements IInboundSessionInvite {
        playStreams(): void;
        playScreenStreams(args?: IScreenPlayArgs): void;
        playFileStreams(args?: IPlayArgs): void;
        playDeviceStreams(args?: IDevicePlayArgs): void;
        accept(args?: IDeviceStreamArgs): ISession;
        acceptWithDeviceStream(args?: IDeviceStreamArgs): ISession;
        acceptWithScreenStream(args?: IScreenStreamArgs): ISession;
        acceptWithFileStream(args?: IFileStreamArgs): ISession;
        reject(reason?: SessionInviteRejectReason): void;
        hasVideo?: boolean;
        hasAudio?: boolean;
        hasScreenshare?: boolean;
        inviteState?: InboundSessionInviteState;
        isNew?: boolean;
        isAccepted?: boolean;
        isRejected?: boolean;
        private session;
    }
}
declare module "src/Interfaces/SourceType" {
    export enum SourceType {
        Camera = 0,
        Screen = 1,
        Microphone = 2,
        File = 3
    }
}
declare module "src/index" {
    import { ISession, SessionState, IDeviceStreamArgs, IDevicePlayArgs, IScreenStreamArgs, IScreenPlayArgs } from "src/Interfaces/ISession";
    export { ISession, SessionState, IDeviceStreamArgs, IDevicePlayArgs, IScreenStreamArgs, IScreenPlayArgs };
    export { IMessageArgs } from "src/Interfaces/ImessageArgs";
    export { ISendArgs } from "src/Interfaces/ISendArgs";
    export { CameraSource } from "src/beta/CameraSource";
    export { Client } from "src/beta/Client";
    export { Session } from "src/beta/Session";
    export { DeviceManager } from "src/beta/DeviceManager";
    export { OutboundSessionInvite } from "src/beta/OutboundSessionInvite";
    export { Conference } from "src/beta/Conference";
    export { InbountSesssionInvite } from "src/beta/InboundSessionInvite";
    export { SendArgs } from "src/beta/SendArgs";
    export { SessionInvite } from "src/beta/SessionInvite";
    export { Stream } from "src/beta/Stream";
    export { SubStream } from "src/beta/SubStream";
    export { Device } from "src/beta/Device";
    export { Participant } from "src/beta/Participant";
    export { DevicePlayArgs } from "src/beta/DevicePlayArgs";
    export { IAction2 } from "src/Interfaces/IAction2";
    export { SessionInviteRejectReason } from "src/Interfaces/SessionInviteRejectReason";
    export { DeviceType } from "src/Interfaces/DeviceType";
    export { SourceType } from "src/Interfaces/SourceType";
    export { StreamType } from "src/Interfaces/StreamType";
    export { SubStreamType } from "src/Interfaces/SubStreamType";
    export { IReceiveArgs } from "src/Interfaces/IReceiveArgs";
    export { IConference } from "src/Interfaces/IConference";
    export { MessageArgs } from "src/beta/MessageArgs";
    export { ChatArgs } from "src/beta/StringMessageArgs";
    export { StringMessageArgs } from "src/beta/StringMessageArgs";
}
declare module "src/Interfaces/ISessionContext" {
    import { ISession } from "src/Interfaces/ISession";
    import { IOutboundSessionInvite } from "src/Interfaces/IOutboundSessionInvite";
    export interface ISessionContext extends ISession, IOutboundSessionInvite {
    }
}
declare module "src/Interfaces/IVideoSource" {
    import { ISource } from "src/Interfaces/ISource";
    export interface IVideoSource extends ISource {
    }
}
declare module "src/beta/Invite" {
    import { IAction0 } from "src/Interfaces/IAction0";
    import { IAction1 } from "src/Interfaces/IAction1";
    import { SessionInviteRejectReason } from "src/Interfaces/SessionInviteRejectReason";
    export class Invite {
        private invitation?;
        constructor(invitation?: fm.liveswitch.Invitation);
        addInvitation(invitation: fm.liveswitch.Invitation): void;
        cancel(): void;
        oninviteaccepted: IAction0;
        oninviterejected: IAction1<SessionInviteRejectReason>;
    }
}
