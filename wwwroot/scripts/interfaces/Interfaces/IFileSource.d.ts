import { ISource } from "./ISource";
import { IFileTrack } from "./IFileTrack";
export interface IFileSource extends ISource {
    tracks: IFileTrack[];
}
