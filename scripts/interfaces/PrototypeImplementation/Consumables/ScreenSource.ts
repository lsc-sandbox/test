import { IScreenSource } from "../../Interfaces/IScreenSource.js";
import { Source } from "./Source.js";
import { IDevice } from "../../Interfaces/IDevice.js";

export class ScreenSource extends Source implements IScreenSource {
    display: number;
    constructor(display:number,sourceDevice: IDevice) {
        super(sourceDevice);
        this.display = display;
    }

}