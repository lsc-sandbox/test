import { IStream, StreamState } from "../../Interfaces/IStream.js";
import { ISink } from "../../Interfaces/ISink.js"
import { ILayout, IView } from "../../Interfaces/ILayout.js"
import { IAction2 } from "../../Interfaces/IAction2.js"
import { DeviceType } from "../../Interfaces/DeviceType.js";
import { Device } from "./Device.js";
import { Sink } from "./Sink.js";
import { Source } from "./Source.js";
import { ISource } from "../../Interfaces/ISource.js";
import { IAction1 } from "../../Interfaces/IAction1.js";
import { IParticipant } from "../../Interfaces/IParticipant.js";
import { ISubStream } from "../../Interfaces/ISubStream.js";
import { SubStream } from "./SubStream.js";
import { StreamType } from "../../Interfaces/StreamType.js"
import { IPlayArgs } from  "../../Interfaces/ISession.js"
export class Stream implements IStream {
    start(): void {
        this.video.enable();
        this.audio.enable();
    }
    stop(): void {
        this.video.disable();
        this.audio.disable();
    }
    onstarted?: IAction1<IStream>;
    onstopped?: IAction1<IStream>;
    get audioSink(): ISink {
        //if (this.audio && this.audio.sink) {
        //    return this.audio.sink;
        //}
        return null;
    }
    get videoSink(): ISink {
        //if (this.video && this.video.sink) {
        //    return this.video.sink;
        //}
        return null;
    }
    get audioSource(): ISource {
        //if (this.audio && this.audio.source) {
        //    return this.audio.source;
        //}
        return null;
    }
    get audioSourceDeviceId(): string {
        //if (this.audio && this.audio.sourceDeviceId) {
        //    return this.audio.sourceDeviceId;
        //}
        return null;
    }
    get videoSource(): ISource {
        //if (this.video && this.video.source) {
        //    return this.video.source;
        //}
        return null;
    }
    get videoSourceDeviceId(): string {
        //if (this.video && this.video.sourceDeviceId) {
        //    return this.video.sourceDeviceId;
        //}
        return null;
    }
    private _isMine: boolean = false;

    get isMine(): boolean {
        //if (this.video.source || this.audio.source) {
        //    return true;
        //}
        //return false;
        return this._isMine;
    }
    origin!: IParticipant;
    data?: ISubStream; // forget about this .. already on DeviceStream
    private _id: string = fm.liveswitch.Guid.newGuid().toString();

    get id(): string {
        return this.id;
    }
    private _tag: string = "Not populated";
    get tag(): string {
        return this._tag;
    }
    set tag(tag: string) {
        this.tag = tag;
    }
    streamType!: StreamType;

    // makes sense for sink
    // Just ignoring this for now
    view?: IView; 
    //done
    onstatechange!: IAction2<IStream, StreamState>;
    constructor(isMine:boolean, onStateChange: IAction1<StreamState>, streamType: StreamType, video?: ISubStream, audio?: ISubStream) { /// the the ability to change the source not just the sink
        // need another thing in the constructor for sinks
        var me = this;
        me._isMine = isMine;
        onStateChange = (state) => {
            if (me.onstatechange) {
                me.onstatechange(me, state);
            }
        }
        this.streamType = streamType;
        this.audio = audio;
        this.video = video;
    }
    state?: StreamState;
    connected(): Promise<IStream> {
        throw new Error("Method not implemented.");
    }
    disconnected(): Promise<IStream> {
        throw new Error("Method not implemented.");
    }
    play(args?: IPlayArgs): void {
        let video = true;
        let audio = true;
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
    }
    audio?: ISubStream;
    video?: ISubStream;

}