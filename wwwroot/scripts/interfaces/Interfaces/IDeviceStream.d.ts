import { IStream } from "./IStream";
import { IDevicePlayArgs } from "./ISession";
import { IDeviceSubStream } from "./IDeviceSubStream";
export interface IDeviceStream extends IStream {
    camera?: IDeviceSubStream;
    microphone?: IDeviceSubStream;
    play(args?: IDevicePlayArgs): void;
}
