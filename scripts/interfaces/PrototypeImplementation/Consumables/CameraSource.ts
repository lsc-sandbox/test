import { ICameraSource } from "../../Interfaces/ICameraSource.js";
import { Source } from "./Source.js";
import { IDevice } from "../../Interfaces/IDevice.js";
import { SharedObjects } from "./SharedObjects.js";

export class CameraSource extends Source implements ICameraSource {
    constructor(sourceDevice: IDevice, autoPreview?: boolean) {
        super(sourceDevice, autoPreview);
        //this.localmedia = localMedia;
    }
    //private localmedia: fm.liveswitch.LocalMedia;
    private _layoutManager: fm.liveswitch.DomLayoutManager | null = null;
    public updateLayout(layoutManager: fm.liveswitch.DomLayoutManager) {
        this._layoutManager = layoutManager;
    }
    // local media should have been started with this CameraSource and then set localmedia's view to layout
    preview(element?: any): void {
        //let localmedia = SharedObjects.Instance().cameraLocalMedia;
        //if (element instanceof preview) {
        //    var myElement = element as preview;
        //    localmedia?.changeVideoSourceInput(new fm.liveswitch.SourceInput(this.sourceDevice.id, this.sourceDevice.name)).then(() => {
        //        if (!SharedObjects.Instance().islocalmediastarted && !this._isSourceStarted) {
        //            localmedia?.start();
        //        } if (localmedia) {
        //            myElement.layoutManager.setLocalView(localmedia.getView());
        //        }
        //    });
            
           
            //myElement. ?.setLocalView((view));
        //}
        // switch to this element
    }
}
export class preview {
    layoutManager: fm.liveswitch.DomLayoutManager;
    constructor(localMedia: fm.liveswitch.LocalMedia, layoutManager: fm.liveswitch.DomLayoutManager) {
        this.layoutManager = layoutManager;
    }
}