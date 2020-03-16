import { SubStreamState } from "../../Interfaces/ISubStream.js";
export class SubStream {
    // Either a Incoming Stream.. or outgoing stream
    // need to populate either sinks or sources
    // its one or the other
    constructor(id, enableSubStream, type, sink) {
        this.isEnabled = true;
        this._id = id;
        this.substreamType = type;
        this._enableSubStream = enableSubStream;
        // can substream without a sink or source
        //this._sink = sink;
    }
    set id(id) {
        this._id = id;
    }
    get id() {
        return this._id;
    }
    set tag(tag) {
        this._tag = tag;
    }
    get tag() {
        return this._tag;
    }
    enable() {
        if (this.isDisabled) {
            this.isEnabled = true;
            this._enableSubStream(true);
        }
    }
    disable() {
        if (this.isEnabled) {
            this.isEnabled = false;
            this._enableSubStream(false);
        }
    }
    play(sink) {
        if (sink) {
            throw new Error("What do you you want me do with this sink?");
        }
        this.enable();
        // there is no way for them to know sinks currently
        // play to sink if enabled?
        // is this same thing as enable?
        // are there multiple sinks?
    }
    get isNew() {
        if (this.state == SubStreamState.New) {
            return true;
        }
        return false;
    }
    get isDisabled() {
        return !this.isEnabled;
    }
    set isDisabled(disable) {
        this.isEnabled = !disable;
    }
    enabled() {
        var me = this;
        let promise = new Promise((resolve, reject) => {
            if (me.isEnabled) {
                resolve(me);
            }
            else {
                reject(me);
            }
        });
        return promise;
    }
    disabled() {
        var me = this;
        let promise = new Promise((resolve, reject) => {
            if (me.isDisabled) {
                resolve(me);
            }
            else {
                reject(me);
            }
        });
        return promise;
    }
}
