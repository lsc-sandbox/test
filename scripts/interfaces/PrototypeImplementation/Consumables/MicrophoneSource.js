import { Source } from "./Source.js";
export class MicrophoneSource extends Source {
    constructor(sourceDevice, autoPreview) {
        super(sourceDevice, autoPreview);
    }
}
