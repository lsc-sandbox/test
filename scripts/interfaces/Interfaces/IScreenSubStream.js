export var SourceDisplaySurfaceType;
(function (SourceDisplaySurfaceType) {
    //https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackSettings/displaySurface
    SourceDisplaySurfaceType[SourceDisplaySurfaceType["Application"] = 1] = "Application";
    SourceDisplaySurfaceType[SourceDisplaySurfaceType["Browser"] = 2] = "Browser";
    SourceDisplaySurfaceType[SourceDisplaySurfaceType["Monitor"] = 3] = "Monitor";
    SourceDisplaySurfaceType[SourceDisplaySurfaceType["Window"] = 4] = "Window";
})(SourceDisplaySurfaceType || (SourceDisplaySurfaceType = {}));
