import { IReceiveArgs } from "./IReceiveArgs";
import { ISendArgs } from "./ISendArgs";
import { IAction2 } from "./IAction2";
import { ILayout } from "./ILayout";
import { IStream } from "./IStream";
import { IParticipant } from "./IParticipant";
import { IOutboundSessionInvite } from "./IOutboundSessionInvite";
import { ISendStatus } from "./ISendStatus";
import { IFileArgs } from "./IFileArgs";
import { IScreenStream } from "./IScreenStream";
import { IFileStream } from "./IFileStream";
import { IFileSource } from "./IFileSource";
import { IDeviceStream } from "./IDeviceStream";
import { IMessageArgs } from "./ImessageArgs";
import { ICameraSource } from "./ICameraSource";
import { IMicrophoneSource } from "./IMicrophoneSource";
import { IScreenSource } from "./IScreenSource";
import { ISink } from "./ISink";
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
export declare enum SessionState {
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
