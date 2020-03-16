import { ISubStream, SubStreamState } from "../../Interfaces/ISubStream.js";
import { SubStreamType } from "../../Interfaces/SubStreamType.js";
import { ISink } from "../../Interfaces/ISink.js";
import { ISource } from "../../Interfaces/ISource.js";
import { IAction2 } from "../../Interfaces/IAction2";
import { StreamState } from "../../Interfaces/IStream.js";
import { IView } from "../../Interfaces/ILayout.js";
import { Sink } from "./Sink.js";
import { IAction1 } from "../../Interfaces/IAction1.js";

export class SubStream implements ISubStream {

    //Gets or sets ID of this substream.
    private _id: string;
    private _tag: string;
    set id(id: string) {
        this._id = id;
    }
    get id() {
        return this._id;
    }
    set tag(tag: string) {
        this._tag = tag;
    }
    get tag() {
        return this._tag;
    }
    
    //Gets or sets the device type of this device.
    substreamType: SubStreamType;
    enable(): void {
        if (this.isDisabled) {
            this.isEnabled = true;
            this._enableSubStream(true);
        }
    }
    disable(): void {
        if (this.isEnabled) {
            this.isEnabled = false;
            this._enableSubStream(false);
        }
    }
    play(sink?: ISink): void {
        if (sink) {
            throw new Error("What do you you want me do with this sink?");
        }
        this.enable();
        // there is no way for them to know sinks currently
        // play to sink if enabled?
        // is this same thing as enable?
        // are there multiple sinks?
    }


    //private _sink!: ISink;
    //get sink(): ISink {
    //    return this._sink;
    //}
    //set sink(sink: ISink) {
    //    this._sink = sink;
    //}
   

    view?: IView | undefined;
    //need this
    onstatechange?: IAction2<ISubStream, SubStreamState>;
    state?: SubStreamState;
    get isNew(): boolean {
        if (this.state == SubStreamState.New) {
            return true;
        }
        return false;
    }
    isEnabled: boolean = true;
    get isDisabled(): boolean {
        return !this.isEnabled;
    }
    set isDisabled(disable: boolean) {
        this.isEnabled = !disable;
    }
    private _enableSubStream: IAction1<boolean>;

        // Either a Incoming Stream.. or outgoing stream
    // need to populate either sinks or sources
    // its one or the other
    constructor(id: string, enableSubStream: IAction1<boolean>, type: SubStreamType, sink?: ISink) {
        this._id = id;
        this.substreamType = type;
        this._enableSubStream = enableSubStream;
        // can substream without a sink or source
        //this._sink = sink;
    }
    onStateChange?: IAction2<ISubStream, SubStreamState>;
    enabled(): Promise<ISubStream> {
        var me = this;
        let promise: Promise<ISubStream> = new Promise<ISubStream>((resolve, reject) => {
            if (me.isEnabled) {
                resolve(me);
            }
            else {
                reject(me);
            }
        });
        return promise;
    }
    disabled(): Promise<ISubStream> {
        var me = this;
        let promise: Promise<ISubStream> = new Promise<ISubStream>((resolve, reject) => {
            if (me.isDisabled) {
                resolve(me);
            } else {
                reject(me);
            }
        });
        return promise;
    }
}