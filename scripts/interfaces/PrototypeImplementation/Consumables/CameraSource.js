import { Source } from "./Source.js";
export class CameraSource extends Source {
    constructor(sourceDevice, autoPreview) {
        super(sourceDevice, autoPreview);
        //private localmedia: fm.liveswitch.LocalMedia;
        this._layoutManager = null;
        //this.localmedia = localMedia;
    }
    updateLayout(layoutManager) {
        this._layoutManager = layoutManager;
    }
    // local media should have been started with this CameraSource and then set localmedia's view to layout
    preview(element) {
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
    constructor(localMedia, layoutManager) {
        this.layoutManager = layoutManager;
    }
}
