export class SendArgs {
    constructor(onsent, ondelivered, onprogress, onfailed, onviewed) {
        if (onsent) {
            this.onSent = onsent;
        }
        if (ondelivered) {
            this.onDelivered = ondelivered;
        }
        if (onprogress) {
            this.onProgress = onprogress;
        }
        if (onfailed) {
            this.onFailed = onfailed;
        }
        if (onviewed) {
            this.onViewed = onviewed;
        }
    }
}
