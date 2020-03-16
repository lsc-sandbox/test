import { Source } from "./Source.js";
import { IMicrophoneSource } from "../../Interfaces/IMicrophoneSource.js";
import { IDevice } from "../../Interfaces/IDevice.js";
export declare class MicrophoneSource extends Source implements IMicrophoneSource {
    constructor(sourceDevice: IDevice, autoPreview?: boolean);
}
