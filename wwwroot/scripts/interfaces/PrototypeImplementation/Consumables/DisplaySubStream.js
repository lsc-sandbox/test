import { SubStream } from "./SubStream.js";
import { SourceDisplaySurfaceType } from "../../Interfaces/IScreenSubStream.js";
export class DisplaySubStream extends SubStream {
    get sourceDisplaySurface() {
        return SourceDisplaySurfaceType.Monitor;
    }
    set sourceDisplaySurface(SourceDisplaySurfaceType) {
        // later
    }
    constructor(id, enableSubStream, type, sink) {
        super(id, enableSubStream, type);
    }
}
