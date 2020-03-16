import { Source } from "./Source.js";
export class ScreenSource extends Source {
    constructor(display, sourceDevice) {
        super(sourceDevice);
        this.display = display;
    }
}
