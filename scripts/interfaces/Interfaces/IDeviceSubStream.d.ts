import { ISubStream } from "./ISubStream";
import { ISink } from "./ISink";
import { ISource } from "./ISource";
export interface IDeviceSubStream extends ISubStream {
    sink?: ISink;
    source?: ISource;
    deviceId?: string;
}
