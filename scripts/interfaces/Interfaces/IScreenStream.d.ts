import { IDisplaySubStream } from "./IScreenSubStream";
import { IStream } from "./IStream";
import { IScreenPlayArgs } from "./ISession";
import { ISubStream } from "./ISubStream";
export interface IScreenStream extends IStream {
    display?: IDisplaySubStream;
    displays?: IDisplaySubStream[];
    systemAudio?: ISubStream;
    systemAudios?: ISubStream[];
    play(args?: IScreenPlayArgs): void;
}
