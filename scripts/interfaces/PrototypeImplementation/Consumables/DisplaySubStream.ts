import { SubStream } from "./SubStream.js";
import { IDisplaySubStream } from "../../Interfaces/IScreenSubStream.js";
import { SourceDisplaySurfaceType } from "../../Interfaces/IScreenSubStream.js";
import { IAction1 } from "../../Interfaces/IAction1.js";
import { SubStreamType } from "../../Interfaces/SubStreamType.js";
import { ISink } from "../../Interfaces/ISink.js";




export class DisplaySubStream extends SubStream implements IDisplaySubStream
{
    get sourceDisplaySurface(): SourceDisplaySurfaceType {
       return  SourceDisplaySurfaceType.Monitor;
    }
    set sourceDisplaySurface(SourceDisplaySurfaceType: SourceDisplaySurfaceType) {
        // later
    }
    constructor(id: string, enableSubStream: IAction1<boolean>, type: SubStreamType, sink?: ISink) {
        super(id, enableSubStream, type);
    }

}