import { SubStream } from "./SubStream.js";
import { IDisplaySubStream } from "../../Interfaces/IScreenSubStream.js";
import { SourceDisplaySurfaceType } from "../../Interfaces/IScreenSubStream.js";
import { IAction1 } from "../../Interfaces/IAction1.js";
import { SubStreamType } from "../../Interfaces/SubStreamType.js";
import { ISink } from "../../Interfaces/ISink.js";
export declare class DisplaySubStream extends SubStream implements IDisplaySubStream {
    get sourceDisplaySurface(): SourceDisplaySurfaceType;
    set sourceDisplaySurface(SourceDisplaySurfaceType: SourceDisplaySurfaceType);
    constructor(id: string, enableSubStream: IAction1<boolean>, type: SubStreamType, sink?: ISink);
}
