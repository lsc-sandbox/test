import { Source } from "./Source.js"
import { IMicrophoneSource } from "../../Interfaces/IMicrophoneSource.js";
import { IDevice } from "../../Interfaces/IDevice.js";

export class MicrophoneSource extends Source implements IMicrophoneSource
{
    constructor(sourceDevice: IDevice, autoPreview?: boolean) {
       super(sourceDevice, autoPreview)
    }
}