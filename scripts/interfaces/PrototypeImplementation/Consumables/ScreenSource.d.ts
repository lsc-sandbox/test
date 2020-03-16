import { IScreenSource } from "../../Interfaces/IScreenSource.js";
import { Source } from "./Source.js";
import { IDevice } from "../../Interfaces/IDevice.js";
export declare class ScreenSource extends Source implements IScreenSource {
    display: number;
    constructor(display: number, sourceDevice: IDevice);
}
