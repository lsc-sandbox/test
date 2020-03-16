import { ISink } from "./ISink";
import { IAction2 } from "./IAction2";
import { IView } from "./ILayout";
import { StreamType } from "./StreamType";
import { ISubStream } from "./ISubStream";
import { IParticipant } from "./IParticipant";
import { IAction1 } from "./IAction1";
import { ISource } from "./ISource";
import { IPlayArgs } from "./ISession";
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
export declare enum StreamState {
    New = 1,
    Connected = 2,
    Disconnected = 3
}
