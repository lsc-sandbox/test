export class Participant {
    constructor(id, isMe) {
        this.id = fm.liveswitch.Guid.newGuid().toString();
        this.isMe = false;
        this.screenStreams = new Array();
        this.deviceStreams = new Array();
        if (id) {
            this.id = id;
        }
        if (isMe) {
            this.isMe = isMe;
        }
    }
    get screenStream() {
        if (this.screenStreams.length == 0) {
            return null;
        }
        return this.screenStreams[0];
    }
    get deviceStream() {
        if (this.deviceStreams.length == 0) {
            return null;
        }
        return this.deviceStreams[0];
    }
    // Don't need this I think
    //private isInvolvedWithYourStreaming = true;
    //get isInvolvedWithYou(): boolean {
    //    return this.isInvolvedWithYourStreaming;
    //}
    //set isInvolvedWithYou(boolean: boolean) {
    //    this.isInvolvedWithYourStreaming = boolean;
    //}
    // don't worry about the following
    get fileStream() {
        return null;
    }
    get fileStreams() {
        return null;
    }
}
