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
import { Conference } from "./Conference.js";
import { IOutboundSessionInvite } from "../../Interfaces/IOutboundSessionInvite.js";
import { IInboundSessionInvite } from "../../Interfaces/IInboundSessionInvite.js";
import { IMessageArgs } from "../../Interfaces/ImessageArgs.js";
export declare class Client implements IClient {
    onstatechange: IAction2<IClient, ClientState>;
    isNew?: boolean;
    isConnecting?: boolean;
    isConnected?: boolean;
    isDisconnected?: boolean;
    connect(): Promise<void>;
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
