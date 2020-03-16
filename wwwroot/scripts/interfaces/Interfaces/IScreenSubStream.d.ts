import { ISubStream } from "./ISubStream";
export interface IDisplaySubStream extends ISubStream {
    sourceDisplaySurface: SourceDisplaySurfaceType;
}
export declare enum SourceDisplaySurfaceType {
    Application = 1,
    Browser = 2,
    Monitor = 3,
    Window = 4
}
