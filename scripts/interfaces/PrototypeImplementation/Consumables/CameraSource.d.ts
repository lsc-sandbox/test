import { ICameraSource } from "../../Interfaces/ICameraSource.js";
import { Source } from "./Source.js";
import { IDevice } from "../../Interfaces/IDevice.js";
export declare class CameraSource extends Source implements ICameraSource {
    constructor(sourceDevice: IDevice, autoPreview?: boolean);
    private _layoutManager;
    updateLayout(layoutManager: fm.liveswitch.DomLayoutManager): void;
    preview(element?: any): void;
}
export declare class preview {
    layoutManager: fm.liveswitch.DomLayoutManager;
    constructor(localMedia: fm.liveswitch.LocalMedia, layoutManager: fm.liveswitch.DomLayoutManager);
}
