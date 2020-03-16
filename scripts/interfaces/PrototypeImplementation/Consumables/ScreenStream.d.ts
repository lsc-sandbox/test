import { Stream } from "./Stream.js";
import { IScreenStream } from "../../Interfaces/IScreenStream.js";
import { ISubStream } from "../../Interfaces/ISubStream.js";
import { IScreenPlayArgs } from "../../Interfaces/ISession.js";
import { SubStream } from "./SubStream.js";
import { StreamState } from "../../Interfaces/IStream.js";
import { IAction1 } from "../../Interfaces/IAction1.js";
import { IDisplaySubStream } from "../../Interfaces/IScreenSubStream.js";
export declare class ScreenStream extends Stream implements IScreenStream {
    get display(): IDisplaySubStream;
    displays?: IDisplaySubStream[];
    get systemAudio(): ISubStream;
    systemAudios?: ISubStream[];
    play(args?: IScreenPlayArgs): void;
    constructor(isMine: boolean, onStateChange: IAction1<StreamState>, screenVideo?: SubStream, systemAudio?: SubStream);
}
