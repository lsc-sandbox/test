import { ISendArgs } from "./ISendArgs";
import { IAction2 } from "./IAction2";
import { IAudioMessageArgs } from "./IAudioMessageArgs";
import { IReceiveArgs } from "./IReceiveArgs";
import { IVideoMessageArgs } from "./IVideoMessageArgs";
import { IConference } from "./IConference";
import { ICall } from "./ICall";
import { ICameraSource } from "./ICameraSource";
import { IScreenSource } from "./IScreenSource";
import { IMicrophoneSource } from "./IMicrophoneSource";
import { IMessageArgs } from "./ImessageArgs";
import { IOutboundSessionInvite } from "./IOutboundSessionInvite";
import { IInboundSessionInvite } from "./IInboundSessionInvite";
export interface IClient {
    connect(): Promise<void>;
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
export declare enum ClientState {
    New = 1,
    Connecting = 2,
    Connected = 3,
    Disconnected = 4
}
export interface IJoinSessionArgs {
    videoSinkElementId?: string;
    camera?: boolean;
    microphone?: boolean;
    screenshare?: boolean;
}
export interface IJoinConferenceArgs extends IJoinSessionArgs {
    conferenceId: string;
}
export interface ICallArgs extends IJoinSessionArgs {
    userId: string;
}
